import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {getKtfmt} from './installer'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

    const jar = await getKtfmt()

    // TODO: Accept style as an argument to the action
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
