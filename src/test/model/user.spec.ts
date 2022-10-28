import 'mocha';

import chai, { expect } from 'chai';

import { RoleType } from '../../model/RoleType.js';
import { User } from '../../model/User.js';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('MODEL USER', () => {
  before(async function () {
    this.user = new User('paola12345', '', '', RoleType.Admin);
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

  it('username should be between 8 and 16 alphanumeric characters long', async function () {
    expect(() => {
      new User('paola', '', '', RoleType.Admin);
    }).to.throw('Username invalid');

    expect(() => {
      new User('paola#$%^', '', '', RoleType.Admin);
    }).to.throw('Username invalid');

    expect(() => {
      new User('paola123', '', '', RoleType.Admin);
    }).to.not.throw();
  });
});
