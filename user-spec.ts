import test, { beforeEach } from 'ava'
// "compute" imports "add" from "./math" using named import
import { compute } from './user'
import { ImportMock } from 'ts-mock-imports'
// to mock "./math add" export need to import entire module
import * as math from './math'

beforeEach(ImportMock.restore)

test('real add', t => {
  // no stubbing
  t.deepEqual(compute(2, 3), 5)
})

test('stubbed add', t => {
  // somehow stub "add" from "./math.ts" to return known value like 100
  ImportMock.mockFunction(math, 'add', 100)
  t.deepEqual(compute(2, 3), 100)
})

test('add stays stubbed', t => {
  t.deepEqual(compute(-1, 7), 6)
})

test('stub and restore', t => {
  const stub = ImportMock.mockFunction(math, 'add', 100)
  t.deepEqual(compute(2, 3), 100)
  stub.returns(42)
  t.deepEqual(compute(2, 3), 42)
  stub.restore()
  t.deepEqual(compute(2, 3), 5)
})
