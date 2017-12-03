
import {SoundManager} from "../../sound/SoundManager";
export default class Start extends Phaser.State {
    private soundManager: SoundManager;
    private imageSplash: Phaser.Image;
    private image: Phaser.Image;

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';

        this.image = this.game.add.image(0, 0, 'start');
        this.image.scale.setTo(0.7, 0.7);
        this.image.alpha = 0;

        this.imageSplash = this.game.add.image(0,0, 'splash');
        this.imageSplash.scale.setTo(0.5, 0.5);
        this.imageSplash.alpha = 0;

        let tween = this.game.add.tween(this.imageSplash).to( { alpha: 1 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.wait3seconds, this);

        this.soundManager = new SoundManager(this.game);
        this.soundManager.init();
        this.soundManager.playIntro();
    }

    public startGame ()
    {
        this.soundManager.stop();
        this.game.state.start('Play', true, false);
    }

    private wait3seconds()
    {
        let tween = this.game.add.tween(this.imageSplash).to( { alpha: 1 }, 3000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.switchImages, this);
    }

    private switchImages()
    {
        let tween = this.game.add.tween(this.imageSplash).to( { alpha: 0 }, 1000, Phaser.Easing.power2, true);
        tween.onComplete.add(this.IDontCareMakingShittyCodeItsAJam, this);
    }

    private IDontCareMakingShittyCodeItsAJam()
    {
        this.game.add.tween(this.image).to( { alpha: 1 }, 1000, Phaser.Easing.power2, true);
        let spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.startGame, this);
    }
}
