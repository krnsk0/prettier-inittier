import { resolve } from 'path';
import { homedir } from 'os';

export const defaultConfigPath = resolve(
  homedir(),
  '.prettier-inittier-default'
);
