
import {Squirrel} from "../../world/Squirrel";
import {Terrier} from "../../world/Terrier";
import {Branch} from "../../world/Branch";
import {Inventory} from "../../ui/Inventory";

import {SoundManager} from "../../sound/SoundManager";
import Timer = Phaser.Timer;

enum Level {
    Branch,
    Terrier,
    Elevator
}

export default class Play extends Phaser.State
{
    private debug: boolean = false;
    private background: Phaser.TileSprite;
    private lift: Phaser.Sprite;
    private treeDoor: Phaser.Sprite;
    private characterLayer: Phaser.Group;
    private backgroundLayer: Phaser.Group;
    private squirrel: Squirrel;
    private terrier: Terrier;
    private branch: Branch;
    private currentLevel: Level;
    private isFading: boolean = false;
    private soundManager: SoundManager;
    private elevatorDestination: Level;
    private floorSquirrelY: number = 1845;
    private branchSquirrelY: number = 280;
    private timer: Timer;
    private timerMinutes: number = 3;
    private timerSeconds: number = 30;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';

        const tileSpriteRatio = 1;
        const width = 1600;
        const height = 1200;
        const heightPosition = 0;

        this.backgroundLayer = this.game.add.group();
        this.backgroundLayer.name = 'Background';
        this.background = this.game.add.tileSprite(-632,0,1656,2048, 'background_terrier',0, this.backgroundLayer);
        this.background.tileScale.set(tileSpriteRatio, tileSpriteRatio);


        const itemsLayer = this.game.add.group();
        itemsLayer.name = 'Items';
        this.lift = new Phaser.Sprite(this.game, 828, this.floorSquirrelY - 1095, 'lift');
        itemsLayer.add(this.lift);
        this.lift.scale.set(0.2, 0.21);
        this.game.physics.enable(this.lift, Phaser.Physics.ARCADE);
        // this.buildings = this.game.add.tileSprite(0,heightPosition,width,height,'buildings',0, itemsLayer);
        // this.buildings.tileScale.set(tileSpriteRatio, tileSpriteRatio);
        // this.buildings.animations.add('idle', [0, 1, 2], 2, true);
        // this.buildings.animations.play('idle');

        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';

        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';

        this.game.camera.onFadeComplete.add(() => {
            this.isFading = false;
        });
        this.game.camera.onFlashComplete.add(() => {
            this.isFading = false;
        });

        this.currentLevel = Level.Terrier;
        this.branch = new Branch(itemsLayer);

        this.terrier = new Terrier(itemsLayer, 10, 1700, 'terrier');
        this.squirrel = new Squirrel(this.characterLayer, 150, this.floorSquirrelY, 'squirrel', this.branch, this.terrier);

        this.terrier.buckets.map(bucket => {
            let sprite = new Phaser.Sprite(this.game, bucket.body.x - 60, bucket.body.y + 67, 'nest');
            sprite.scale.set(0.3);
            itemsLayer.add(sprite);
        });

        this.timer = this.game.time.create();
        const timerEvent = this.timer.add(Phaser.Timer.MINUTE * this.timerMinutes + Phaser.Timer.SECOND * this.timerSeconds, this.gameOver, this);
        this.timer.start();

        new Inventory(interfaceLayer, 0, 0, 'Inventory', this.squirrel, this.terrier, this.timer, timerEvent);

        this.treeDoor = new Phaser.Sprite(this.game, 30, 0, 'tree_door');
        this.characterLayer.add(this.treeDoor);
        this.treeDoor.scale.set(1, 1);
        this.soundManager = new SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playInside();

        this.game.world.setBounds(0, 0, 1024, 2048);

