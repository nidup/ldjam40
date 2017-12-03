
import {SoundManager} from "../../sound/SoundManager";
export default class Start extends Phaser.State {
    private soundManager: SoundManager;

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);

        let image = this.game.add.image(0, 0, 'start');
        image.scale.setTo(0.7, 0.7);

        this.soundManager = new SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playOutside();
    }

    public startGame ()
    {
        this.soundManager.stop();
        this.game.state.start('Play', true, false);
    }
}
