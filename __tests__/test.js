import generateDiffTree from '../generateDiff.js';
import { readFileSync } from 'fs';

const correctResult = readFileSync('__fixtures__/correct_result');

test('generateDiff', () => {
    const obj1 = '../file1.json';
    const obj2 = '../file2.json';
    expect(generateDiffTree(obj1, obj2)).toBe(correctResult);
});