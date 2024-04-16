#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';


program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .option('-v, --version', 'output the version number')
  .option('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format')
  .arguments('<file1>')
  .arguments('<file2>')
  .action((file1, file2) => {

    const getAbsolutePath = (file) => path.resolve(file);

    const genDiff = (file1, file2) => {
      const file1Parsed = JSON.parse(fs.readFileSync(getAbsolutePath(file1)));
      const file2Parsed = JSON.parse(fs.readFileSync(getAbsolutePath(file2)));

      return { file1Parsed, file2Parsed };

    }
  console.log(genDiff(file1, file2));

  });

  program.parse(process.argv);

  if (process.argv.includes('-h') || process.argv.includes('--help')) {
    program.outputHelp();
program.parse();}
