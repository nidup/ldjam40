const SCALE_MIN = 0.3;
const SCALE_MAX = 0.6;
const LEAF_COUNT = 7;
const GAP_HEIGHT = 150;
const GAP_WIDTH = 100;
const MAX_ROTATION = Math.PI / 5;

export class Leaf extends Phaser.Sprite
{
    private tween: Phaser.Tween;
    private group: Phaser.Group;

    constructor(group: Phaser.Group, x: number, y: number)
    {
        const leafnumber = 1 + Math.floor(Math.random() * LEAF_COUNT);
        const xRandom = x + (Math.random() * GAP_WIDTH) - (GAP_WIDTH / 2);
        const yRandom = y + (Math.random() * GAP_HEIGHT) - (GAP_HEIGHT / 2);
        super(group.game, xRandom, yRandom, 'leaf' + leafnumber, 0);

        group.add(this);
        this.group = group;

        this.anchor.setTo(0.5, 0.2);

        const scale = Math.random() * (SCALE_MAX - SCALE_MIN) + SCALE_MIN;
        this.scale.setTo(scale, scale);
        this.rotation = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;

        this.updateTween();
    }

    runAnimation() {
        if (this.tween.isRunning) {
            return null;
        }
        this.tween.start();
    }

    updateTween() {
        this.tween = this.group.game.add.tween(this).to( { rotation: Math.random() * MAX_ROTATION * 2 - MAX_ROTATION }, 100, Phaser.Easing.power2, false);
        this.tween.onComplete.add(this.updateTween, this);
    }
}
