const fs = require('fs');
const path = require('path');

// https://www.npmjs.com/package/yargs
const argv = require('yargs').argv;

var JSZip = require("jszip");

const { HalModuleParser, ModuleInfo } = require('binary-version-reader');

const hexFileEol = '\n';

const ncpDir = path.join(__dirname, 'ncp');

async function run() {
    if (argv.generate == '5.3.1' || argv.generateAll) {
        await generate5_0({
            ver: '5.3.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.3.0' || argv.generateAll) {
        await generate5_0({
            ver: '5.3.0',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.2.0' || argv.generateAll) {
        await generate5_0({
            ver: '5.2.0',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.2' || argv.generateAll) {
        // --generate 4.0.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.2',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.1' || argv.generateAll) {
        // --generate 4.0.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.1-rc.1' || argv.generateAll) {
        // --generate 4.0.1-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.1-rc.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.1.0' || argv.generateAll) {
        await generate5_0({
            ver: '5.1.0',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.0.1' || argv.generateAll) {
        await generate5_0({
            ver: '5.0.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.0' || argv.generateAll) {
        // --generate 4.0.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.0',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.0.0' || argv.generateAll) {
        await generate5_0({
            ver: '5.0.0',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.0.0-alpha.2' || argv.generateAll) {
        await generate5_0_alpha({
            ver: '5.0.0-alpha.2',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '5.0.0-alpha.1' || argv.generateAll) {
        await generate5_0_alpha({
            ver: '5.0.0-alpha.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.0-beta.1' || argv.generateAll) {
        // --generate 4.0.0-beta.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.0-beta.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }

    if (argv.generate == '4.0.0-alpha.2' || argv.generateAll) {
        // --generate 4.0.0-alpha.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate4_0({
            ver: '4.0.0-alpha.2',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }
    
    if (argv.generate == '4.0.0-alpha.1' || argv.generateAll) {
        await generate4_0({
            ver: '4.0.0-alpha.1',
            trackerEdge: 'tracker-edge-17@3.2.0.bin'
        });
    }
    
    if (argv.generate == '3.3.1' || argv.generateAll) {
        // --generate 3.3.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_3_1();
    }

    if (argv.generate == '3.3.0' || argv.generateAll) {
        // --generate 3.3.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_3_0();
    }

    if (argv.generate == '3.3.0-rc.1' || argv.generateAll) {
        // --generate 3.3.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_3_0_rc1();
    }

    if (argv.generate == '3.2.1-p2.3') {
        // This isn't enabled for --generate-all because it's only here for testing purposes at this time
        // --generate 3.2.1-p2.3 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generateFlatP2('3.2.1-p2.3');
    }

    if (argv.generate == '3.2.1-p2.2') {
        // This isn't enabled for --generate-all because it's only here for testing purposes at this time
        // --generate 3.2.1-p2.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generateFlatP2('3.2.1-p2.2');
    }

    if (argv.generate == '3.2.1-p2.1') {
        // This isn't enabled for --generate-all because it's only here for testing purposes at this time
        // --generate 3.2.1-p2.1 
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generateFlatP2('3.2.1-p2.1');
    }

    if (argv.generate == '3.2.0' || argv.generateAll) {
        // --generate 3.2.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_2_0();
    }

    if (argv.generate == '3.2.0-rc.1' || argv.generateAll) {
        // --generate 3.2.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_2_0_rc1();
    }

    if (argv.generate == '2.3.1' || argv.generateAll) {
        // --generate 2.3.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_3_1();
    }

    if (argv.generate == '2.3.0' || argv.generateAll) {
        // --generate 2.3.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_3_0();
    }

    if (argv.generate == '2.3.0-rc.1' || argv.generateAll) {
        // --generate 2.3.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_3_0_rc1();
    }

    if (argv.generate == '2.2.0' || argv.generateAll) {
        // --generate 2.2.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_2_0();
    }

    if (argv.generate == '2.2.0-rc.2' || argv.generateAll) {
        // --generate 2.2.0-rc.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_2_0_rc2();
    }

    if (argv.generate == '2.2.0-rc.1' || argv.generateAll) {
        // --generate 2.2.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_2_0_rc1();
    }

    if (argv.generate == '3.1.0' || argv.generateAll) {
        // --generate 3.1.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_1_0();
    }

    if (argv.generate == '3.1.0-rc.1' || argv.generateAll) {
        // --generate 3.1.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_1_0_rc1();
    }

    if (argv.generate == '3.0.0' || argv.generateAll) {
        // --generate 3.0.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_0_0();
    }

    if (argv.generate == '3.0.0-rc.2' || argv.generateAll) {
        // --generate 3.0.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_0_0_rc2();
    }

    if (argv.generate == '3.0.0-rc.1' || argv.generateAll) {
        // --generate 3.0.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_0_0_rc1();
    }

    if (argv.generate == '2.1.0' || argv.generateAll) {
        // --generate 2.1.0or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_1_0();
    }

    if (argv.generate == '2.1.0-rc.1' || argv.generateAll) {
        // --generate 2.1.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_1_0_rc1();
    }

    if (argv.generate == '2.0.2' || argv.generateAll) {
        // --generate 2.0.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_0_2();
    }

    if (argv.generate == '2.0.1' || argv.generateAll) {
        // --generate 2.0.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate2_0_1();
    }
    
    if (argv.generate == '1.5.2' || argv.generateAll) {
        // --generate 1.5.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_5_2();
    }
    
    if (argv.generate == '1.4.4' || argv.generateAll) {
        // --generate 1.4.4 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_4_4();
    }

    if (argv.generate == '1.2.1' || argv.generateAll) {
        // --generate 1.2.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_2_1();
    }

    if (argv.generate == '1.1.1' || argv.generateAll) {
        // --generate 1.1.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_1_1();
    }

    if (argv.generate == '1.0.1' || argv.generateAll) {
        // --generate 1.0.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_0_1();
    }

    if (argv.generate == '0.9.0' || argv.generateAll) {
        // --generate 0.9.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate0_9_0();
    }

    if (argv.generate == '0.7.0' || argv.generateAll) {
        // --generate 0.7.0 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate0_7_0();
    }

    if (argv.generate == '0.6.4' || argv.generateAll) {
        // --generate 0.6.4 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate0_6_4();
    }

    if (argv.generate == '0.6.3' || argv.generateAll) {
        // --generate 0.6.3 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate0_6_3();
    }

    if (argv.generate == '0.5.5' || argv.generateAll) {
        // --generate 0.5.5 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate0_5_5();
    }

    if (argv.analyze) {
        await analyze(argv.analyze);
    }
}

run();

async function analyze(f) {
    const hexData = fs.readFileSync(f, 'utf8');
    if (hexData.length == 0 || hexData.charAt(0) != ':') {
        console.log('input file ' + f + ' does not appear to be a hex file');
        return;
    }

    let baseAddr = 0;

    hexData.split(/[\r\n]/).some(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return false;
        }
        if (lineData.charAt(0) != ':') {
            return;
        }
        //console.log('line: ' + lineData);

        const buf = Buffer.from(lineData.substring(1), 'hex');
       
        const len = buf.readUInt8(0);
        const addr = buf.readUInt16BE(1);
        const recType = buf.readUInt8(3);
        // data begins at 4
        // checksum is last byte
        const checksum = buf.readUInt8(4 + len);

        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 4 && len == 2) {
                // Extended linear address
                baseAddr = buf.readUInt16BE(4) << 16;
                console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
            }

            //console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
    });
}

function hexFileWithoutEof(f) {
    // f is a path to a .hex file
    const hexData = fs.readFileSync(f, 'utf8');
    if (hexData.length == 0 || hexData.charAt(0) != ':') {
        console.log('input file ' + f + ' does not appear to be a hex file');
        return '';
    }

    let baseAddr = 0;
    let hexOut = '';

    hexData.split(/[\r\n]/).some(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return false;
        }
        if (lineData.charAt(0) != ':') {
            return false;
        }
        //console.log('line: ' + lineData);

        const buf = Buffer.from(lineData.substring(1), 'hex');
       
        const len = buf.readUInt8(0);
        const addr = buf.readUInt16BE(1);
        const recType = buf.readUInt8(3);
        // data begins at 4
        // checksum is last byte
        const checksum = buf.readUInt8(4 + len);

        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 0x00 && len == 0x00) {
                // EOF
                return true;
            }
            hexOut += lineData + hexFileEol;
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
        return false;
    });    

    return hexOut;
}

function padHex(num, len) {
    let hex = num.toString(16);
    if (hex.length < len) {
        return '00000000'.substr(0, len - hex.length) + hex;
    }
    else {
        return hex;
    }
}

function calculateBufferChecksum(buf) {
    // Last byte of buf is the checksum, so don't include that in
    // the checksum (buf.length - 1)
    let sum = 0;
    for(let ii = 0; ii < (buf.length - 1); ii++) {
        sum += buf.readUInt8(ii);
    }

    // Checksum is sum of all bytes, then two's complement
    // (invert all of the bits and add 1)
    return (~sum + 1) & 0xff;
}

// The baseAddr passed to this function is the 16-bit base address, not the actual base address of the file!
function baseAddrToHex(baseAddr) {
    // Len (1) + Addr (2) + Type (1) + Data (2) + Checksum (1) = 7
    let buf = Buffer.alloc(7);
    buf.writeUInt8(2, 0); // Byte count = 0x02 (offset 0)
    buf.writeUInt16BE(0, 1); // Address = 0x0000 (offset 1)
    buf.writeUInt8(4, 3); // Record type = 0x04 (offset 3)
    buf.writeUInt16BE(baseAddr, 4); // Base addr (offset 4)
    buf.writeUInt8(calculateBufferChecksum(buf), 6); // Checksum (offset 6)
    return buf.toString('hex');
}

async function binFilePathToHex(binFilePath) {
    return new Promise(function(resolve, reject) {
        const reader = new HalModuleParser();
        reader.parseFile(binFilePath, function(fileInfo, err) {
            if (err) {
                console.log("error processing file " + binFilePath, err);
                reject(err);
            }
            
            const loadAddress = parseInt(fileInfo.prefixInfo.moduleStartAddy, 16);
    
            // console.log('fileInfo', fileInfo);

            let hex = '';

            if (fileInfo.prefixInfo.moduleFunction == ModuleInfo.FunctionType.RADIO_STACK) {
                const bufSize = fileInfo.fileBuffer.length - fileInfo.suffixInfo.suffixSize - ModuleInfo.MODULE_PREFIX_SIZE;
                let buf = Buffer.alloc(bufSize);
                fileInfo.fileBuffer.copy(buf, 0, ModuleInfo.MODULE_PREFIX_SIZE, fileInfo.fileBuffer.length - fileInfo.suffixInfo.suffixSize);
                // The load address in the file is 0x1000. I'm not positive this is correct, may need to hardcode 0x0
                hex = fileBufferToHex(buf, loadAddress);     
            }
            else {
                hex = fileBufferToHex(fileInfo.fileBuffer, loadAddress);       
            }
    
            resolve(hex);    
        });
    });
}

function fileBufferToHex(fileBuffer, loadAddress) {
    // 
    let hex = '';

    // loadAddress is the address in the target memory space to load the file
    // This requires updating bot the baseAddress record (4) and the address.
    // Both the baseAddress and address in the data record are 16-bit, and
    // are combined to make a 32-bit address. However, when loading a binary
    // file it's not always loaded on a 16-bit boundary! 
    // For example, a Gen 3 user binary is loaded at 0xD4000 (128K) or 
    // 0xb4000 (256K) with Device OS 3.1 and later.
    // It does need to be an even multiple of the chunk size, but that's 16
    // bytes and should not be an issue.
    
    // Base address
    let lastBaseAddr = -1;

    let fileBufferOffset = 0;
    while(fileBufferOffset < fileBuffer.length) {
        let baseAddr = loadAddress & 0xffff0000;
        let curAddr = loadAddress - baseAddr;
        if (lastBaseAddr != baseAddr) {
            lastBaseAddr = baseAddr;
            hex += ':' + baseAddrToHex(baseAddr >> 16) + hexFileEol;
        }

        let chunkSize = fileBuffer.length - fileBufferOffset;
        if (chunkSize > 16) {
            chunkSize = 16;
        }

        // Len (1) + Addr (2) + Type (1) + Data (chunkSize) + Checksum (1) = 5 + chunkSize
        let buf = Buffer.alloc(5 + chunkSize);

        buf.writeUInt8(chunkSize, 0); // Byte count = chunkSize (offset 0)
        buf.writeUInt16BE(curAddr, 1); // Address = 0x0000 (offset 1)
        buf.writeUInt8(0, 3); // Record type = 0x00 (offset 3)

        fileBuffer.copy(buf, 4, fileBufferOffset,fileBufferOffset + chunkSize);

        buf.writeUInt8(calculateBufferChecksum(buf), 4 + chunkSize); // Checksum (last byte)

        hex += ':' + buf.toString('hex') + hexFileEol;

        fileBufferOffset += chunkSize;
        loadAddress += chunkSize;
    }

    

    return hex;
}

/*
len=0x02 addr=0x0000 recType=4 checksum=0xea :020000041000EA
len=0x10 addr=0x1000 recType=0 checksum=0xf0 :10100000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0
len=0x10 addr=0x1010 recType=0 checksum=0x8d :10101000FFFFFFFF00400F00FFFFFFFFFFFFFFFF8D
*/

function uicrHex(platform) {
    const platformUicrPath = path.join(__dirname, platform + '_uicr_no_eof.hex');
    
    if (fs.existsSync(platformUicrPath)) {
        return hexFile(platformUicrPath);
    }
    else {
        return hexFile(path.join(__dirname, 'uicr_no_eof.hex'));
    }
}

// The radio stack (SoftDevice) binaries on the Github release site are OTA binaries, and also load to
// address 0x1000. In order to restore a completely blank device you need the prefix before that, which
// is this hex data. It's the first 0xFFF bytes of nRF52 flash as as hex file, no EOF.
// Removing the OTA binary header is handled in binFilePathToHex().
function radioStackPrefixHex() {

    return hexFile(path.join(__dirname, 'radio_stack_prefix.hex'));
}

// Reads a file from disk and returns the contents, possibly with the end-of-line updated
// to use hexFileEol
function hexFile(f) {
    let hex = '';

    fs.readFileSync(f, 'utf8').split('\n').forEach(function(line) {
        hex += line.trim() + hexFileEol;
    });

    return hex;
}

// Return the end-of-file indicator. Must be at the end of the hex file.
function endOfFileHex() {
    return ':00000001FF' + hexFileEol;
}

async function generateFiles(inputDir, outputDir, files) {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Generate Hex
    for(let file of files) {
        for(let platform of file.platforms) {
            // Determine if this is gen3; used to determine if we need uicr and radio stack prefix
            const parts = file.parts(platform);

            let isGen3 = false; 
            for(let part of parts) {
                if (part.name == 'softdevice') {
                    isGen3 = true;
                    break;
                }
            }
            // Generate hex
            let hex = '';

            if (isGen3) {
                hex += uicrHex(platform);
                hex += radioStackPrefixHex();    
            }
            for(let part of parts) {
                if (part.name == 'gen3-128k-compatibility') {
                    let b = Buffer.alloc(1024, 0xff);
                    hex += fileBufferToHex(b, 0xd4000);
                }
                else 
                if (part.name == 'ncp') {
                    // hex files can't contain the NCP
                }
                else {
                    hex += await binFilePathToHex(path.join(inputDir, part.path));
                }
            }
            hex += endOfFileHex();
    
            fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex);

            var zip = new JSZip();

            let moduleInfo = {};

            for(let part of parts) {
                let binaryPath;

                if (part.name == 'ncp') {
                    binaryPath = path.join(ncpDir, part.file);

                    const content = fs.readFileSync(binaryPath);
                    zip.file(part.name + '.bin', content);
                }
                else {
                    if (!part.path) {
                        continue;
                    }
                    binaryPath = path.join(inputDir, part.path);
    
                    const content = fs.readFileSync(path.join(inputDir, part.path));
                    zip.file(part.name + '.bin', content);
                }

                // Add module info
                await new Promise(function(resolve, reject) {
                    const reader = new HalModuleParser();
                    reader.parseFile(binaryPath, function(fileInfo, err) {
                        if (err) {
                            console.log("error processing file " + path.join(inputDir, part.path), err);
                            reject(err);
                        }
                        
                        moduleInfo[part.name] = {
                            prefixInfo: fileInfo.prefixInfo,
                            suffixInfo: fileInfo.suffixInfo
                        };
                        resolve();
                    });
                });

            }
            if (argv.zip !== false) {
                // Generate zip

                await new Promise(function(resolve, reject) {
                    zip.generateNodeStream({type:'nodebuffer', streamFiles:true})
                    .pipe(fs.createWriteStream(path.join(outputDir, platform + '.zip')))
                    .on('finish', function () {
                        resolve();
                    });
                });
            }



            fs.writeFileSync(path.join(outputDir, platform + '.json'), JSON.stringify(moduleInfo, null, 2));
            
        }
    }    

}


async function generate5_0(options) {
    // https://github.com/particle-iot/device-os/releases/tag/v5.0.0-alpha.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v5.0.0-alpha.1/particle_device-os@4.0.0-alpha.1.zip
    // Extract it into the stage directory so you have stage/v5.0.0-alpha.1
    //
    // Also download:
    // All of the softdevices files, for example argon-softdevice@5.0.0-alpha.1 and copy them into into the top level of stage/v5.0.0-alpha.1
    // 
    // And:
    // https://github.com/particle-iot/tracker-edge/releases/download/v17/tracker-edge-17@3.2.0.bin -> stage/v5.0.0-alpha.1

    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = options.ver;
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom", "esomx"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join(options.trackerEdge) },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' },
                ];
            }
        },
        {
            platforms: ["p2", "trackerm"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'prebootloader-part1', path: path.join(platform, 'release', platform + '-prebootloader-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') },
                ];
            },
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate5_0_alpha(options) {
    // https://github.com/particle-iot/device-os/releases/tag/v5.0.0-alpha.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v5.0.0-alpha.1/particle_device-os@4.0.0-alpha.1.zip
    // Extract it into the stage directory so you have stage/v5.0.0-alpha.1
    //
    // Also download:
    // All of the softdevices files, for example argon-softdevice@5.0.0-alpha.1 and copy them into into the top level of stage/v5.0.0-alpha.1
    // 
    // And:
    // https://github.com/particle-iot/tracker-edge/releases/download/v17/tracker-edge-17@3.2.0.bin -> stage/v5.0.0-alpha.1

    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = options.ver;
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom", "esomx"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join(options.trackerEdge) },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' },
                ];
            }
        },
        {
            platforms: ["p2"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'prebootloader-part1', path: path.join(platform, 'release', platform + '-prebootloader-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') },
                ];
            },
        }
    ];
    generateFiles(inputDir, outputDir, files);
}



async function generate4_0(options) {
    // https://github.com/particle-iot/device-os/releases/tag/v4.0.0-alpha.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v4.0.0-alpha.1/particle_device-os@4.0.0-alpha.1.zip
    // Extract it into the stage directory so you have stage/v4.0.0-alpha.1
    //
    // Also download:
    // All of the softdevices files, for example argon-softdevice@4.0.0-alpha.1 and copy them into into the top level of stage/v4.0.0-alpha.1
    // 
    // And:
    // https://github.com/particle-iot/tracker-edge/releases/download/v17/tracker-edge-17@3.2.0.bin -> stage/v4.0.0-alpha.1

        // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = options.ver;
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom", "esomx"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join(platform + '-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join(options.trackerEdge) },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generateFlatP2(ver) {
    // All of the files are in the top level of the version dir in the stage dir
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["p2"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform + '-system-part1@' + ver + '.bin') },
                    { name: 'prebootloader-part1', path: path.join(platform + '-prebootloader-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
    ];
    generateFiles(inputDir, outputDir, files);
}



async function generate3_3_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.3.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.3.1/particle_device-os@3.3.1.zip
    // Extract it into the stage directory so you have stage/3.3.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.3.1/argon-softdevice@3.3.1.bin -> stage/3.3.1
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v16/tracker-edge-16@3.1.0.bin -> stage/3.3.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.3.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-17@3.2.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}

