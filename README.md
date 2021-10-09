<a href="https://github.com/rsookram/ktfmt-action/actions"><img alt="ktfmt-action status" src="https://github.com/rsookram/ktfmt-action/workflows/build-test/badge.svg"></a>

# ktfmt-action

Github Action which ensures that Kotlin source code follows [ktfmt](https://github.com/facebookincubator/ktfmt) style.

## Usage

### Inputs

#### `style`

**(Optional)** The style the code should be formatted as (dropbox, google, or kotlinlang). Defaults to facebook style.

#### `path`

**(Optional)** The file or directory to apply ktfmt to. Defaults to all Kotlin files in the repository.

### Example

```yaml
name: ktfmt

on:
  pull_request:
    paths:
      - "**/*.kt"
      - ".github/workflows/ktfmt.yml"

 jobs:
   ktlint:
     runs-on: ubuntu-latest

     steps:
       - uses: actions/checkout@v2

       - uses: actions/setup-java@v2
         with:
           distribution: 'adopt'
           java-version: '11'

       - name: "ktfmt"
         uses: "rsookram/ktfmt-action@main"
         with:
           style: kotlinlang
```

## Development

You'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests
```bash
$ npm test
```

## License

[MIT](LICENSE)