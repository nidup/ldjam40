
export class Nut extends Phaser.Sprite
{
    private resistance: number = 5;

    constructor(group: Phaser.Group, x: number, y: number)
    {
        super(group.game, x, y, 'nut', 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);

        this.body.setSize(50, 200);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }

    public pickable(): boolean
    {
        return this.resistance <= 0;
    }

    public hit()
    {
        this.resistance--;
    }
}