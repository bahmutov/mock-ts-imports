# mock-ts-imports
> Mocking named imports in unit tests

Uses [ts-mock-imports](https://github.com/EmandM/ts-mock-imports) to mock named exports / imports in TypeScript unit tests executed using [Ava](https://github.com/avajs/ava).

See [user-spec.ts](user-spec.ts) that mocks `add` from [math.ts](math.ts). This function is imported into [user.ts](user.ts) and used during `calculate` call.

```ts
import test from 'ava'
// "compute" imports "add" from "./math" using named import
import { compute } from './user'
import { ImportMock } from 'ts-mock-imports'
// to mock "./math add" export need to import entire module
import * as math from './math'

test('stub and restore', t => {
  const stub = ImportMock.mockFunction(math, 'add', 100)
  t.deepEqual(compute(2, 3), 100)
  stub.returns(42)
  t.deepEqual(compute(2, 3), 42)
  stub.restore()
  t.deepEqual(compute(2, 3), 5)
})
```

Read [Mocking named TypeScript imports during tests](https://glebbahmutov.com/blog/mocking-named-typescript-imports/) blog post.