async function generate3_3_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.3.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.3.0/particle_device-os@3.3.0.zip
    // Extract it into the stage directory so you have stage/3.3.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.3.0/argon-softdevice@3.3.0.bin -> stage/3.3.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v16/tracker-edge-16@3.1.0.bin -> stage/3.3.0
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.3.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-17@3.2.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate3_3_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.3.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.3.0-rc.1/particle_device-os@3.3.0-rc.1.zip
    // Extract it into the stage directory so you have stage/3.3.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.3.0-rc.1/argon-softdevice@3.3.0-rc.1.bin -> stage/3.3.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v16/tracker-edge-16@3.1.0.bin -> stage/3.3.0-rc.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.3.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-17@3.2.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate3_2_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.2.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.2.0/particle_device-os@3.2.0.zip
    // Extract it into the stage directory so you have stage/3.2.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.2.0/argon-softdevice@3.2.0.bin -> stage/3.2.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v16/tracker-edge-16@3.1.0.bin -> stage/3.2.0
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.2.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-16@3.1.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate3_2_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.2.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.2.0-rc.1/particle_device-os@3.2.0-rc.1.zip
    // Extract it into the stage directory so you have stage/3.2.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.2.0-rc.1/argon-softdevice@3.2.0-rc.1.bin -> stage/3.2.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v16/tracker-edge-16@3.1.0.bin -> stage/3.2.0-rc.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.2.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-16@3.1.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate3_1_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.1.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.1.0/particle_device-os@3.1.0.zip
    // Extract it into the stage directory so you have stage/3.1.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.1.0/argon-softdevice@3.1.0.bin -> stage/3.1.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-14@3.0.0.bin -> stage/3.1.0
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.1.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-14@3.0.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }

                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}



