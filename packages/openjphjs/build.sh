#!/bin/sh
mkdir -p build
mkdir -p dist
# Imagenio fork: Release em vez de Debug (upstream usava Debug).
# Debug gera WASM ~2.2MB + ASSERTIONS (lento no hot path de decode); Release -O3
# gera ~220KB e e mais rapido. Validado funcional no smoke 8Z131Y4I3 (abr/2026).
(cd build && CXXFLAGS=-msimd128 emcmake cmake -DCMAKE_BUILD_TYPE=Release ..)
#(cd build && CXXFLAGS=-msimd128 emcmake cmake -DCMAKE_BUILD_TYPE=Debug ..)
(cd build && emmake make VERBOSE=1 -j ${nprocs})
cp ./build/src/openjphjs.js ./dist
cp ./build/src/openjphjs.wasm ./dist
# disable tests for now since CI doesn't like to run with SIMD
# (cd test/node; npm run test)
