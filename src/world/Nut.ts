
import {Squirrel} from "./Squirrel";

export class Nut extends Phaser.Sprite
{
    private squirrel: Squirrel;

    constructor(group: Phaser.Group, x: number, y: number, squirrel: Squirrel)
    {
        super(group.game, x, y, 'nut', 0);
        this.squirrel = squirrel;

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);

        this.body.setCircle(25, 0, 2);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }

    public update()
    {
        this.game.physics.arcade.overlap(
            this.squirrel,
            this,
            function(squirrel: Squirrel, nut: Nut) {
                squirrel.pick(nut);
            },
            null,
            this
        );
    }
}
