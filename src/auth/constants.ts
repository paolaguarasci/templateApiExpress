import configuration from '../config/configuration';

export const jwtConstants = {
  secret: configuration().jwt.secret,
};
