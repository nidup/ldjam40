import {Hole} from "./Hole";
import {Bucket} from "./Bucket";

const SLOTS = 4;
const MIN_HOLE_TIME = 0;
const MAX_HOLE_TIME = 5;
const MIN_SLOT_X = 150;
const MAX_SLOT_X = 800;
const SLOT_SIZE = (MAX_SLOT_X - MIN_SLOT_X) / SLOTS;


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

    cleanFilledHoles() {
        this.holes = this.holes.filter(hole => !hole.isFilled());
    }

    getHoles(): Hole[] {
        return this.holes;
    }

    getBuckets(): Bucket[] {
        return this.buckets;
    }

    addHole(): void
    {
        const availableSlot = this.randomAvailableSlot();

        if (null !== availableSlot) {
            this.holes.push(new Hole(this.itemLayer, MIN_SLOT_X + SLOT_SIZE * (availableSlot - 1), availableSlot, this));
        }

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }

    addBuckets(): void {
        for (let i = 1; i <= SLOTS; i++) {
            this.addBucket(i);
        }
    }

    addBucket(slot): void {
        if (null !== slot) {
            this.buckets.push(new Bucket(this.itemLayer, MIN_SLOT_X + SLOT_SIZE * (slot - 1), slot));
        }
    }

    randomTime(): number
    {
        return this.itemLayer.game.rnd.between(MIN_HOLE_TIME, MAX_HOLE_TIME) * Phaser.Timer.SECOND;
    }

    randomAvailableSlot(): number
    {
        const emptySlots = this.getEmptySlots();

        if (emptySlots.length === 0) {
            return null;
        }

        let randomSlotIndex = this.itemLayer.game.rnd.integerInRange(0, emptySlots.length - 1);

        return emptySlots[randomSlotIndex];
    }

    getEmptySlots(): number[]
    {
        let allSlotsPosition = [];
        for (let i = 1; i <= SLOTS; i++) {
            allSlotsPosition.push(i);
        }

        const occupiedPositions = this.holes.map(hole => hole.pos);

        return allSlotsPosition.filter(pos => occupiedPositions.indexOf(pos) === -1);
    }

    totalNuts(): number
    {
        let nuts = 0;
        this.buckets.forEach(function(bucket: Bucket) {
            nuts += bucket.getNuts();
        });
        return nuts;
    }
}
