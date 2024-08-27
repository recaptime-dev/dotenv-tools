# `dotenvx-secretstore` for org-namespace-here

This template README is made with love by @ajhalili2006 to help you
setup your `gopass`-styled repository to manage repositories.

## Onboarding

Done in onboarding? Edit this README and write your own.

* [ ] Run `npm install`
* [ ] Add your first secret with `dotenvx set`
* [ ] Setup pre-commit hooks: `dotenvx ext precommit`
* [ ] Commit and push (don't forget to add your repo as a git remote first!)
* [ ] Pull from this repo into your own projects via `dotenv-tools secrets pull`.

## Install and usage

For regular usage, you only need [`dotenvx` CLI][dotenvx] on your projects and in CI,
but you need `dotenv-tools` CLI manage this repo.

[dotenvx]: https://dotenvx.com/docs/install

```bash
# Note that `dotenvx` CLI is bundled as an alias to "dotenv-tools dotenvx",
# but currently implemented as a seperate program via bin object trick on package.json
deno install -A jsr:@recaptime-dev/dotenv-tools
```

While `dotenv-tools` is directed towards centralized secret management and git-backed
auditing, you technically can use the CLI for personal use but unlike `gopass` you need
to `cd` to your local copy of your personal secret store repo.
