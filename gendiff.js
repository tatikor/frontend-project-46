#!/usr/bin/env node
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  if (process.argv.includes('-h') || process.argv.includes('--help')) {
    program.outputHelp();
  }
program.parse();
