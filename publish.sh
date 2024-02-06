#!/usr/bin/env bash

git add .
git commit -m 'wip'
npm version patch
git push origin HEAD
npm publish