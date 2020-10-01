import chai from "chai";
import chaiHttp from "chai-http";
import blogpost from "../server/routes/blog.js";
chai.should();
chai.use(chaiHttp);
describe("blog post", () => {
  // get all post
  describe("GET /blog", () => {
    it("it should return all blog post", (done) => {
      chai
        .request(blogpost)
        .get("/blog.js")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
    it("it should'nt return all blog post", (done) => {
      chai
        .request(blogpost)
        .get("/blog")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});