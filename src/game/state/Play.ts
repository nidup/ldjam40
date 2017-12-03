
import {Street} from "../../world/Street";
import {Citizen} from "../../world/Citizen";
import {Cop} from "../../world/Cop";

import {Squirrel} from "../../world/Squirrel";
import {Terrier} from "../../world/Terrier";
import {Branch} from "../../world/Branch";
import {Inventory} from "../../ui/Inventory";

enum Level {
    Branch,
    Terrier,
    Elevator
}

export default class Play extends Phaser.State
{
    private debug: boolean = false;
    private sky: Phaser.TileSprite;
    private background: Phaser.TileSprite;
    private lift: Phaser.Sprite;
    private buildings: Phaser.TileSprite;
    private street: Street;
    private characterLayer: Phaser.Group;
    private backgroundLayer: Phaser.Group;
    private squirrel: Squirrel;
    private terrier: Terrier;
    private branch: Branch;
    private currentLevel: Level;
    private isFading: boolean = false;

    private elevatorDestination: Level;

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
        this.lift = new Phaser.Sprite(this.game, 795, 710, 'lift');
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
        this.squirrel = new Squirrel(this.characterLayer, 10, 1700, 'squirrel', this.branch, this.terrier);

        new Inventory(interfaceLayer, 0, 0, 'Inventory', this.squirrel, this.terrier);

        this.game.world.setBounds(0, 0, 1024, 2048);

        this.game.camera.y = 2048;
        // this.game.sound.play('music/inside', 0.7, true);
    }

    public update()
    {
        if (this.currentLevel == Level.Branch) {
            if (this.squirrel.body.x >= 800) {
                this.enterElevatorTo(Level.Terrier);
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


        /*
        const skyParallaxSpeed = 0.03;
        this.sky.tilePosition.x -= skyParallaxSpeed;

        const backgroundParallaxSpeed = 0.05;
        if (this.squirrel.movingToTheRight()) {
            this.background.tilePosition.x -= backgroundParallaxSpeed;
        } else if (this.squirrel.movingToTheLeft()) {
            this.background.tilePosition.x += backgroundParallaxSpeed;
        }

        this.characterLayer.sort('y', Phaser.Group.SORT_ASCENDING);
        */
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

            // TO DROP
            // for (let i=0; i < 6; i++) {
            //     if (this.terrier.getHoles()[i]) {
            //         this.game.debug.body(this.terrier.getHoles()[i]);
            //     }
            // }

           this.game.debug.body(this.squirrel);

            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        }
    }

    public enterElevatorTo(toLevel)
    {
        this.switchToInterior();
        this.elevatorDestination = toLevel;
        this.currentLevel = Level.Elevator;
    }

    public updateElevator()
    {
        let elevatorSpeed = 5;

        const maxCameraBranchY = 0;
        const maxSquirrelBranchY = 400;

        const maxCameraTerrierY = 1400;
        const maxSquirrelTerrierY = 1700;

        let cameraBump = false;
        let squirrelBump = false;

        // GO DEEPER
        if (this.elevatorDestination == Level.Terrier) {
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
            console.log(this.game.camera.y);
            if (this.game.camera.y < 850 && this.game.camera.y > 620  && !this.isFading) {
                this.game.camera.fade(0x000000, 1000, false, 1);
                this.isFading = true;
            }

            if (this.game.camera.y === 0 && !this.isFading) {
                this.game.camera.flash(0x000000, 1000, false, 1);
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
            }

            this.currentLevel = this.elevatorDestination;
            this.squirrel.body.x = 780;
        }
    }

    public switchToInterior()
    {
        this.game.sound.stopAll();
        // this.background = this.game.add.tileSprite(0,0,1024,2048,'background_terrier',0, this.backgroundLayer);
        this.background = this.game.add.tileSprite(-632,0,1656,2048, 'background_terrier',0, this.backgroundLayer);
        // this.game.sound.play('music/inside', 0.7, true);
    }

    public switchToOutside()
    {
        this.game.sound.stopAll();
        // this.background = this.game.add.tileSprite(0,0,1024,2048,'background_tree',0, this.backgroundLayer);
        this.background = this.game.add.tileSprite(-632,0,1656,2048,'background_tree',0, this.backgroundLayer);
        // this.game.sound.play('music/outside', 0.7, true);

    }

    public shutdown()
    {
        this.sky.destroy();
        this.background.destroy();
        this.buildings.destroy();
        this.squirrel.destroy();
        this.street.citizens().all().map(function(citizen: Citizen) { citizen.destroy()});
        this.street.cops().all().map(function(cop: Cop) { cop.destroy()});
        this.street = null;
    }
}
