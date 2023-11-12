import { writeFile } from 'fs/promises';
import { defaultConfigPath } from '../constants';

export async function writeDefaultConfig() {
  const defaultConfig = {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: true,
    singleQuote: true,
  };

  const prettierConfigString = JSON.stringify(defaultConfig, null, 2);

  await writeFile(defaultConfigPath, prettierConfigString);
}
