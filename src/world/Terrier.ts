import {Hole} from "./Hole";

const SLOTS = 6;
const MIN_HOLE_TIME = 3;
const MAX_HOLE_TIME = 6;

export class Terrier
{
    private nuts: number = 0;
    private holes: Hole[];
    private itemLayer: Phaser.Group;

    constructor(itemLayer: Phaser.Group)
    {
        this.holes = [];
        this.itemLayer = itemLayer;

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
    }

    addHole(): void
    {
        const slot = this.randomSlot();
        const minSlotX = 50;
        const maxSlotX = 800;
        const slotSize = (maxSlotX - minSlotX) / SLOTS;

        if (null !== slot) {
            this.holes[slot] = new Hole(this.itemLayer, minSlotX + slotSize * slot);
        }

        this.itemLayer.game.time.events.add(this.randomTime(), this.addHole, this);
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
        return slots.filter((slot) => {
            return Object.keys(this.holes).indexOf(slot + '') <= -1;
        });
    }
}
