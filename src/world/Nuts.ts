
import {Nut} from "./Nut";

export class Nuts
{
    private items : Nut[];

    public constructor()
    {
        this.items = [];
    }

    public all(): Nut[]
    {
        return this.items;
    }

    public add(nut: Nut): void
    {
        this.items.push(nut);
    }

    public remove(nut: Nut): void
    {
        const index = this.items.indexOf(nut);
        this.items.splice(index, 1);
    }

    public length(): number
    {
        return this.items.length;
    }
}
