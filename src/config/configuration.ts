import * as yaml from 'js-yaml';

import { join } from 'path';
import { readFileSync } from 'fs';

const YAML_CONFIG_FILENAME = '../config.yaml';

export default () => {
  const config = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
  console.log('config ', config);
  return config;
};
