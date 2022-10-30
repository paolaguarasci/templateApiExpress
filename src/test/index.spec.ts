process.env.NODE_ENV = 'test';

import 'mocha';


import app from '../app.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('GET /api/v1/', () => {
  it('It should GET welcome message', (done) => {
    chai
      .request(app)
      .get('/api/v1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        done();
      });
  });
});