async function generate3_1_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.1.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.1.0-rc.1/particle_device-os@3.1.0-rc.1.zip
    // Extract it into the stage directory so you have stage/3.1.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.1.0-rc.1/argon-softdevice@3.1.0-rc.1.bin -> stage/3.1.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-14@3.0.0.bin -> stage/3.1.0-rc.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.1.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'gen3-128k-compatibility'},
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-14@3.0.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}



async function generate3_0_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.0.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.0.0/particle_device-os@3.0.0.zip
    // Extract it into the stage directory so you have stage/3.0.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.0.0/argon-softdevice@3.0.0.bin -> stage/3.0.0
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v13/tracker-edge-13@3.0.0.bin -> stage/3.0.0
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.0.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-13@3.0.0.bin') },
                    { name: 'ncp', file: 'tracker-esp32-ncp@0.0.7.bin' }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);
}



async function generate3_0_0_rc2() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.0.0-rc2
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.0.0-rc.2/particle_device-os@3.0.0-rc.2.zip
    // Extract it into the stage directory so you have stage/3.0.0-rc.2
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.0.0-rc.2/argon-softdevice@3.0.0-rc.2.bin -> stage/3.0.0-rc.2
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/3.0.0-rc.2
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.0.0-rc.2';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@3.0.0-rc.2.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    
    ["tracker"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@3.0.0-rc.2.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tracker-edge-11@2.0.0-rc.4.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part3@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}



