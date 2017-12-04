const SCALE_MIN = 0.1;
const SCALE_MAX = 0.3;
const LEAF_COUNT = 7;
const GAP_VERTICAL = 50;
const MAX_ROTATION = Math.PI / 5;

export class FallingLeaf extends Phaser.Sprite
{
    private group: Phaser.Group;

    constructor(group: Phaser.Group, x: number)
    {
        const top = -50;
        const bottom = top + 900;

        const leafnumber = 1 + Math.floor(Math.random() * LEAF_COUNT);
        super(group.game, x - GAP_VERTICAL, top, 'leaf' + leafnumber, 0);

        group.add(this);
        this.group = group;

        this.anchor.setTo(0.5, 0.1);

        const scale = Math.random() * (SCALE_MAX - SCALE_MIN) + SCALE_MIN;
        this.scale.setTo(scale, scale);
        this.rotation = MAX_ROTATION;
        this.alpha = 1;

        this.group.game.add.tween(this).to( { x: x + GAP_VERTICAL, rotation: -MAX_ROTATION }, 1000, Phaser.Easing.Quadratic.In, true, 0, 1000, true);
        let tween = this.group.game.add.tween(this).to( { y: bottom }, 12000, Phaser.Easing.Default, true);
        tween.onComplete.add(() => {
            let tween2 = this.group.game.add.tween(this).to({ alpha: 0 }, 1000, Phaser.Easing.Default, true);
            tween2.onComplete.add(() => {
                this.destroy();
            });
        });
    }

}
