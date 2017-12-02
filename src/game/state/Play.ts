
import {Street} from "../../world/Street";
import {Citizen} from "../../world/Citizen";
import {Cop} from "../../world/Cop";

import {Squirrel} from "../../world/Squirrel";
import {Terrier} from "../../world/Terrier";
import {Branch} from "../../world/Branch";

enum Level {
    Branch,
    Terrier,
    Elevator
}

export default class Play extends Phaser.State
{
    private debug: boolean = true;
    private sky: Phaser.TileSprite;
    private background: Phaser.TileSprite;
    private buildings: Phaser.TileSprite;
    private street: Street;
    private characterLayer: Phaser.Group;
    private backgroundLayer: Phaser.Group;
    private squirrel: Squirrel;
    private terrier: Terrier;
    private branch: Branch;
    private currentLevel: Level;

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
        this.background = this.game.add.tileSprite(0,0,1024,2048,'background_terrier',0, this.backgroundLayer);
        this.background.tileScale.set(tileSpriteRatio, tileSpriteRatio);

        const itemsLayer = this.game.add.group();
        itemsLayer.name = 'Items';
        // this.buildings = this.game.add.tileSprite(0,heightPosition,width,height,'buildings',0, itemsLayer);
        // this.buildings.tileScale.set(tileSpriteRatio, tileSpriteRatio);
        // this.buildings.animations.add('idle', [0, 1, 2], 2, true);
        // this.buildings.animations.play('idle');

        this.characterLayer = this.game.add.group();
        this.characterLayer.name = 'Characters';

        const interfaceLayer = this.game.add.group();
        interfaceLayer.name = 'Interface';

        this.currentLevel = Level.Terrier;
        this.terrier = new Terrier(itemsLayer);
        this.branch = new Branch(itemsLayer);

        this.squirrel = new Squirrel(this.characterLayer, 10, 1700, 'squirrel', this.branch, this.terrier);

  //      new Inventory(interfaceLayer, 600, 0, 'InventoryPanel', this.pla);

        this.game.world.setBounds(0, 0, 1024, 2048);

        this.game.camera.y = 2048;
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
            for (let i=0; i < 6; i++) {
                if (this.terrier.getHoles()[i]) {
                    this.game.debug.body(this.terrier.getHoles()[i]);
                }
            }

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
        const elevatorSpeed = 5;

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
            } else {
                squirrelBump = true;
            }
        }

        // GO UPPER
        if (this.elevatorDestination == Level.Branch) {
            if (this.game.camera.y > maxCameraBranchY) {
                this.game.camera.y -= elevatorSpeed;
            } else {
                cameraBump = true;
            }

            if (this.squirrel.body.y > maxSquirrelBranchY) {
                this.squirrel.body.y -= elevatorSpeed;
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
                this.switchToOutside()
            }

            this.currentLevel = this.elevatorDestination;
            this.squirrel.body.x = 780;
        }
    }

    public switchToInterior()
    {
        this.background = this.game.add.tileSprite(0,0,1024,2048,'background_terrier',0, this.backgroundLayer);
    }

    public switchToOutside()
    {
        this.background = this.game.add.tileSprite(0,0,1024,2048,'background_tree',0, this.backgroundLayer);
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
