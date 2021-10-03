import fs = require('fs')
import * as installer from '../src/installer'
import {expect, test} from '@jest/globals'

test('acquires ktfmt', async () => {
  const path = await installer.getKtfmt()
  expect(fs.existsSync(path)).toBe(true)
}, 100000)
