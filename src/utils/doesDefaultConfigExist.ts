import { defaultConfigPath } from '../constants';
import { existsSync } from 'fs';

export const doesDefaultConfigExist = () => existsSync(defaultConfigPath);
