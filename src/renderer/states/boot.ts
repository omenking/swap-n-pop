import State from './base';

import game from 'core/game';

declare var window: {
  innerWidth: number;
  innerHeight: number;
};

export default class BootState extends State {
  get name(): string {
    return 'boot';
  }

  create() {
    game.stage.backgroundColor = '#282828';
    this.pixelate();
    game.state.start('load');
  }

  pixelate() {
    game.stage.disableVisibilityChange = true;

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.scale.setResizeCallback(this.resize);

    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(game.canvas);
  }

  resize() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
  }
}
