---
name: upgrade-rails
description: Use when upgrading the Rails version this site documents — bumping default_rails_version in _config.yml, pointing the rails submodule at a new tag, or regenerating src/ docs after a new Rails patch or security release.
---

# Upgrading the default Rails version

Reference execution: PR [#225](https://github.com/railsdoc/railsdoc.github.io/pull/225)
("Update Rails from v8.1.0 to v8.1.3"). This skill only covers **patch-level bumps**
within the current minor series (e.g. `8.1.3` → `8.1.3.1`). A minor/major bump (e.g.
`8.1` → `8.2`) needs a different, larger set of edits — see the stop condition in step 1.

## 1. Resolve the target version and gate scope

- Version passed as an argument → use it verbatim.
- No argument → look up the latest release:
  ```sh
  curl -s https://rubygems.org/api/v1/versions/rails/latest.json
  ```
  Confirm the result with the user before proceeding.

Read the current version from `_config.yml:5` (`default_rails_version`).

**Stop conditions — check both before doing any other work:**

- Target equals current version → nothing to do, stop.
- Target's `major.minor` differs from current's (e.g. current is `8.1.x`, target is
  `8.2.0`) → **stop**, this is out of scope for this skill. `rubygems.org`'s
  `latest.json` returns the highest version overall, not the highest patch in the current
  series, so this will eventually happen. A minor bump additionally needs: a new
  `rails_versions` entry in `_config.yml`, moving `latest: true` off the old series, a new
  `defaults:` scope + `src/<old-minor>/` directory for the demoted series (via
  `rake 'build_multi[<old-minor>]'`), and a new row in `.github/workflows/ci.yml`'s
  `doc-build-others` matrix. Explain this to the user rather than attempting it.

## 2. Optionally confirm the tag exists

`rake build` depends on the `switch_default_rails` task, which runs `switch_rails`
(`git fetch` + `git switch refs/tags/v<version>`) as a prerequisite *before* the build
task's own actions. So a missing tag already fails fast — Rake aborts at the switch step,
before the expensive `bundle install` + `rake rdoc` regeneration in `generate_rails_rdoc`
ever runs. No separate gate is required. If you want to confirm the tag ahead of time
anyway (e.g. to fail with a clearer message), check manually:

```sh
git -C rails fetch --tags
git -C rails rev-parse "refs/tags/v<version>"   # must print a sha, not error
```

## 3. Branch and edit `_config.yml`

```sh
git switch -c rails-<version>
```

Exactly two lines change on a patch bump — edit them directly, don't sed the whole file:

- `default_rails_version: "<version>"`
- under `rails_versions:` → the current minor key (e.g. `"8.1":`) → `specific_version: "<version>"`

Keep both values **quoted** — an unquoted `8.1` parses as a YAML float. Leave everything
else alone: `latest: true` stays on the current series, and the `defaults:` block keys on
the minor series so it doesn't need touching for a patch bump.

Commit (unprefixed, matching #225 exactly):

```
Update Rails from v<old> to v<new>
```

## 4. Regenerate the docs

```sh
rake build
```

This switches the `rails` submodule to the new tag, swaps in the `toshimaru/sdoc` fork,
regenerates rdoc, copies output into `src/`, and finishes with `bundle exec jekyll build`
— so the Jekyll build is already validated once this completes. Use the Ruby version this
repo targets (currently 3.4, see `ruby-version` in `.github/workflows/ci.yml`). This is
the long step.

## 5. Commit the submodule pointer — mind the dirty worktree

`rake build` rewrites `rails/Gemfile` (to point `sdoc` at the fork) and runs
`bundle install` *inside* the submodule. After the build, `git status` in the superproject
will show `rails` as having **both new commits and modified content**. That looks like it
violates "don't keep uncommitted work in the submodule" from `AGENTS.md`, but it's
expected and harmless — the next `switch_rails` run `git reset --hard`s it away.

**Do not commit, stash, or clean anything inside `rails/`.** Stage only the pointer at the
superproject level and verify it's a clean pointer move:

```sh
git add rails
git diff --cached rails
```

The diff must show only `-Subproject commit ... / +Subproject commit ...` — nothing else.

Commit:

```
Use rails v<version>
```

## 6. Commit the regenerated docs

```sh
git diff --check
git add src
```

Commit (this one *is* conventional-prefixed, matching #225):

```
docs: Generate docs for Rails v<version>
```

## 7. Push and open the PR

Confirm with the user before pushing. PR body, matching #225's style:

```
Generate Rails v<version> docs.
```

## Verify before/after opening the PR

- `git diff --check` is clean (already run in step 6).
- Version string landed in generated output — every generated page carries it near the
  top:
  ```sh
  grep -c 'Ruby on Rails <version>' src/index.html
  ```
- Diff shape matches the reference PR: `_config.yml` (2 lines), `rails` (pointer only,
  per step 5), `src/**` (generated). No `src/<minor>/` directory should appear for a
  patch bump.

## Quick reference

| Step | Commit message | Prefixed? |
|---|---|---|
| `_config.yml` edit | `Update Rails from v<old> to v<new>` | no |
| submodule pointer | `Use rails v<version>` | no |
| regenerated `src/` | `docs: Generate docs for Rails v<version>` | yes |

## Common mistakes

- Normalizing all three commit messages to `feat:`/`chore:` prefixes — only the third
  one is prefixed in the reference PR.
- Trying to clean up the `rails/` submodule's dirty worktree after `rake build` — leave it;
  see step 5.
- Assuming a bad tag wastes the full `rake build` run — it doesn't; `switch_default_rails`
  fails fast before the expensive regeneration starts (see step 2).
- Treating a minor-series bump (`8.1` → `8.2`) the same as a patch bump — see step 1.
