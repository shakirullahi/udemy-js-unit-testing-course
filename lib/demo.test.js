const chai = require("chai");
const expect = chai.expect;
var demo = require("./demo");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var sinon = require("sinon");
chai.use(sinon);

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
    // it("should test promise", (done) => {
    //   demo
    //     .addPromise(1, 2)
    //     .then((result) => {
    //       expect(result).to.equal(3);
    //       done();
    //     })
    //     .catch((ex) => {
    //       console.log("got an erorr");
    //       //   expect(ex).to.equal("fake");
    //       done(ex);
    //     });
    // });

    it("should test promise with return", () => {
      return demo.addPromise(1, 2).then((result) => {
        expect(result).to.equal(3);
      });
    });

    it("should test promise with async await", async () => {
      const result = await demo.addPromise(1, 2);
      expect(result).to.equal(3);
    });

    it("should test promise with chai as promised", async () => {
      await expect(demo.addPromise(1, 2)).to.eventually.equal(3);
    });
  });
});
