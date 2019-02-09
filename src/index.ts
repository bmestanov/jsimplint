#!/usr/bin/node
import * as fs from 'fs';
import { linter } from './jsimplint';

const fileName = process.argv[2];
if (!fileName) {
  throw new Error('Usage: <jsimplint> file.js');
}
const fileContent = fs.readFileSync(fileName, 'utf8');
const result = linter.analyze(fileContent);
console.log(JSON.stringify(result, null, 2));