import test from 'ava'
import {add} from './math'

test('add', t => {
  // testing the original function
  t.deepEqual(add(2, 3), 5)
})
