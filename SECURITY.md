# Security Policy

While Recap Time Squad does not re-uses the CLI and library code of [`dotenvx`](https://github.com/dotenvx/dotenvx),
mainly due to compatibility reasons in Deno, we still invoke the CLI via `execSync` function of
[`node:child_process`](https://docs.deno.com/api/node/child_process).

If you found other security related issues in this codebase, please send a plain-text email to
`~recaptime-dev/security@lists.sr.ht` with full writeup about the issue, alongside a git patch
if you able to contribute.
