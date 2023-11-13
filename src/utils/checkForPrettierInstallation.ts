import { readFile } from 'fs/promises';
import { resolve } from 'path';

export async function checkForPrettierInstallation(): Promise<boolean> {
  const packageJsonPath = resolve(process.cwd(), 'package.json');

  const packageJsonContent = await readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  if (
    (packageJson.dependencies && packageJson.dependencies.prettier) ||
    (packageJson.devDependencies && packageJson.devDependencies.prettier)
  ) {
    return true;
  }

  return false;
}
