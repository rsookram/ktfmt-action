import fs = require('fs')
import os = require('os')
import path = require('path')
import * as installer from '../src/installer'
import {expect, test} from '@jest/globals'

test('acquires ktfmt', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ktfmt-'))
  process.env['RUNNER_TEMP'] = dir

  const ktfmt = await installer.getKtfmt()
  expect(fs.existsSync(ktfmt)).toBe(true)
}, 100000)
