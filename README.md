# [railsdoc.github.io](https://railsdoc.github.io/)

[![CI](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c964029a-6d5a-4f3a-95e9-d35830a2fe83/deploy-status)](https://app.netlify.com/sites/railsdoc-preview/deploys)

[railsdoc.github.io](https://railsdoc.github.io/) is yet another Rails API documentation website.

## Project Goal

The project goal is **making [api.rubyonrails.org](https://api.rubyonrails.org/) SEO-friendly**.

### Additional Goals

There are some enhancements in addition to SEO.

- [x] Built by [Jekyll](https://github.com/jekyll/jekyll)
- [x] Styled by [bootstrap(v4)](https://github.com/twbs/bootstrap)
- [x] No iframe layout
- [x] Table of Contents
- [x] Google Custom Search
- [x] Multiple version documentation
- [ ] Mobile-friendly design
- [ ] Comment System
- [ ] etc. (see. https://github.com/railsdoc/railsdoc.github.io/issues)

## Setup

```console
$ bundle install
```

## Build docs

For the latest Rails version:

```console
$ rake build
```

This command generates Rails docs with `default_rails_version` defined in `_config.yml`.

For specific Rails versions:

```console
$ rake build_multi[5.2,6.0,6.1]
```

### Using docker for the older Rails build

Set `RUBY_VERSION` in `.env` file and run `docker compose`.

```console
$ cp .env.sample .env
$ docker compose run app bash -c 'rake build_multi[5.2]'
```

## Serve docs

Serve html under `src` directory.

```console
$ bundle exec jekyll server
```

## Feature Request

Please create an [issue](https://github.com/railsdoc/railsdoc.github.io/issues).
