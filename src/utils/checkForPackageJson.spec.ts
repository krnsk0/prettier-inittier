import { checkForPackageJson } from './checkForPackageJson';
import { vi, describe, it, expect, Mock } from 'vitest';
import { access as fsAccess } from 'fs/promises';

vi.mock('fs/promises');

describe('checkForPackageJson function', () => {
  it('should return true if package.json exists in the cwd', async () => {
    (fsAccess as Mock).mockResolvedValueOnce(undefined);

    const hasPackageJson = await checkForPackageJson();
    expect(hasPackageJson).toBe(true);
  });

  it('should return false if package.json does not exist in the cwd', async () => {
    const errorMock = { code: 'ENOENT' };
    (fsAccess as Mock).mockRejectedValueOnce(errorMock);

    const hasPackageJson = await checkForPackageJson();
    expect(hasPackageJson).toBe(false);
  });

  it('should throw an error if an unexpected error occurs', async () => {
    const errorMock = { code: 'UNEXPECTED_ERROR' };
    (fsAccess as Mock).mockRejectedValueOnce(errorMock);

    await expect(checkForPackageJson()).rejects.toThrow();
  });
});
