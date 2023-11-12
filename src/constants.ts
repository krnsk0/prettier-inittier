import { resolve } from 'path';
import { homedir } from 'os';

export const defaultConfigPath = resolve(
  homedir(),
  '.prettier-inittier-default'
);

export const prettierConfigPath = resolve(process.cwd(), '.prettierrc');
