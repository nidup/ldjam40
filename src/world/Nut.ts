
import {Slot} from "./Branch";
export class Nut extends Phaser.Sprite
{
    private resistance: number = 5;
    private slot: Slot;

    constructor(group: Phaser.Group, x: number, y: number, slot: Slot)
    {
        super(group.game, x, y, 'nut', 0);
        this.slot = slot;

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(0.1, 0.1);

        this.body.setSize(385, 2000);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }

    public pickable(): boolean
    {
        return this.resistance <= 0;
    }

    public hit()
    {
        this.slot.animateLeaves();
        this.resistance--;
    }
}
