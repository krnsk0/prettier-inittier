import { exec } from 'shelljs';

type PackageManager = 'yarn' | 'npm' | 'pnpm';

export function installPrettier(packageManager: PackageManager): Promise<void> {
  return new Promise((resolve, reject) => {
    let installCommand: string;

    switch (packageManager) {
      case 'yarn':
        installCommand = 'yarn add --dev prettier';
        break;
      case 'npm':
        installCommand = 'npm install --save-dev prettier';
        break;
      case 'pnpm':
        installCommand = 'pnpm add --save-dev prettier';
        break;
    }
    console.log(installCommand);

    // note the blocking exec call
    const result = exec(installCommand, { silent: false });

    if (result.code !== 0) {
      reject(new Error(`Failed to install Prettier. Error: ${result.stderr}`));
      return;
    }

    resolve();
  });
}