        this.game.camera.y = 2048;

    }

    public update()
    {
        if (this.currentLevel == Level.Branch) {
            if (this.squirrel.body.x >= 800) {
                let isBlack = false;
                if (!this.isFading && !isBlack) {
                    this.game.camera.fade(0x000000, 500, false, 1);
                    this.isFading = true;
                    isBlack = true;
                }
                setTimeout(() => {
                    this.enterElevatorTo(Level.Terrier);
                    isBlack = false;
                }, 400);

                return;
            }
        }

        if(this.currentLevel == Level.Elevator) {
            this.updateElevator();
        }

        if (this.currentLevel == Level.Terrier) {
            if (this.squirrel.body.x >= 800) {
                this.enterElevatorTo(Level.Branch);
            }
        }

        this.terrier.tryToAddHole();
    }

    public render()
    {
        if (this.debug) {
            this.game.debug.text(
                "FPS: "  + this.game.time.fps + " ",
                2,
                14,
                "#00ff00"
            );

            for (let i=0; i < 6; i++) {
               if (this.terrier.getHoles()[i]) {
                   this.game.debug.body(this.terrier.getHoles()[i]);
               }
            }

            for (let i=0; i < 6; i++) {
                if (this.branch.nuts()[i]) {
                    this.game.debug.body(this.branch.nuts()[i]);
                }
            }

            this.terrier.buckets.map(bucket => this.game.debug.body(bucket));

            this.branch.nuts().map((nut) => (this.game.debug.body(nut)));
            this.game.debug.body(this.squirrel);
            this.game.debug.body(this.treeDoor);

            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    }

    public enterElevatorTo(toLevel)
    {
        if (this.currentLevel !== Level.Elevator) {
            const sound = this.game.add.audio(`sound/lift`);
            sound.play('', 0, 0.4);
            this.switchToInterior();
            this.squirrel.elevatorIn();
            this.elevatorDestination = toLevel;
            this.currentLevel = Level.Elevator;
            this.squirrel.body.x = 900;
        }
    }

    public updateElevator()
    {
        let elevatorSpeed = 5;

        const maxCameraBranchY = 0;
        const maxSquirrelBranchY = this.branchSquirrelY;

        const maxCameraTerrierY = 1400;
        const maxSquirrelTerrierY = this.floorSquirrelY - 130;

        let cameraBump = false;
        let squirrelBump = false;

        // GO DEEPER
        if (this.elevatorDestination == Level.Terrier) {
            if (this.game.camera.y > 550 && this.game.camera.y < 600  && !this.isFading) {
                this.game.camera.flash(0x000000, 1000, false, 1);
                this.isFading = true;
                this.lift.alpha = 1;
                this.squirrel.body.x = 900;
            }
            if (this.game.camera.y < maxCameraTerrierY) {
                this.game.camera.y += elevatorSpeed;
            } else {
                cameraBump = true;
            }

            if (this.squirrel.body.y < maxSquirrelTerrierY) {
                this.squirrel.body.y += elevatorSpeed;
                this.lift.body.y += elevatorSpeed;
            } else {
                squirrelBump = true;
            }
        }

        // GO UPPER
        if (this.elevatorDestination == Level.Branch) {
            if (this.game.camera.y < 850 && this.game.camera.y > 620  && !this.isFading) {
                this.game.camera.fade(0x000000, 1000, false, 1);
                this.isFading = true;
            }

            if (this.game.camera.y < 500) {
                elevatorSpeed *= 20;
            }

            if (this.game.camera.y > maxCameraBranchY) {
                this.game.camera.y -= elevatorSpeed;
            } else {
                cameraBump = true;
            }

            if (this.squirrel.body.y > maxSquirrelBranchY) {
                this.squirrel.body.y -= elevatorSpeed;
                this.lift.body.y -= elevatorSpeed;
            } else {
                squirrelBump = true;
            }
        }

        // FORBID THE SQUIRREL TO GET OUT ELEVATOR
        if (this.squirrel.body.x < 800) {
            this.squirrel.body.x = 800;
        }

        // DEFINE WHEN IT ARRIVES
        if (cameraBump && squirrelBump) {
            if (this.elevatorDestination == Level.Branch) {
                this.switchToOutside();
                this.squirrel.body.y = maxSquirrelBranchY;
                this.lift.body.y = maxSquirrelBranchY - 965;
                this.game.camera.flash(0x000000, 1000, false, 1);
                this.lift.alpha = 0;
                this.isFading = true;
                this.squirrel.elevatorOut();
                this.squirrel.turnLeft();
            } else {
                this.squirrel.elevatorOut();
                this.squirrel.turnLeft();
            }

            this.currentLevel = this.elevatorDestination;
            this.squirrel.body.x = 780;
        }
    }

    public switchToInterior()
    {
        // this.background = this.game.add.tileSprite(0,0,1024,2048,'background_terrier',0, this.backgroundLayer);
        // this.background = this.game.add.tileSprite(-632,0,1656,2048, 'background_terrier',0, this.backgroundLayer);
        this.soundManager.playInside();
    }

    public switchToOutside()
    {
        // this.background = this.game.add.tileSprite(0,0,1024,2048,'background_tree',0, this.backgroundLayer);
        // this.background = this.game.add.tileSprite(-632,0,1656,2048,'background_tree',0, this.backgroundLayer);
        this.soundManager.playOutside();
    }

    public shutdown()
    {
        this.background.destroy();
        this.squirrel.destroy();
    }

    private gameOver()
    {
        this.timer.stop();
        this.game.state.start('Play');
    }
}
