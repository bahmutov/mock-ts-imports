// "compute" imports "add" from "./math" using named import
import test from 'ava'
import { compute } from './user'
import { ImportMock } from 'ts-mock-imports'
// to mock "./math add" export need to import entire module
import * as math from './math'

test('real add', t => {
  // no stubbing
  t.deepEqual(compute(2, 3), 5)
})

test('stubbed add', t => {
  // somehow stub "add" from "./math.ts" to return known value like 100
  ImportMock.mockFunction(math, 'add', 100)
  t.deepEqual(compute(2, 3), 100)
})
