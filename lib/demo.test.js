const chai = require("chai");
const expect = chai.expect;
const rewire = require("rewire");
var demo = rewire("./demo");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);

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

  context("test doubles", () => {
    it("should spy on logs", () => {
      let spy = sinon.spy(console, "log");
      demo.foo();
      expect(spy.calledOnce).to.be.true;
      expect(spy).to.have.been.calledOnce;
      spy.restore();
    });

    it("should stub console.warn", () => {
      let stub = sinon.stub(console, "warn").callsFake(() => {
        console.log("message from stub");
      });
      demo.foo();
      expect(stub).to.have.been.calledOnce;
      expect(stub).to.have.been.calledWith("console.warn was called");
      stub.restore();
    });
  });

  context("rewire - stub privete function", () => {
    it("should stub createFile", async () => {
      let createStub = sinon.stub(demo, "createFile").resolves("create_stub");
      let callDBStub = sinon.stub().resolves("calldb_stub");

      demo.__set__("callDB", callDBStub);
      let res = await demo.bar("fake.txt");
      expect(res).to.be.equal("calldb_stub");
      expect(createStub).to.have.been.calledOnce;
      expect(createStub).to.have.been.calledWith("fake.txt");
      expect(callDBStub).to.have.been.calledOnce;
    });
  });
});
