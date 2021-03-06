const fs = require('fs');
const path = require('path');

// https://www.npmjs.com/package/yargs
const argv = require('yargs').argv;

const { HalModuleParser, ModuleInfo } = require('binary-version-reader');

const hexFileEol = '\n';

async function run() {
    if (argv.generate == '3.0.0-rc.1' || argv.generateAll) {
        // --generate 3.0.0-rc.1 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate3_0_0_rc1();
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
        // --generate 1.5.2 or --generate-all
        // Create the full set of hex files from scratch
        // Requires downloading a bunch of stuff, see the generateXXX functions below
        await generate1_4_4();
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

    hexData.split(/[\r\n]/).forEach(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return;
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

function printFileInfo(f) {
    // Test code for decoding hex files and printing useful information
    const hexData = fs.readFileSync(f, 'utf8');

    // console.log('read file', hexData);

    /*
    :020000041000EA
    :10100000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0
    :10101000FFFFFFFF00400F00FFFFFFFFFFFFFFFF8D
    :10102000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD0
    :10103000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC0
    :10104000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFB0
    ...
    :00000001FF
    */
    let baseAddr = 0;

    hexData.split(/[\r\n]/).forEach(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return;
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

            console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
    });
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
    return buf;
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
    // For example, a Gen 3 user binary is loaded at 0xD4000.
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
            hex += ':' + baseAddrToHex(baseAddr >> 16).toString('hex') + hexFileEol;
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

function uicrHex() {

    return hexFile(path.join(__dirname, 'uicr_no_eof.hex'));
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
    
    const ver = '3.0.0-rc.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex();
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

        hex += uicrHex();
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
    
    const ver = '2.0.1';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex();
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@2.0.1.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
        hex += endOfFileHex();

        fs.writeFileSync(path.join(outputDir, platform + '.hex'), hex)
    });
    ["tracker"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex();
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@2.0.1.bin'));
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
    const ver = '1.5.2';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "b5som", "boron", "bsom", "xenon"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex();
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@1.5.2.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
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
    const ver = '1.4.4';
    const inputDir = path.join(__dirname, 'stage', ver);
    const outputDir = path.join(__dirname, 'release', ver);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    ["argon", "asom", "boron", "bsom", "xenon"].forEach(async function(platform) {
        let hex = '';

        hex += uicrHex();
        hex += radioStackPrefixHex();
        hex += await binFilePathToHex(path.join(inputDir, 'argon-softdevice@1.4.4.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-system-part1@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-bootloader@' + ver + '.bin'));
        hex += await binFilePathToHex(path.join(inputDir, platform, 'release', platform + '-tinker@' + ver + '.bin'));
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
