/**
 * Common base class for all states.
 */
export default abstract class State {
  /**
   * Returns name of the state which can then be used to distinguish them from
   * each other
   */
  abstract get name(): string;

  init(data: any) {}
  create() {}
  update() {}
  render() {}
  shutdown() {}
}
