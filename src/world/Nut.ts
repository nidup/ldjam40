
import {Config} from "../game/Config";

export class Nut extends Phaser.Sprite
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'nut', 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(Config.pixelScaleRatio(), Config.pixelScaleRatio());
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }
}
