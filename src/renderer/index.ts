import { ipcRenderer as ipc } from 'electron';
import ui               from 'ui/main'
import game             from 'core/game'

import BootState from './states/boot';
import ConnectState from './states/connect';
import LoadState from './states/load';
import MenuState from './states/menu';
import ModePuzzleState from './states/mode_puzzle';
import ModeVsState from './states/mode_vs';
import PuzzleMenuState from './states/puzzle_menu';

const stateClasses = [
  BootState,
  LoadState,
  MenuState,
  ConnectState,
  ModeVsState,
  ModePuzzleState,
  PuzzleMenuState
];

ui()

// Create instance of each known state class and register them to the game
// instance.
stateClasses.forEach(stateClass => {
  const stateInstance = new stateClass();

  game.state.add(stateInstance.name, stateInstance);
});

game.state.start('boot')

ipc.on('play-vs', (event, {seed,online,cpu}) => {
  game.state.start('mode_vs',true,false, {
    seed:   seed,
    online: online,
    cpu:    cpu
  })
})

ipc.on('replay-load', (event, {seed,inputs}) => {
  game.state.start('mode_vs',true,false, {
    seed:   seed,
    online: false,
    inputs: inputs,
    cpu: [false,false]
  })
})

ipc.on('network-connect', (event, data) => {
  game.state.start('connect',true,false,data)
})
