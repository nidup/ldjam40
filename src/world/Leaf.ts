const SCALE_MIN = 0.3;
const SCALE_MAX = 0.6;
const LEAF_COUNT = 7;
const RADIUS_MAX = 100;
const MAX_ROTATION = Math.PI / 4;

export class Leaf extends Phaser.Sprite
{
    constructor(group: Phaser.Group, x: number, y: number)
    {
        const leafnumber = 1 + Math.floor(Math.random() * LEAF_COUNT);
        const xRandom = x + (Math.random() * RADIUS_MAX) - (RADIUS_MAX / 2);
        const yRandom = y + (Math.random() * RADIUS_MAX) - (RADIUS_MAX / 2);
        super(group.game, xRandom, yRandom, 'leaf' + leafnumber, 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);

        const scale = Math.random() * (SCALE_MAX - SCALE_MIN) + SCALE_MIN;
        this.scale.setTo(scale, scale);
        this.rotation = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;

        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;
    }

    public pickable(): boolean
    {
        return false;
    }

    public hit()
    {
    }
}
