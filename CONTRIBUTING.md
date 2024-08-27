# How to contribute?

The contributing docs and guidelines are currently in a working draft state. Come back soon for more updates!

## Coding style

We're still ironing out our coding style, but here's a quick summary:

* 2 spaces per indentation level, no tabs
* always go to next line if it's longer than 90-120 characters
* dependencies must be import-mapped in `deno.json` (and force Deno to
update the lockfile via `deno task cache <any-additional-deps-here>`)

## Sending patches

For GitHub users, it is recommended to use the existing merge request flows in GitHub and
GitLab (via `mau.dev` instance).

```bash
# This is how do you submit patches via Git(Hub/Lab) flow using the
# official CLIs.

gh pr create -R recaptime-dev/dotenv-tools --base main

glab mr create -R https://mau.dev/recaptime-dev/dotenv-tools --base main
```

Alternatively, you can send us a email patch at TBD.
