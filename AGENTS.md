# Repository Guidelines

## Project Structure & Module Organization

This repository builds the RailsDoc Jekyll site. Hand-maintained site code lives in `src/_layouts`, `src/_sass`, and `src/assets`; site metadata and supported Rails versions are defined in `_config.yml`. The large `src/classes`, `src/files`, and versioned directories such as `src/8.0` are generated Rails API documentation. Avoid editing those files by hand. `rails/` is the Rails Git submodule used as the RDoc source, while `_site/` is ignored Jekyll output. Build orchestration lives in `Rakefile`, and CI/deployment workflows live in `.github/workflows`.

## Build, Test, and Development Commands

- `git submodule update --init`: initialize the Rails source after cloning.
- `bundle install`: install Jekyll and Rake dependencies.
- `bundle exec jekyll serve`: serve `src/` locally with rebuilds.
- `bundle exec jekyll build`: perform the fast site build used by deployment and basic CI checks.
- `rake build`: regenerate documentation for `_config.yml`'s `default_rails_version`, then build the site.
- `rake 'build_multi[7.1,7.2]'`: regenerate selected historical versions. Quote this command in shells that interpret brackets.

Documentation tasks fetch tags, switch branches, and run `git reset --hard` inside `rails/`. Do not keep uncommitted work in the submodule.

## Coding Style & Naming Conventions

Use two-space indentation for Ruby, JavaScript, YAML, HTML/Liquid, and new SCSS. Ruby files use single quotes where practical and begin with `# frozen_string_literal: true`. Follow the existing JavaScript style: `const`/`let`, double-quoted strings, semicolons, and descriptive camelCase function names. Use kebab-case for asset filenames and CSS classes. Keep version values quoted in `_config.yml`, and make generated-document changes through `Rakefile` tasks.

## Testing Guidelines

There is no separate unit-test framework or coverage threshold. Treat `bundle exec jekyll build` as the minimum validation and run `git diff --check` before submitting. For UI changes, use the local server to verify navigation expansion, search keyboard behavior, anchor links, and relevant responsive layouts. Changes to generation logic should also run `rake build` or the smallest applicable `build_multi` target.

## Commit & Pull Request Guidelines

Recent history favors concise, imperative subjects and Conventional Commit prefixes such as `feat:`, `fix:`, `docs:`, `style:`, `ci:`, and `build(deps):`. Keep each commit focused. Pull requests should explain the user-visible effect, list validation commands, link related issues, and include screenshots for layout or styling changes. For regenerated documentation, state the Rails version or tag and avoid unrelated generated diffs.
