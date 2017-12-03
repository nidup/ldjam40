import { Terrier } from "./Terrier";
import { Bucket } from "./Bucket";
import Tween = Phaser.Tween;

const horizontalPosition = 1600;
const MAX_LIFE = 100;

const HAND_TYPES = ['bear', 'mouse', 'raccoon'];

export class Hole extends Phaser.Sprite
{
    public pos: number;
    private xPosition: number;
    private life: number;
    private timer: any;
    private pic: Phaser.Image;
    private handType: string;
    private itemLayer: Phaser.Group;
    private handState: string;
    private terrier: Terrier;
    private filled: boolean;
    private nuts: number = 0;
    private grabTween: Tween;
    private isDescending = true;

    constructor(itemLayer: Phaser.Group, xPosition: number, pos: number, terrier: Terrier)
    {
        super(itemLayer.game, xPosition, horizontalPosition, 'hole1');

        this.scale.set(1);
        this.xPosition = xPosition;
        this.pos = pos;
        this.terrier = terrier;
        this.life = 1;
        this.itemLayer = itemLayer;
        this.terrier = terrier;

        this.timer = itemLayer.game.time.events.loop(0.2 * Phaser.Timer.SECOND, this.gainLife, this);

        itemLayer.add(this);

        itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.inputEnabled = true;
        this.body.setSize(50, 500, 50);

        this.filled = false;
    }

    gainLife() {
        if (this.filled) {
            return;
        }

        if (this.life >= MAX_LIFE) {
            return;
        }

        this.life++;
    }

    update() {
        if (this.life <= 10) {
            this.loadTexture('hole1', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        } else if (this.life <= 20) {
            this.loadTexture('hole2', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        } else if (this.life <= 30) {
            this.loadTexture('hole3', 0);
            if (this.hasHand()) {
                this.removeHand();
            }
        } else {
            this.loadTexture('hole4', 0);
            if (!this.hasHand()) {
                this.addHand();
            }
        }

        if (this.hasHand()) {
            this.pic.updateCrop();
        }
    }

    hit() {
        this.life = this.life - 10;

        if (this.life < 0) {
            this.destroy();
            this.fill();
            this.terrier.cleanFilledHoles();
        }

        if (this.nuts > 0) {
            this.nuts = 0;
            this.handState = 'empty';
            this.refreshTexture();

            return true;
        }

        return false;
    }

    isFilled(): boolean
    {
        return this.filled;
    }

    private fill()
    {
        this.filled = true;
    }

    private hasHand(): boolean
    {
        return this.pic !== null;
    }

    private removeHand()
    {
        if (this.pic) {
            this.pic.destroy();
        }

        this.pic = null;

        if (this.grabTween) {
            this.grabTween.stop(false);
        }
    }

    private endHandMovement() {
        const matchingBucket = this.terrier.getBuckets().find((bucket: Bucket) => bucket.pos === this.pos);

        if (this.handState == 'full') {
            // DESTROY THE NUT
            this.nuts = 0;
            this.handState = 'empty';
            this.refreshTexture();
        } else if (this.handState == 'empty' && this.isDescending) {
            // PICK UP A NUT
            if (matchingBucket && matchingBucket.nuts > 0) {
                matchingBucket.pick();
                this.nuts++;
                this.handState = 'full';
                this.refreshTexture();
            }
        }

        this.isDescending = !this.isDescending;
    }

    private addHand() {

        const xPosition = this.xPosition;
        this.handType = HAND_TYPES[Math.floor(Math.random() * HAND_TYPES.length)];
        this.handState = 'empty';

        const picKey = this.handType + '/' + this.handState;

        let pic = this.itemLayer.game.add.image(xPosition + 40, horizontalPosition + 70, picKey);

        let cropRect = new Phaser.Rectangle(0, pic.height, pic.width, pic.height);
        this.grabTween = this.itemLayer.game.add.tween(cropRect).to({ y: 100 }, 3000, Phaser.Easing.Default, false, 0, 1000, true);

        this.grabTween.onRepeat.add(() => {
            // console.log(`hand down ${this.pos}`);
            this.endHandMovement();
        });

        pic.crop(cropRect);
        pic.scale.set(0.16);

        this.isDescending = true;

        this.grabTween.start();
        this.pic = pic;
    }

    private refreshTexture()
    {
        this.pic.loadTexture(this.handType + '/' + this.handState);
    }
}
