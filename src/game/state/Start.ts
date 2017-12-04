
import {SoundManager} from "../../sound/SoundManager";
export default class Start extends Phaser.State {
    private soundManager: SoundManager;
    private imageSplash: Phaser.Image;
    private imageText: Phaser.Image;
    private imageIllustration: Phaser.Image;
    private spaceKey: Phaser.Key;

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        this.imageText = this.game.add.image(0, 0, 'start');
        this.imageText.scale.setTo(0.7, 0.7);
        this.imageText.alpha = 0;

        this.imageIllustration = this.game.add.image(0, 0, 'start_illustration');
        this.imageIllustration.alpha = 0;

        this.imageSplash = this.game.add.image(0,0, 'splash');
        this.imageSplash.scale.setTo(0.5, 0.5);
        this.imageSplash.alpha = 0;

        this.startSplash();

        this.soundManager = new SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playIntro();

        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    public startSplash() {
        let tween = this.game.add.tween(this.imageSplash).to({alpha: 1}, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.waitSplash, this);
    }

    public waitSplash() {
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeSplash.bind(this));

        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.removeSplash, this);
    }

    public removeSplash() {
        if (this.imageSplash.alpha === 1) {
            let tween = this.game.add.tween(this.imageSplash).to({alpha: 0}, 1000, Phaser.Easing.power2, true);
            tween.onComplete.add(this.startIllus, this);
        }
    }

    public startIllus() {
        let tween = this.game.add.tween(this.imageIllustration).to( { alpha: 1 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.waitIllus, this);
    }

    public waitIllus() {
        this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeIllus.bind(this));

        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.removeIllus, this);
    }

    public removeIllus() {
        let tween = this.game.add.tween(this.imageIllustration).to( { alpha: 0 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.startText, this);
    }

    public startText() {
        let tween = this.game.add.tween(this.imageText).to( { alpha: 1 }, 1000, Phaser.Easing.power2, true);

        this.spaceKey.onDown.removeAll();
        this.spaceKey.onDown.add(this.startGame, this);
    }

    public startGame () {
        this.soundManager.stop();
        this.game.state.start('Play', true, false);
    }
}
