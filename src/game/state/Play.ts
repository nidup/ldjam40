
import {Street} from "../../world/Street";
import {Citizen} from "../../world/Citizen";
import {Cop} from "../../world/Cop";

import {Squirrel} from "../../world/Squirrel";
import {Terrier} from "../../world/Terrier";
import {Branch} from "../../world/Branch";

enum Level {
    Branch,
    Terrier
}

export default class Play extends Phaser.State
{
    private debug: boolean = true;
    private sky: Phaser.TileSprite;
    private background: Phaser.TileSprite;
    private buildings: Phaser.TileSprite;
    private street: Street;
    private characterLayer: Phaser.Group;
    private squirrel: Squirrel;
    private terrier: Terrier;
    private branch: Branch;
    private currentLevel: Level;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';

        const tileSpriteRatio = 1;
        const width = 1600;
        const height = 1200;
        const heightPosition = -400;

        const skyLayer = this.game.add.group();
        skyLayer.name = 'Sky';
        this.sky = this.game.add.tileSprite(0,heightPosition,width,height,'sky',0, skyLayer);
        this.sky.tileScale.set(tileSpriteRatio, tileSpriteRatio);

        const backgroundLayer = this.game.add.group();
        backgroundLayer.name = 'Background';
        this.background = this.game.add.tileSprite(0,heightPosition,1024,2048,'background_terrier',0, backgroundLayer);
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

        this.squirrel = new Squirrel(this.characterLayer, 10, 450, 'squirrel', this.branch);

  //      new Inventory(interfaceLayer, 600, 0, 'InventoryPanel', this.pla);

        this.game.world.setBounds(0, 0, 1024, 2048);
 //       this.game.camera.follow(this.squirrel);
    }

    public update()
    {
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
//            this.game.debug.body(this.squirrel);
           // this.game.debug.body(this.branch.nuts[0]);

            this.game.debug.cameraInfo(this.game.camera, 32, 32);

        }
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
