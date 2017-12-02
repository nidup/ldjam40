import {Hole} from "./Hole";
import {Bucket} from "./Bucket";

const SLOTS = 6;
const MIN_HOLE_TIME = 0;
const MAX_HOLE_TIME = 5;

export class Terrier extends Phaser.Sprite
{
    private holes: Hole[];
    public buckets: Bucket[];
    private itemLayer: Phaser.Group;

    constructor(itemLayer: Phaser.Group, x, y, key)
    {
        super(itemLayer.game, x, y, key);
        this.holes = [];
        this.buckets = [];
        this.itemLayer = itemLayer;

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
        this.addBuckets();
    }

    update () {

    }

    getHoles(): Hole[] {
        return this.holes;
    }

    getBuckets(): Bucket[] {
        return this.buckets;
    }

    addHole(): void
    {
        const slot = this.randomSlot();
        const minSlotX = 50;
        const maxSlotX = 800;
        const slotSize = (maxSlotX - minSlotX) / SLOTS;

        if (null !== slot) {
            this.holes[slot] = new Hole(this.itemLayer, minSlotX + slotSize * slot, this);
        }

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }

    addBuckets(): void {
        for (let i = 0; i < SLOTS; i++) {
            this.addBucket(i);
        }
    }

    addBucket(slot): void {
        const minSlotX = 50;
        const maxSlotX = 800;
        const slotSize = (maxSlotX - minSlotX) / SLOTS;

        if (null !== slot) {
            this.buckets[slot] = new Bucket(this.itemLayer, minSlotX + slotSize * slot);
        }
    }

    randomTime(): number
    {
        return this.itemLayer.game.rnd.between(MIN_HOLE_TIME, MAX_HOLE_TIME) * Phaser.Timer.SECOND;
    }

    randomSlot(): number
    {
        const emptySlots = this.getEmptySlots();
        if (emptySlots.length <= 0) {
            return null;
        }

        return emptySlots[Math.floor(Math.random() * emptySlots.length)];
    }

    getEmptySlots(): number[]
    {
        let slots = [];
        for (let i = 0; i < SLOTS; i++) {
            slots.push(i);
        }

        const emptySlots = slots.filter((slot) => {
            return Object.keys(this.holes).indexOf(slot + '') <= -1;
        });

        return emptySlots;
    }
}
