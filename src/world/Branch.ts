
import {Nut} from "./Nut";

export class Branch
{
    private group: Phaser.Group;
    private slots: Slot[];
    private minNutAddingTime: number = 20;
    private maxNutAddingTime: number = 40;

    constructor(group: Phaser.Group)
    {
        this.group = group;

        this.slots = [];
        this.slots.push(
            new Slot(1, 20, 200),
            new Slot(2, 100, 200),
            new Slot(3, 210, 200),
            new Slot(4, 350, 200),
            new Slot(5, 470, 200),
            new Slot(6, 540, 200),
            new Slot(7, 640, 200),
        );

        this.slots[0].attachNut(group);
        this.slots[1].attachNut(group);
        this.slots[2].attachNut(group);
        this.slots[3].attachNut(group);
        this.slots[4].attachNut(group);
        this.slots[5].attachNut(group);
        this.slots[6].attachNut(group);

        this.group.game.time.events.add(this.randomAddingNutTime(), this.addNut, this);
    }

    public nuts(): Nut[]
    {
        const notEmptySlots = this.slots.filter(function(slot: Slot) {
            return !slot.free();
        });

        const attachedNuts = [];
        notEmptySlots.forEach(function(slot: Slot) {
            attachedNuts.push(slot.nut());
        });

        return attachedNuts;
    }

    private randomAddingNutTime(): number
    {
        return this.group.game.rnd.between(this.minNutAddingTime, this.maxNutAddingTime) * Phaser.Timer.SECOND;
    }

    private freeSlots(): Slot[]
    {
        const freeSlots = this.slots.filter(function(slot: Slot) {
            return slot.free();
        });

        return freeSlots;
    }

    private addNut()
    {
        const freeSlots = this.freeSlots();
        if (freeSlots.length >= 1) {
            freeSlots[0].attachNut(this.group);
        }

        this.group.game.time.events.add(this.randomAddingNutTime(), this.addNut, this);
    }
}

class Slot {
    private index: number;
    private x: number;
    private y: number;
    private attachedNut: Nut;

    constructor(index: number, x: number, y:number)
    {
        this.index = index;
        this.x = x;
        this.y = y;
    }

    nut(): Nut
    {
        return this.attachedNut;
    }

    attachNut(group)
    {
console.log('attach');
        this.attachedNut = new Nut(group, this.x, this.y);
    }

    free(): boolean
    {
        return this.attachedNut === null || this.attachedNut.alive === false;
    }
}
