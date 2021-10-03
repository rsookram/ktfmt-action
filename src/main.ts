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
      // This option will be supported in the next release of ktfmt (the version after 0.28).
      // https://github.com/facebookincubator/ktfmt/commit/b44c58b410d2a871bf71ec950f76d194c01cfbb3
      // '--set-exit-if-changed',
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
