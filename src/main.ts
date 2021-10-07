import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getKtfmt} from './installer'

async function run(): Promise<void> {
  try {
    const style = core.getInput('style')
    const path = core.getInput('path')
    core.debug(`Checking code against ${style || 'facebook'} style ...`)

    const args = ['-jar', await getKtfmt(), '--set-exit-if-changed']

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

    args.push(path)

    await exec.exec('java', args)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
