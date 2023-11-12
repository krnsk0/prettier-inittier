import { defaultConfigPath } from '../constants';
import { copyFile } from 'fs/promises';

export async function createLocalConfig(): Promise<void> {
  const destinationPath: string = '.prettierrc';
  await copyFile(defaultConfigPath, destinationPath);
}
