#! /usr/bin/env node
import kleur from 'kleur';
import { main } from './main';
import { EXITING } from './strings';

main()
  .then(() => {
    console.log(kleur.grey(EXITING));
    process.exit(1);
  })
  .catch((e: Error) => {
    if (e.message === 'SIGINT') {
      console.log(kleur.red(EXITING));
    }
    process.exit(1);
  });
