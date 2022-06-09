#!/bin/sh

# Generate env.js for port to access backend api
# Could just use env variable instead but just using ARG in Dockerfile as alternative
echo "\
const backendPort = $1;\
" > env.js
