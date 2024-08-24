# `dotenv-tools`

A Deno-based CLI to manage your dotenvx-encrypted secrets a la `gopass`.

> [!warning]
> This tool is experimental, as we're currently rewriting it to Typescript in
> Deno. Since `v0.2.0` and later, we'll no longer embed `dotenvx` CLI as a
> library due to compatibility issues with encryption and decryption when
> used under Deno. In the meanwhile, `dotenv-tools` will prompt you to
> [install dotenvx](https://dotenvx.com/docs/install) if it is not in
> your PATH.

## Install

With Deno:

```bash
# via JSR
deno install jsr:@recaptime-dev/dotenv-tools

# straight from source
deno install https://mau.dev/recaptime-dev/dotenv-tools/raw/main/mod.ts
```

With Node.js:

```bash
# to be ported soon
```