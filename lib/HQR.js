"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var HQRStructure_1 = require("./Structures/HQRStructure");
var StringUtil_1 = require("../utils/StringUtil");
var string = new StringUtil_1.StringUtil();
var HQR = (function () {
    function HQR(filename) {
        this.loadAllEntries = function (filename) {
            var index = 1;
            if (filename !== undefined) {
                this.filename = filename;
            }
            this.openFile();
            this.count = this.getLength();
            this.AllocateEntries();
            for (index; index < this.count; index++) {
                this.entries[index - 1] = this.LoadEntry(index);
                if (!this.entries[index - 1].isLoaded) {
                    console.log(index + 'ERROR: ' + this.entries[index - 1].error);
                }
            }
            return false;
        };
        this.LoadEntry = function (rec) {
            rec--;
            this.openFile();
            this.record = rec;
            var position = this.getPosition();
            string.setPosition(position);
            this.entry = new HQRStructure_1.HQRStructure();
            this.entry = this.getHeader(true);
            return this.entry;
        };
        this.openFile = function () {
            if (!this.file) {
                this.file = fs.readFileSync(this.filename);
            }
            return this.file;
        };
        this.getLength = function () {
            return this.getPosition(0) / 4;
        };
        this.getPosition = function (rec) {
            if (rec === undefined) {
                rec = this.record;
            }
            string.setPosition(rec * 4);
            var position = string.readIntLittleEndian(this.file);
            string.resetPosition();
            this.entry.offset = position;
            return position;
        };
        this.AllocateEntries = function () {
            if (this.count === undefined) {
                this.count = this.getLength();
            }
            this.entries = new Array(this.count - 1);
            return true;
        };
        this.getHeader = function (data) {
            this.entry.isLoaded = false;
            this.entry.data = '';
            this.entry.size = string.readIntLittleEndian(this.file);
            this.entry.compsize = string.readIntLittleEndian(this.file);
            this.entry.compress = string.readCharLittleEndian(this.file);
            if (data) {
                this.entry.data = new Array(this.entry.size + 1).join('');
                this.entry.data = string.read(this.file, this.entry.size);
                if (this.entry.compress === 0x01) {
                    this.entry.data = this.expand(this.entry.size, this.entry.data);
                }
                this.entry.data = Buffer.from(this.entry.data, 'hex');
                this.entry.isLoaded = true;
            }
            return this.entry;
        };
        /* Toel expand function */
        this.expand = function (decompressedSize, source) {
            var loop, indic, size, temp, i, psrc = 0, pdst = 0, jumpback, dest = new Array(decompressedSize);
            do {
                loop = 8;
                indic = source[psrc++];
                do {
                    if ((indic & 1) === 0) {
                        temp = ((source[psrc + 1] & 0xFF) * 256) + (source[psrc] & 0xFF); // Read flag
                        psrc += 2; // Move pointer after flag
                        size = temp & 0x0F; // Size is 4 less bite of flag
                        size += 2; // Size in bytes is (bits 3210) + (compression type) + 1
                        decompressedSize -= size;
                        jumpback = pdst - (temp >> 4) - 1; // Compute jumpback
                        for (i = 0; i < size; i++) {
                            dest[pdst++] = dest[jumpback++];
                        }
                        if (decompressedSize <= 0) {
                            return dest;
                        }
                        loop--;
                    }
                    else {
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
        };
        var modal = new HQRStructure_1.HQRStructure();
        this.filename = filename;
        this.record = 0;
        this.count = 0;
        this.entry = new HQRStructure_1.HQRStructure();
        this.entries = new Array(0);
    }
    ;
    return HQR;
}());
exports.HQR = HQR;
