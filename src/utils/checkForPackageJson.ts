import { access, constants } from 'fs/promises';
import { resolve } from 'path';

type FileAccessError = {
  code: string;
};

export async function checkForPackageJson(): Promise<boolean> {
  const packageJsonPath = resolve(process.cwd(), 'package.json');

  try {
    await access(packageJsonPath, constants.F_OK);
    return true;
  } catch (error: unknown) {
    if (isFileAccessError(error) && error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

function isFileAccessError(error: unknown): error is FileAccessError {
  return (error as FileAccessError).code !== undefined;
}