async function generate3_0_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v3.0.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v3.0.0-rc.1/particle_device-os@3.0.0-rc.1.zip
    // Extract it into the stage directory so you have stage/3.0.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v3.0.0-rc.1/argon-softdevice@3.0.0-rc.1.bin -> stage/3.0.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/3.0.0-rc.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '3.0.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@3.0.0-rc.1.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    
    ["tracker"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@3.0.0-rc.1.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tracker-edge-11@2.0.0-rc.4.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part3@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}




async function generate2_3_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.3.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.3.0/particle_device-os@2.3.1.zip
    // Extract it into the stage directory so you have stage/2.3.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.3.0/argon-softdevice@2.3.1.bin -> stage/2.3.1
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.3.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.3.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}

async function generate2_3_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.3.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.3.0/particle_device-os@2.3.0.zip
    // Extract it into the stage directory so you have stage/2.3.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.3.0/argon-softdevice@2.3.0.bin -> stage/2.3.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.3.0
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.3.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate2_3_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.3.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.3.0-rc.1/particle_device-os@2.3.0-rc.1.zip
    // Extract it into the stage directory so you have stage/2.3.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.3.0-rc.1/argon-softdevice@2.3.0-rc.1.bin -> stage/2.3.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.3.0-rc.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.3.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate2_2_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.2.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.2.0/particle_device-os@2.2.0.zip
    // Extract it into the stage directory so you have stage/2.2.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.2.0/argon-softdevice@2.2.0.bin -> stage/2.2.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.2.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate2_2_0_rc2() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.2.0-rc.2
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.2.0-rc.2/particle_device-os@2.2.0-rc.2.zip
    // Extract it into the stage directory so you have stage/2.2.0-rc.2
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.2.0-rc.2/argon-softdevice@2.2.0-rc.2.bin -> stage/2.2.0-rc.2 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.2.0-rc.2';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}

