
add_executable(openjphjs jslib.cpp)

target_link_libraries(openjphjs PRIVATE openjphsimd)
target_compile_options(openjphjs PRIVATE -DOJPH_ENABLE_WASM_SIMD -msimd128)
# Imagenio fork: cxx_std_17 exigido pelo Emscripten 5.x (upstream usa cxx_std_11).
target_compile_features(openjphjs PUBLIC cxx_std_17)
set_target_properties(
    openjphjs
    PROPERTIES
    LINK_FLAGS "\
      -O3 \
      -s WASM=1 \
      --bind \
      -fwasm-exceptions \
      -s ASSERTIONS=0 \
      -s MODULARIZE=1 \
      -s NO_EXIT_RUNTIME=1 \
      -s MALLOC=emmalloc \
      -s ALLOW_MEMORY_GROWTH=1 \
      -s INITIAL_MEMORY=50mb \
      -s FILESYSTEM=0 \
      -s ENVIRONMENT=web,worker \
      -s EXPORTED_FUNCTIONS=[] \
      -s EXPORTED_RUNTIME_METHODS=[ccall] \
   ")
# Imagenio fork notes:
#   - removido `-s DISABLE_EXCEPTION_CATCHING=1` (era no-op com -fexceptions e
#     incompativel com -fwasm-exceptions)
#   - adicionado `-fwasm-exceptions` (WASM native exceptions runtime)
#   - adicionado `-s ENVIRONMENT=web,worker` (limita runtime, reduz bundle size)
