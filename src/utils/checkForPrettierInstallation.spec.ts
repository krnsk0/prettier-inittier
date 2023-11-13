import { checkForPrettierInstallation } from './checkForPrettierInstallation';
import { vi, describe, it, expect, Mock } from 'vitest';
import { resolve } from 'path';
import { readFile as fsReadFile } from 'fs/promises';

vi.mock('fs/promises');
vi.mock('path');

const mockReadFile = (
  path: string,
  content: string,
  encoding: string = 'utf-8'
) => {
  const mockPath = resolve(process.cwd(), path);
  (fsReadFile as Mock).mockImplementation((p: string, enc: string) => {
    if (p === mockPath && enc === encoding) {
      return content;
    }
    throw new Error(`Unexpected fs/promises.readFile call: ${p}, ${enc}`);
  });
};

describe('checkForPrettierInstallation function', () => {
  it('should return true if prettier is a dependency in package.json in the cwd', async () => {
    const mockPackageJsonContent = JSON.stringify({
      dependencies: {
        prettier: 'x.x.x',
      },
    });

    mockReadFile('package.json', mockPackageJsonContent);

    const result = await checkForPrettierInstallation();
    expect(result).toBe(true);
  });

  it('should return true if prettier is a devDependency in package.json in the cwd', async () => {
    const mockPackageJsonContent = JSON.stringify({
      devDependencies: {
        prettier: 'x.x.x',
      },
    });

    mockReadFile('package.json', mockPackageJsonContent);

    const result = await checkForPrettierInstallation();
    expect(result).toBe(true);
  });

  it('should return false if prettier is not a dependency or devDependency in package.json  in the cwd', async () => {
    const mockPackageJsonContent = JSON.stringify({
      dependencies: {
        someOtherDependency: 'x.x.x',
      },
      devDependencies: {
        anotherDependency: 'x.x.x',
      },
    });

    mockReadFile('package.json', mockPackageJsonContent);

    const result = await checkForPrettierInstallation();
    expect(result).toBe(false);
  });
});