async function generate2_2_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.2.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.2.0-rc.1/particle_device-os@2.2.0-rc.1.zip
    // Extract it into the stage directory so you have stage/2.2.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.2.0-rc.1/argon-softdevice@2.2.0-rc.1.bin -> stage/2.2.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.2.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];
    generateFiles(inputDir, outputDir, files);
}


async function generate2_1_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.1.0
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.1.0/particle_device-os@2.1.0.zip
    // Extract it into the stage directory so you have stage/2.1.0
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.1.0/argon-softdevice@2.1.0.bin -> stage/2.1.0 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.1.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);
    
}



async function generate2_1_0_rc1() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.1.0-rc.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.1.0-rc.1/particle_device-os@2.1.0-rc.1.zip
    // Extract it into the stage directory so you have stage/2.1.0-rc.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.1.0-rc.1/argon-softdevice@2.1.0-rc.1.bin -> stage/2.1.0-rc.1 
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    // 
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
    
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.1.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@2.1.0-rc.1.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    
    ["tracker"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@2.1.0-rc.1.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tracker-edge-11@2.0.0-rc.4.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part3@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+lto.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}



async function generate2_0_2() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.0.2
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.0.2/particle_device-os@2.0.2.zip
    // Extract it into the stage directory so you have stage/2.0.2
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.0.2/argon-softdevice@2.0.2.bin -> stage/2.0.2
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    //
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.2
        
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.0.2';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);
    
}


