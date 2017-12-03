const MAX_ROTATION = Math.PI / 6;

import {Slot} from "./Branch";
export class Nut extends Phaser.Sprite
{
    private resistance: number = 5;
    private slot: Slot;
    private tween: Phaser.Tween;
    private group: Phaser.Group;

    constructor(group: Phaser.Group, x: number, y: number, slot: Slot)
    {
        super(group.game, x, y, 'nut_glow', 0);
        this.slot = slot;
        this.group = group;

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.anchor.setTo(0.5, 0.5);
        this.scale.setTo(0.15, 0.15);

        this.rotation = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;

        this.body.setSize(385, 2000);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

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

    public pickable(): boolean
    {
        return this.resistance <= 0;
    }

    public hit()
    {
        this.runAnimation();
        this.group.game.add.tween(this).to({ y: this.y + 10 }, 30, Phaser.Easing.power2, true);
        this.slot.animateLeaves();
        this.resistance--;
    }


}
