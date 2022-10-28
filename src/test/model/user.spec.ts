import 'mocha';

import { RoleType } from '../../model/RoleType.js';
import { User } from '../../model/User.js';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('MODEL USER', () => {
  before(async function () {
    let user: User = {
      username: 'asas',
      token: '',
      role: RoleType.Admin,
      hash: ''
    };

    this.user = user;
  });

  it('username props exists as a string', async function () {
    this.user.should.haveOwnProperty('username').to.be.a('string');
  });

  it('token props exists as a string', async function () {
    this.user.should.haveOwnProperty('token').to.be.a('string');
  });

  it('hash props exists as a string', async function () {
    this.user.should.haveOwnProperty('hash').to.be.a('string');
  });

  it('role props exists as a RoleType', async function () {
    this.user.should.haveOwnProperty('role').to.be.a(typeof RoleType.Admin);
  });
});
