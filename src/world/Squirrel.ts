
import {Nut} from "./Nut";
import {Branch} from "./Branch";
import {Terrier} from "./Terrier";
import {Bucket} from "./Bucket";
import {Hole} from "./Hole";

export class Squirrel extends Phaser.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    private speed: number = 600;
    private scaleRatio = 8;
    private cursors: Phaser.CursorKeys;
    private actionKey: Phaser.Key;
    private nuts: number = 3;
    private attacking: boolean = false;
    private branch: Branch;
    private terrier: Terrier;

    constructor(group: Phaser.Group, x: number, y: number, key: string, branch: Branch, terrier: Terrier)
    {
        super(group.game, x, y, key, 0);
        this.branch = branch;
        this.terrier = terrier;

        group.game.physics.enable(this, Phaser.Physics.ARCADE);
        group.add(this);

        this.inputEnabled = true;
        this.scale.setTo(this.scaleRatio, this.scaleRatio);
        this.anchor.setTo(0.5, 0.5);
        this.body.setSize(10, 10, 10);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('idle', [0, 1, 2, 3, 4], 4, true);
        const actionAnimation = this.animations.add('action', [21, 22, 23, 24, 25, 26], 12, false);
        actionAnimation.onStart.add(this.action, this);

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

    pick(nut: Nut)
    {
        this.nuts++;
        nut.destroy();
    }

    currentSpeed()
    {
        return this.speed / (1 + this.nuts / 3);
    }

    private move()
    {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.scale.x = -this.scaleRatio;
            this.body.velocity.x = -this.currentSpeed();
                //this.animations.play('walk-'+this.currentGunAnim);

        } else if (this.cursors.right.isDown) {
            this.scale.x = this.scaleRatio;
            this.body.velocity.x = this.currentSpeed();
            //this.animations.play('walk-'+this.currentGunAnim);

        } else if (this.actionKey.isDown) {
            this.animations.play('action');

        } else {
            this.animations.play('idle');
        }
    }

    private action()
    {
        if (this.attacking === false) {
            this.attacking = true;
            this.game.physics.arcade.overlap(
                this,
                this.branch.nuts(),
                function (squirrel: Squirrel, nut: Nut) {
                    nut.hit();
                    if (nut.pickable()) {
                        squirrel.pick(nut);
                    }
                },
                null,
                this
            );

            this.game.physics.arcade.overlap(
                this,
                this.terrier.getHoles(),
                function (squirrel: Squirrel, hole: Hole) {
                    const bucket = this.terrier.getBuckets().find((bucket: Bucket) => bucket.pos === hole.pos);
                    if (bucket && hole.hit()) {
                        bucket.drop();
                    }
                },
                null,
                this
            );

            this.game.physics.arcade.overlap(
                this,
                this.terrier.getBuckets(),
                function (squirrel: Squirrel, bucket: Bucket) {
                    if (this.nuts > 0) {
                        bucket.drop();
                        this.nuts--;
                    }
                },
                null,
                this
            );

            this.attacking = false;
        }
    }
}
