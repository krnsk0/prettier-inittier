import { access } from 'fs/promises';

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'unknown';

export async function detectPackageManager(): Promise<PackageManager> {
  const results = await Promise.all([
    access('pnpm-lock.yaml')
      .then(() => 'pnpm')
      .catch(() => null),
    access('yarn.lock')
      .then(() => 'yarn')
      .catch(() => null),
    access('package-lock.json')
      .then(() => 'npm')
      .catch(() => null),
  ]);

  for (const result of results) {
    if (result !== null) {
      return result as PackageManager;
    }
  }

  return 'unknown';
}
