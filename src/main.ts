import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getKtfmt} from './installer'

async function run(): Promise<void> {
  try {
    const style: string = core.getInput('style')
    core.debug(`Checking code against ${style || 'facebook'} style ...`)

    const args = [
      '-jar',
      await getKtfmt()
      // This option will be supported in the next release of ktfmt (the version after 0.28).
      // https://github.com/facebookincubator/ktfmt/commit/b44c58b410d2a871bf71ec950f76d194c01cfbb3
      // '--set-exit-if-changed',
    ]

    switch (style) {
      case 'dropbox':
        args.push('--dropbox-style')
        break
      case 'google':
        args.push('--google-style')
        break
      case 'kotlinlang':
        args.push('--kotlinlang-style')
        break
      case '':
        // Use ktfmt's default style (facebook)
        break
      default:
        throw new Error(
          `invalid style '${style}' provided, expected one of [dropbox, google, kotlinlang]`
        )
    }

    args.push('.')

    // TODO: Allow files / directions to be specified too
    await exec.exec('java', args)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
