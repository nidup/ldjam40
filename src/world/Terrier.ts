import {Hole} from "./Hole";
import {Bucket} from "./Bucket";

const SLOTS = 6;
const MIN_HOLE_TIME = 0;
const MAX_HOLE_TIME = 5;

export class Terrier
{
    private holes: Hole[];
    public buckets: Bucket[];
    private itemLayer: Phaser.Group;

    constructor(itemLayer: Phaser.Group)
    {
        this.holes = [];
        this.buckets = [];
        this.itemLayer = itemLayer;

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
        this.addBuckets();
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
        const minSlotX = 50;
        const maxSlotX = 800;
        const slotSize = (maxSlotX - minSlotX) / SLOTS;

        if (null !== availableSlot) {
            this.holes.push(new Hole(this.itemLayer, minSlotX + slotSize * availableSlot, availableSlot));
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
}
