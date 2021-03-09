# HexTool

Tool for generating Particle device restore image Intel Hex files for use with JTAG/SWD debuggers

## Usage

```
npm install
node app.js --generate-all
```

You can also generate a specific version such as:

```
node app.js --generate 3.0.0-rc.1
```

In order to generate the files you must download a bunch of binaries from Github into the `stage` directory. 

See the comments at the beginning of each generate function, for example `function generate3_0_0_rc1()` to see what you need to download.

The output will be a series of .hex files in the `release` directory.

