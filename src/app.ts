/// <reference path="../lib/phaser.d.ts"/>

import Boot from "./game/state/Boot";
import Preload from "./game/state/Preload";
import Menu from "./game/state/Menu";
import Play from "./game/state/Play";
import Start from "./game/state/Start";

class SimpleGame extends Phaser.Game {

    constructor()
    {
        super(
            1024,
            576,
            Phaser.WEBGL, // Open GL for effect / shader ?
            'content',
            null
        );

        this.antialias = false;
        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Menu', Menu);
        this.state.add('Start', Start);
        this.state.add('Play', Play);
        this.state.start('Boot');
    }
}

window.onload = () => {
    new SimpleGame();
};
