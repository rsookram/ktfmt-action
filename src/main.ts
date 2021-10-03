import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getKtfmt} from './installer'

async function run(): Promise<void> {
  try {
    const style: string = core.getInput('style')
    core.debug(`Checking code against ${style || 'facebook'} style ...`)

    const jar = await getKtfmt()

    // TODO: Apply provided style
    // TODO: Allow files / directions to be specified too
    await exec.exec('java', [
      '-jar',
      jar,
      '--set-exit-if-changed',
      '--kotlinlang-style',
      '.'
    ])
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
