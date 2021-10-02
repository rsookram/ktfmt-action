import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

/**
 * @returns the path to the downloaded jar
 */
export async function getKtfmt(): Promise<string> {
  const version = '0.28'
  const url = `https://search.maven.org/remotecontent?filepath=com/facebook/ktfmt/${version}/ktfmt-${version}-jar-with-dependencies.jar`

  core.info(`Downloading $url`)
  // TODO: Try caching the file
  const path = tc.downloadTool(url)
  core.debug(`Downloaded to $path`)

  return path
}
