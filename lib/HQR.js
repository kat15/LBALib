fs = require('fs');
let {String} = require('../utils/String'),
    {HQRStructure} = require('./Structures/HQR'),
    string = new String();

exports.HQR = class {
    constructor(filename) {
        this.filename = filename;
        this.record = 0;
        this.count = 0;
        this.entry = new HQRStructure();
        this.entries = new Array(0);
    }

    loadAllEntries(filename) {
        let index = 1;
        if (filename !== undefined) {
            this.filename = filename;
        }
        this.openFile();
        this.count = this.getLength();
        this.AllocateEntries();
        for (index; index < this.count; index++) {
            this.entries[index - 1] = this.LoadEntry(index);
            if (!this.entries[index - 1].isLoaded) {
               console.log(index + 'ERROR: ' + this.entries[index-1].error);
            }
        }
        return false;
    }

    LoadEntry(rec) {
        rec--;
        this.record = rec;
        let position = this.getPosition();
        string.setPosition(position);
        this.entry = new HQRStructure();
        this.entry = this.getHeader(true);
        return this.entry;
    }

    openFile() {
        this.file = fs.readFileSync(this.filename);
        return this.file;
    }

    getLength() {
        return this.getPosition(0) / 4;
    }

    getPosition(rec) {
        if (rec === undefined) {
            rec = this.record;
        }
        string.setPosition(rec * 4);
        let position = string.readIntLittleEndian(this.file);
        string.resetPosition();
        this.entry.offset = position;
        return position;
    }

    AllocateEntries() {
        if (this.count === undefined) {
            this.count = this.getLength();
        }
        this.entries = new Array(this.count - 1);
        return true;
    }

    getHeader(data) {
        this.entry.isLoaded = false;
        this.entry.data = '';
        this.entry.size = string.readIntLittleEndian(this.file);
        this.entry.compsize = string.readIntLittleEndian(this.file);
        this.entry.compress = string.readCharLittleEndian(this.file);
        if (data) {
            this.entry.data = new Array(this.entry.size + 1).join(0x00);
            this.entry.data = string.read(this.file, this.entry.size);
            if (this.entry.compress === 0x01) {
                this.entry.data = this.expand(this.entry.size, this.entry.data);
            }
            this.entry.data = Buffer.from(this.entry.data, 'hex');
            this.entry.isLoaded = true;
        }
        return this.entry;
    }

    /* Toel expand function */
    expand(decompressedSize, source) {

        let loop,
            indic,
            size,
            temp,
            i,
            psrc = 0,
            pdst = 0,
            jumpback,
            dest = new Array(decompressedSize);

        do {
            loop = 8;
            indic = source[psrc++];
            do {
                if ((indic & 1) === 0) {
                    temp = ((source[psrc + 1] & 0xFF) * 256) + (source[psrc] & 0xFF);   // Read flag
                    psrc += 2;                                                          // Move pointer after flag
                    size = temp & 0x0F;                                                 // Size is 4 less bite of flag
                    size += 2;                                                          // Size in bytes is (bits 3210) + (compression type) + 1
                    decompressedSize -= size;


                    jumpback = pdst - (temp >> 4) - 1;                                  // Compute jumpback
                    for (i = 0; i < size; i++) {                                        // Perform jumpback cpy
                        dest[pdst++] = dest[jumpback++];
                    }
                    if (decompressedSize <= 0) {
                        return dest;
                    }
                    loop--;
                } else {
                    dest[pdst++] = source[psrc++];
                    loop--;
                    decompressedSize--;
                    if (decompressedSize <= 0) {
                        return dest;
                    }
                }
                indic >>= 1;
            } while (loop > 0);
        } while (decompressedSize > 0);
        return dest;
    }
}