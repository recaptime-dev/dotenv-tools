# `dotenvx-secretstore` for <your-name>

This template README is made with love by @ajhalili2006 to help you
setup your `gopass`-styled repository to manage repositories.

## Onboarding

Done in onboarding? Edit this README and write your own.

* [ ] Run `npm install`
* [ ] Add your first secret with `dotenv-tools dotenvx set`
* [ ] Setup pre-commit hooks: `dotenv-tools ext precommit`
* [ ] Commit and push (don't forget to add your repo as a git remote first!)

## Install and usage

For regular usage, you only need [`dotenvx` CLI][dotenvx] on your projects and in CI,
but you need `dotenv-tools` CLI manage this repo.

[dotenvx]: https://dotenvx.com/docs/install

```bash
# Note that `dotenvx` CLI is bundled as an alias to "dotenv-tools dotenvx",
# but currently implemented as a seperate program via bin object trick on package.json
npm i @andreijiroh-dev/dotenv-tools -g
```

While `dotenv-tools` is directed towards centralized secret management and git-backed
auditing, you technically use the CLI for personal use but unlike `gopass` you need
to `cd` to your local copy of your personal secret store repo.
