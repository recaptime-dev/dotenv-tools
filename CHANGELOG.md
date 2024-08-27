# Changelog

## Unreleased - `jsr:@recaptime-dev/dotenv-tools@v0.1.0`

**BREAKING CHANGE**: We moved the entire codebase under Recap Time Squad's
GitHub namespace and we're also doing TypeScript rewrites in Deno at the
moment.

* Rewrite the whole codebase in TypeScript from scratch but in Deno.
* Remove `dotenvx` CLI as direct JS library integration, per <https://github.com/dotenvx/dotenvx/issues/353>
and to make things light in terms of dependency use.

## `npm:@andreijiroh-dev/dotenv-tools@v0.1.0`

Initial release of the CLI with `@dotenvx/dotenvx` at `v1.6.2` at time of
release, although development used `v1.5.0` at first.

Nothing too serious other than hooking things up a bit.

* Initial `dotenvx` CLI support through the `dotenv-tools dotenvx` command.
  * We have some issues while trying to use `commands/dotenvx.js` directly via `dotenvx`. A workaround will be implemented soon.
* Add `init|setup` command, alongside some [template files used in init process](./template/)
