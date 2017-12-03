
import {Nut} from "./Nut";
import {Branch} from "./Branch";
import {Terrier} from "./Terrier";
import {Bucket} from "./Bucket";
import {Hole} from "./Hole";

export class Squirrel extends Phaser.Sprite
{
    public body: Phaser.Physics.Arcade.Body;
    private speed: number = 1000;
    private scaleRatio = 0.14;
    private cursors: Phaser.CursorKeys;
    private actionKey: Phaser.Key;
    private nuts: number = 0;
    private attacking: boolean = false;
    private branch: Branch;
    private terrier: Terrier;
    private elevating: boolean = false;

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
        this.body.setSize(400, 1800, 700);
        this.body.allowGravity = false;
        this.body.collideWorldBounds = true;

        this.animations.add('idle', [0], 4, true);
        this.animations.add('idle-fat', [2], 4, true);

        this.animations.add('walk', [0, 1], 12, true);
        this.animations.add('walk-fat', [2, 3], 8, true);

        this.animations.add('elevator', [4], 8, true);
        this.animations.add('elevator-fat', [5], 8, true);

        const actionAnimation = this.animations.add('action', [6, 7], 12, false);
        actionAnimation.onStart.add(this.action, this);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.actionKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    public update()
    {
        this.move();
    }

    pick(nut: Nut)
    {
        this.nuts++;
        nut.destroy();
    }

    currentSpeed()
    {
        return this.speed / (1 + this.nuts * 2);
    }

    turnLeft()
    {
        this.scale.x = -this.scaleRatio;
        this.body.velocity.x = -this.currentSpeed();
    }

    turnRight()
    {
        this.scale.x = this.scaleRatio;
        this.body.velocity.x = this.currentSpeed();
    }

    elevatorIn()
    {
        this.elevating = true;
    }

    elevatorOut()
    {
        this.elevating = false;
    }

    private move()
    {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        if (this.elevating) {
            if (this.nuts > 0) {
                this.animations.play('elevator-fat');
            } else {
                this.animations.play('elevator');
            }
            return;
        }

        if (this.cursors.left.isDown) {
            this.turnLeft();
            if (this.nuts > 0) {
                this.animations.play('walk-fat');
            } else {
                this.animations.play('walk');
            }

        } else if (this.cursors.right.isDown) {
            this.turnRight();
            if (this.nuts > 0) {
                this.animations.play('walk-fat');
            } else {
                this.animations.play('walk');
            }

        } else if (this.actionKey.isDown) {
            this.animations.play('action');

        } else {
            if (this.nuts > 0) {
                this.animations.play('idle-fat');
            } else {
                this.animations.play('idle');
            }
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
                    const sound = this.game.add.audio(`sound/leaf/leaf${Math.floor(1 + Math.random() * 7)}`);
                    sound.play('', 0, 0.3);
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
                    if (this.nuts > 0 && bucket.drop()) {
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
