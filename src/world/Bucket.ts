const horizontalPosition = 1700;
const CAPACITY = 4;

export class Bucket extends Phaser.Sprite {
  private vertical: number;
  private timer: any;
  public nuts: number = 0;
  public pos: number;

  constructor(itemLayer: Phaser.Group, vertical: number, pos: number) {
    super(itemLayer.game, vertical + 80, horizontalPosition, 'hole1');
    this.pos = pos;

    itemLayer.game.physics.enable(this, Phaser.Physics.ARCADE);
    itemLayer.add(this);

    this.body.setSize(150, 150);
    this.scale.set(0.4);
    this.vertical = vertical;

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
