process.env.NODE_ENV = 'test';
const server = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.expect();
chai.use(chaiHttp);

describe('GET /api/v1/', () => {
  it('It should GET welcome message', (done) => {
    chai
      .request(server)
      .get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        done();
      });
  });
});
