const assert = require("assert");

describe("the file to be tested", () => {
  context("the function to be tested", () => {
    before(() => {
      console.log("=====before");
    });

    after(() => {
      console.log("=====after");
    });

    beforeEach(() => {
      console.log("======beforeEach");
    });

    afterEach(() => {
      console.log("=======afterEach");
    });

    it("shoudl test something", () => {
      assert.equal(1, 1);
    });

    it("shoudl do something else", () => {
      assert.deepEqual({ name: "joe" }, { name: "joe" });
    });

    it("this is a pending test");
  });

  context("some other function", () => {
    it("should test something");
  });
});
