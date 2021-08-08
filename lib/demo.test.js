const chai = require("chai");
const expect = chai.expect;
var demo = require("./demo");

describe("demo.js", () => {
  context("add function", () => {
    it("should add two numbers", () => {
      expect(demo.add(1, 2)).equal(3);
    });
  });

  context("addCallback function", () => {
    it("should test the callback", (done) => {
      demo.addCallback(1, 2, (err, res) => {
        expect(err).to.be.not.exist;
        expect(res).to.equal(3);
        done();
      });
    });
  });

  context("promise", () => {
    it("should test promise", (done) => {
      demo.addPromise(1, 2).then((result) => {
        expect(result).to.equal(3);
        done();
      });
    });
  });
});
