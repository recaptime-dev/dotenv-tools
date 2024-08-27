# `dotenv-tools`

[![Built during Arcade 2024](https://badges.api.lorebooks.wiki/badges/hackclub/arcade?style=flat-square)](https://hackclub.com/arcade)

A Deno-based CLI to manage your dotenvx-encrypted secrets a la `gopass`.

> [!warning]
> This tool is experimental, as we're currently rewriting it to Typescript in
> Deno. Since `v0.2.0` and later, we'll no longer embed `dotenvx` CLI as a
> library due to compatibility issues with encryption and decryption when
> used under Deno. In the meanwhile, `dotenv-tools` will prompt you to
> [install dotenvx](https://dotenvx.com/docs/install) if it is not in
> your PATH.

## Backstory

[@ajhalili2006](https://andreijiroh.xyz) intends to switch to `dotenvx` from Doppler with a chance of
git history auditibility and Zero-Knowledge encryption[^1]. The only problem is that managing secrets
across Git repositories (not just in GitHub) is a pain, even with a lot of hacks
around [building a gopass-like centralized store](https://github.com/andreijiroh-dev/dotenvx-secretstore). So he decided to build this CLI tool,
first as a Node.js CLI program as part of the monorepo, but recently it is in the process of migrating into
its own home here at Recap Time Squad.

[^1]: <https://github.com/dotenvx/dotenvx/issues/259#issuecomment-2201559147>

## Features

Have ideas for new features? [Chime in our issue tracker].

* [ ] Access to `dotenvx` features via `dotenv-tools dotenvx` command
  * [x] Basic `set` and `get` secrets
  * [ ] dotenv encryption and decryption
* [ ] Pull secrets from your centralized repo into your projects
* [ ] Centralized project management

[Chime in our issue tracker]: https://mau.dev/recaptime-dev/dotenv-tools/issues/new

## Prerequisites

* `dotenvx` CLI is installed for `dotenv-tools dotenvx` commands.
* Git, obviously. (although it can download `.env` files from your repo over its raw URLs
using `fetch` behind the scenes)

## Usage

With Deno:

```bash
# via JSR
deno install -A jsr:@recaptime-dev/dotenv-tools

# straight from source
deno install -A --name dotenv-tools https://mau.dev/recaptime-dev/dotenv-tools/raw/main/mod.ts
```

With Node.js:

```bash
# to be ported soon
```

## License

BSD-3-Clause AND MPL-2.0
