import Stack from 'core/stack'

//const Phaser = require("../../../../node_modules/phaser-ce/build/phaser");
const seed = "0";
//const rnd = new Phaser.RandomDataGenerator([seed]);

describe("Stack Class", () => {
  beforeAll(function() {
    let stack = new Stack()
    let stack2 = new Stack()
  }
  describe("create, returns a new Stack filled with Numbers or nulls forEach Panel's kind to get set to", () => {
    stack.create({range: 3, ground: 0, wells: "few", chips: "many"});
    stack2.create({range: 3, ground: 0, wells: "few", chips: "many"});

    it("seed should always return the same result", () => {
      seed().should.equal(0.7002071491250771);
    })

    it("Stacks panel variable should be an Array after create!", () => {
      stack.panels.should.be.an("array");
    });

    it("2 different Stacks with same seed are the same", () => {
      stack.panels.should.equal(Stack2.panels);
    })
  });

  describe("setArrayToSize, the lower the size -> the higher a chance for a num out of the size to be true: 1/10 has a higher chance than 1/20", () => {
    beforeAll(function() {
      let stack = new Stack()
    }
    const lowest = 10;
    const average = 20;
    const highest = 30;

    it("array size should be none -> only 1 element large, other sizes dont matter", () => {
      let arr = stack.setArrayToSize({noun: "none", lowest: lowest, average: average, highest: highest});
      arr.length.should.equal(1);
    });

    it("array size should be small -> chance is many to get a 1 out of -> array length should equal to lowest size", () => {
      let arr = stack.setArrayToSize({noun: "many", lowest: lowest, average: average, highest: highest});
      arr.length.should.equal(lowest);
    });

    it("array size should be average -> chance is average -> array length should equal to average size", () => {
      let arr = stack.setArrayToSize({noun: "average", lowest: lowest, average: average, highest: highest});
      arr.length.should.equal(average);
    });

    it("array size should be large -> chance is low to get a 1 out of since the many elements -> array length should equal biggest size", () => {
      let arr = stack.setArrayToSize({noun: "few", lowest: lowest, average: average, highest: highest});
      arr.length.should.equal(highest);
    });
  });
});
