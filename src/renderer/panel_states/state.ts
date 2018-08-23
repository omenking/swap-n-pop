// A base class used for all states
// All methods will be called but can be left empty
import ComponentPanel from "components/panel"

export default abstract class State {
  constructor(public p: ComponentPanel) {}

  // is called outside, prepares variables
  abstract enter(): void;

  // is called outside, prepares variables
  abstract exit(): void; 

  // is always called
  abstract execute(): void;

  // called when the counter reaches 0, often to change states 
  abstract counter_end(): void;
}
