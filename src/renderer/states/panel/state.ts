// A base class used for all states
// All methods will be called but can be left empty
import ComponentPanel from "components/panel"

export default abstract class state {
  constructor(public p: ComponentPanel) {}

  // is called outside, prepares variables
  enter(): void {}

  // is called outside, prepares variables
  exit(): void {}

  // is always called
  execute(): void {}

  // called when the counter reaches 0, often to change states 
  counter_end(): void {}
}
