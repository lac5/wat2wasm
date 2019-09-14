# Web Assembly Assembler Tool

This is just a wrapper for the `wabt` node module to work as a command-line tool.

### Install

    npm install larryc5/wat2wasm -g

### Usage

Convert `.wat` to `.wasm`:

    wat2wasm <.wat file> [-o <.wasm file>]

Convert `.wasm` to `.wat`:

	wasm2wat <.wasm file> [-o <.wat file>]
