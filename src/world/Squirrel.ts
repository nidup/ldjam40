
import {PickableItem} from "./PickableItem";

export class Squirrel extends Phaser.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    private speed: number = 150;
    private scaleRatio = 8;
    private cursors: Phaser.CursorKeys;
    private actionKey: Phaser.Key;
    private currentGunAnim: string = 'gun';
    private nuts: number = 0;

    constructor(group: Phaser.Group, x: number, y: number, key: string)
    {
        super(group.game, x, y, key, 0);

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(this.scaleRatio, this.scaleRatio);
        this.anchor.setTo(0.5, 0.5);
        this.body.setCircle(9, 7, 8);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('idle-gun', [0, 1, 2, 3, 4], 4, true);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    public update()
    {
        this.move();
    }

    movingToTheRight(): boolean
    {
        return this.body.velocity.x > 0;
    }

    movingToTheLeft(): boolean
    {
        return this.body.velocity.x < 0;
    }

    pick(item: PickableItem)
    {
        if (item.key === 'Nut') {

        }
        item.kill();
    }

    private move()
    {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.scale.x = -this.scaleRatio;
            this.body.velocity.x = -this.speed;
            //this.animations.play('walk-'+this.currentGunAnim);

        } else if (this.cursors.right.isDown) {
            this.scale.x = this.scaleRatio;
            this.body.velocity.x = this.speed;
            //this.animations.play('walk-'+this.currentGunAnim);

        } else if (this.actionKey.isDown) {
            this.action();

        } else {
            this.animations.play('idle');
        }
    }

    private action()
    {
        /*
        this.animations.play('shot-'+this.currentGunAnim);
        this.currentGun.fire();
        if (this.currentGun === this.shotgun && this.shotgunAmno() === 0) {
            this.switchToGun();
        }
        this.game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
            this.aggressiveRating++;
        }, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 4, function () {
            this.aggressiveRating--;
        }, this);*/
    }

}
