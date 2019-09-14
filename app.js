var fs = require('fs');
var path = require('path');
var wabt = require("wabt")();
var argv = require('yargs')
	.usage('$0 <source>')
	.argv;

var infile = argv._[0];

if (!infile) {
	console.error('You must provide an input file.');
	process.exit(1);
	return;
}

exports.wat2wasm = function() {
	var outfile = argv.o || path.join(
		path.dirname(infile),
		path.basename(infile,
			path.extname(infile)
		) + '.wasm'
	);

	fs.writeFileSync(outfile,
		Buffer.from(wabt.parseWat(infile,
			fs.readFileSync(infile, 'utf-8')
		).toBinary({}).buffer),
		'binary'
	);

	console.log(`${infile} --> ${outfile}`);
};

exports.wasm2wat = function() {
	var outfile = argv.o || path.join(
		path.dirname(infile),
		path.basename(infile,
			path.extname(infile)
		) + '.wat'
	);

	var wasmModule = wabt.readWasm(fs.readFileSync(infile, 'binary'), {
		readDebugNames: true
	});

	wasmModule.applyNames();

	fs.writeFileSync(outfile,
		wasmModule.toText({
			foldExprs: false,
			inlineExport: false
		}),
		'utf-8'
	);

	console.log(`${infile} --> ${outfile}`);
};