async function generate2_0_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v2.0.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v2.0.1-rc.1/particle_device-os@2.0.1.zip
    // Extract it into the stage directory so you have stage/2.0.1
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v2.0.1/argon-softdevice@2.0.1.bin -> stage/2.0.1
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    //
    // https://github.com/particle-iot/tracker-edge/releases/download/v11/tracker-edge-11@2.0.0-rc.4.bin -> stage/2.0.1
        
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '2.0.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["tracker"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tracker-edge', path: path.join('tracker-edge-11@2.0.0-rc.4.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);
    
}


async function generate1_5_2() {
    // https://github.com/particle-iot/device-os/releases/tag/v1.5.2
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v1.5.2/particle_device-os@1.5.2.zip
    // Extract it into the stage directory so you have stage/1.5.2
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v1.5.2/argon-softdevice@1.5.2.bin -> stage/1.5.2
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    //
    // This version is pre-Tracker, so there are no Tracker binaries here and earlier
    // It does add back in xenon, however
        
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '1.5.2';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "b5som", "boron", "bsom", "xenon"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);

}

async function generate1_4_4() {
    // https://github.com/particle-iot/device-os/releases/tag/v1.4.4
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v1.4.4/particle_device-os@1.4.4.zip
    // Extract it into the stage directory so you have stage/1.4.4
    // 
    // Also download:
    // 
    // https://github.com/particle-iot/device-os/releases/download/v1.4.4/argon-softdevice@1.4.4.bin -> stage/1.4.4
    // (only Argon, it's the same for all Gen 3 devices but is missing from the large zip file)
    //
    // This version is: Before b5som
    // This verison includes: asom
        
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '1.4.4';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    const files = [
        {
            platforms: ["argon", "boron", "bsom", "asom"],
            parts: function(platform) {
                return [
                    { name: 'softdevice', path: path.join('argon-softdevice@' + ver + '.bin') },
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["electron"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'system-part3', path: path.join(platform, 'release', platform + '-system-part3@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        },
        {
            platforms: ["photon", "p1"],
            parts: function(platform) {
                return [
                    { name: 'system-part1', path: path.join(platform, 'release', platform + '-system-part1@' + ver + '.bin') },
                    { name: 'system-part2', path: path.join(platform, 'release', platform + '-system-part2@' + ver + '.bin') },
                    { name: 'bootloader', path: path.join(platform, 'release', platform + '-bootloader@' + ver + '+lto.bin') },
                    { name: 'tinker', path: path.join(platform, 'release', platform + '-tinker@' + ver + '.bin') }
                ];
            }
        }
    ];

    generateFiles(inputDir, outputDir, files);
}



async function generate1_2_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v1.2.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v1.2.1/particle_device-os@1.2.1.zip
    // Extract it into the stage directory so you have stage/1.2.1
    // 
    // Also download:
    // https://docs.particle.io/assets/files/s140_nrf52_6.1.1_softdevice.hex and save to stage/1.2.1
    //     
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '1.2.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "asom", "boron", "bsom", "xenon"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += hexFileWithoutEof(path.join(inputDir, 's140_nrf52_6.1.1_softdevice.hex'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part3@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '+debug.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}


async function generate1_1_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v1.1.1
    // Download the full zip file: https://github.com/particle-iot/device-os/releases/download/v1.1.1/particle_device-os@1.1.1.zip
    // Extract it into the stage directory so you have stage/1.1.1
    // 
    // Also download:
    // https://docs.particle.io/assets/files/s140_nrf52_6.1.1_softdevice.hex and save to stage/1.1.1
    //     
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '1.1.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "asom", "boron", "bsom", "xenon"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += hexFileWithoutEof(path.join(inputDir, 's140_nrf52_6.1.1_softdevice.hex'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part3@' + ver + '+debug.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '+debug.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part2@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}



async function generate1_0_1() {
    // https://github.com/particle-iot/device-os/releases/tag/v1.0.1
    // Save the binaries in stage/1.1.1
    // 
    // There is no full zip for this versions, so you need to download the bootloader, system-part-* and tinker
    // for Electron, P1, and Photon. You can igonore the Core binaries.
    //     
    // There is no Gen 3 support in 1.0.x!
    //
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '1.0.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + ver + '-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part3-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-' + ver + '-' + platform +  '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-' + ver + '-' + platform +  '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
}


async function generate0_9_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v0.9.0
    //
    // Download the binaries zip:
    // https://github.com/particle-iot/device-os/releases/download/v0.9.0/particle_device_os_0.9.0.zip
    // Save in stage/0.9.0 (rename particle_device_os_0.9.0 to 0.9.9)
    //
    // Also download:
    // https://docs.particle.io/assets/files/s140_nrf52_6.0.0_softdevice.hex and save to stage/0.9.0
    //
    // This release is Gen 3, Argon, Boron, and Xenon only
    // It predates the SoM versions

    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '0.9.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }


    ["argon", "boron", "xenon"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex(platform);
        hex += hexFileWithoutEof(path.join(inputDir, 's140_nrf52_6.0.0_softdevice.hex'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + ver + '-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-' + ver + '-' + platform +  '.bin'));

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });




}




async function generate0_7_0() {
    // https://github.com/particle-iot/device-os/releases/tag/v0.7.0
    // 
    // There is no full zip for this versions, so you need to download the bootloader and system-part-*
    // for Electron, P1, and Photon. You can igonore the Core binaries. Save to stage/0.7.0
    //
    // Go here and download more:
    // https://github.com/particle-iot/particle-cli/tree/master/assets/binaries
    // Download: electron_tinker.bin, tinker-0.4.5-p1.bin and tinker-0.4.5-photon.bin to stage/0.7.0

    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '0.7.0';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + ver + '-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part3-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'electron_tinker.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-0.4.5-' + platform +  '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

}




async function generate0_6_4() {
    // https://github.com/particle-iot/device-os/releases/tag/v0.6.4
    // 
    // There is no full zip for this versions, so you need to download the bootloader and system-part-*
    // for Electron to stage/0.6.4
    //
    // Go here and download more:
    // https://github.com/particle-iot/particle-cli/tree/master/assets/binaries
    // Download: electron_tinker.bin to stage/0.6.4
    // 
    // Also download:
    // https://docs.particle.io/assets/files/bootloader-electron.bin and save to stage/0.6.4
    //
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '0.6.4';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part3-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'electron_tinker.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

}


async function generate0_6_3() {
    // https://github.com/particle-iot/device-os/releases/tag/v0.6.3
    // 
    // There is no full zip for this versions, so you need to download the bootloader and system-part-*
    // for Photon and P1 to stage/0.6.3
    //
    // Go here and download more:
    // https://github.com/particle-iot/particle-cli/tree/master/assets/binaries
    // Download: tinker-0.4.5-p1.bin and tinker-0.4.5-photon.bin to stage/0.6.3
    // 
    // Also download:
    // https://docs.particle.io/assets/files/bootloader-p1.bin and save to stage/0.6.3
    // https://docs.particle.io/assets/files/bootloader-photon.bin and save to stage/0.6.3
    //
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '0.6.3';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-0.4.5-' + platform +  '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

}



async function generate0_5_5() {
    // https://github.com/particle-iot/device-os/releases/tag/v0.5.5
    // 
    // There is no full zip for this versions, so you need to download the bootloader and system-part-*
    // for Electron to stage/0.5.5
    //
    // Go here and download more:
    // https://github.com/particle-iot/particle-cli/tree/master/assets/binaries
    // Download: electron_tinker.bin, tinker-0.4.5-p1.bin and tinker-0.4.5-photon.bin to stage/0.5.5
    // 
    // Also download:
    // https://docs.particle.io/assets/files/bootloader-electron.bin and save to stage/0.5.5
    // https://docs.particle.io/assets/files/bootloader-p1.bin and save to stage/0.5.5
    // https://docs.particle.io/assets/files/bootloader-photon.bin and save to stage/0.5.5
    //
    // Note: Make sure the user firmware binary is the last thing, right before the end of file marker!
    // The custom hex generator (https://docs.particle.io/hex-generator/) relies on this.

    const ver = '0.5.5';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["electron"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'electron_tinker.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

    ["p1", "photon"].forEach(async function(platform) {
        let hex = '';

        hex += await binFilePathToHex(path.join(inputDir, 'bootloader-' + platform + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part1-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'system-part2-' + ver + '-' + platform +  '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, 'tinker-0.4.5-' + platform +  '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });

}
