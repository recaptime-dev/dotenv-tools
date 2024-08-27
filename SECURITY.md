# Security Policy

While Recap Time Squad does not re-uses the CLI and library code of [`dotenvx`](https://github.com/dotenvx/dotenvx),
mainly due to compatibility reasons in Deno, we still invoke the CLI via `execSync` function of
[`node:child_process`](https://docs.deno.com/api/node/child_process).

If you found other security related issues in this codebase, please send a plain-text email to
`~recaptime-dev/security@lists.sr.ht` (or [via GitHub] or [GitLab with confidential issue checked])
with full writeup about the issue, alongside a private patch (either through our security mailing list
or in GitHub or GitLab) if you able to contribute your own fix.

[via GitHub]: https://github.com/recaptime-dev/dotenv-tools/security/advisories/new
[GitLab with confidential issue checked]:

## In scope

* Everything in this repository

## Out of scope

* Usage of `dotenvx` as CLI
  * Contact [@motdotla](https://github.com/motdotla) via email. If you email us, your email will be forwarded to him and CC us for reference.
