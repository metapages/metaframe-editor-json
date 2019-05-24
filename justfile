# just docs: https://github.com/casey/just

_help:
    @just --list

# Serves development app at http://localhost:1234
serve:
    npm start

# Builds a production build
build:
    @mkdir -p dist
    @rm dist/*
    npm run build

deploy: build
    npx gh-pages -d dist
