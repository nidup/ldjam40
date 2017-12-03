
import {Nut} from "./Nut";

export class Branch
{
    private group: Phaser.Group;
    private slots: Slot[];
    //private attachedNuts: Nut[];

    constructor(group: Phaser.Group)
    {
        this.group = group;
        //this.attachedNuts = [];

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
}


class Slot {
    private index: number;
    private x: number;
    private y: number;
    private attachedNut: Nut = null;

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

        this.attachedNut = new Nut(group, this.x, this.y);
    }

    free()
    {
        return this.attachedNut === null;
    }
}
