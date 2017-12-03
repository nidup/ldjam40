
import {Config} from "../game/Config";
import {Hero} from "../world/Hero";
import {Squirrel} from "../world/Squirrel";
import {Terrier} from "../world/Terrier";

export class Inventory extends Phaser.Sprite
{
    private terrier: Terrier;
    private squirrel: Squirrel;
    private nutsText: Phaser.BitmapText;

    constructor(group: Phaser.Group, x: number, y: number, key: string, squirrel: Squirrel, terrier: Terrier)
    {
        super(group.game, x, y, key, 0);
        this.squirrel = squirrel;
        this.terrier = terrier;
        group.add(this);

        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.fixedToCamera = true;

        /*
        this.animations.add('idle', [0, 1, 2, 3], 4, true);
        this.animations.add('warning', [4, 5, 6, 7], 4, true);
        this.animations.add('dead', [8, 9, 10, 11], 4, true);
        this.animations.play('idle');
        */

        const fontSize = 13;
        const marginLeftAmountToImage = 80;
        const marginTopAmountToImage = 15;

        const gunX = 127;
        const gunY = 45;
        const nutSprite = group.game.add.sprite(gunX, gunY, 'nut', 1, group);
        nutSprite.scale.setTo(0.1, 0.1);
        nutSprite.fixedToCamera = true;

        this.nutsText = this.game.add.bitmapText(gunX - marginLeftAmountToImage, gunY + marginTopAmountToImage, 'carrier-command','0', fontSize, group);
        this.nutsText.fixedToCamera = true;
        this.nutsText.align = 'right';
    }

    public update()
    {
        this.nutsText.setText(this.alignText(this.terrier.totalNuts()));
    }

    private alignText(amount: number): string
    {
        let text = "" + amount;
        if (amount < 10) {
            text = "  " + amount;
        } else if (amount < 100) {
            text = " " + amount;
        }

        return text;
    }
}
