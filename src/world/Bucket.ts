const verticalPosition = 1900;
const CAPACITY = 6;

export class Bucket extends Phaser.Sprite {
  private vertical: number;
  private timer: any;
  public nuts: number = 0;
  public pos: number;

  constructor(itemLayer: Phaser.Group, horizontal: number, pos: number) {
    super(itemLayer.game, horizontal + 40, verticalPosition - 40, 'hole1');
    this.pos = pos;

    itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
    itemLayer.add(this);

    this.body.setSize(500, 500);
    this.scale.set(0.2);
    this.vertical = horizontal;

    itemLayer.add(this);
  }

  update() {
    this.loadTexture(`bucket${this.nuts}`, 0);
  }

  drop() {
    if (this.nuts >= CAPACITY) {
      return false;
    }

    this.nuts++;

    return true;
  }

  pick() {
    if (this.nuts <= 0) {
      return false;
    }

    this.nuts--;

    return true;
  }

  getNuts(): number
  {
    return this.nuts;
  }
}
