# [railsdoc.github.io](https://railsdoc.github.io/) 

[![CI](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/railsdoc/railsdoc.github.io/actions/workflows/deploy.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c964029a-6d5a-4f3a-95e9-d35830a2fe83/deploy-status)](https://app.netlify.com/sites/railsdoc-preview/deploys)

railsdoc.github.io is yet another Rails API documentation website.

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

## Docker Usage

You can run this project using Docker Compose:

```bash
# Run the application
docker compose run --rm app bundle exec rake

# Run with a specific Ruby version
RUBY_VERSION=3.3 docker compose run --rm app bundle exec rake

# Run Jekyll server for development
docker compose run --rm --service-ports app bundle exec jekyll serve --host 0.0.0.0
```

The Docker setup uses the official Ruby image and includes:
- Ruby with YJIT enabled for better performance
- Automatic bundle installation
- Volume mounting for live development

## Feature Request

Please create an [issue](https://github.com/railsdoc/railsdoc.github.io/issues).
