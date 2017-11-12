"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtil = (function () {
    function StringUtil() {
        this.i = 0;
    }
    StringUtil.prototype.setPosition = function (i) {
        this.i = i;
    };
    StringUtil.prototype.getPosition = function () {
        return this.i;
    };
    StringUtil.prototype.resetPosition = function () {
        this.i = 0;
    };
    StringUtil.prototype.read = function (dis, length) {
        var index = 0, ret = new Array(length);
        for (index; index < length; index++) {
            ret[index] = dis[this.i++];
        }
        return ret;
    };
    StringUtil.prototype.readTillZero = function (dis) {
        var index = 0, length = dis.length, ret = Buffer.from('');
        for (index; index < length; index++) {
            ret += String.fromCharCode(dis[this.i++]);
            if (dis[this.i] === 0x00) {
                return ret;
            }
        }
        return ret;
    };
    /**
     * Read a 32-bit signed int, in little-endian binary format.
     *
     * @param dis stream to read from.
     *
     * @return binary value.
     */
    StringUtil.prototype.readIntLittleEndian = function (dis) {
        // get 4 unsigned byte components, and accumulate into an int.
        var accum = 0, shiftBy = 0;
        for (shiftBy; shiftBy < 32; shiftBy += 8) {
            accum |= (this.unsignedByteToInt(dis[this.i++])) << shiftBy;
        }
        return accum;
    };
    /**
     * Read a 16-bit signed long, in little-endian binary format.
     *
     * @param dis stream to read from.
     *
     * @return binary value.
     */
    StringUtil.prototype.readLongLittleEndian = function (dis) {
        // 8 bytes, get each byte unsigned, and accumulate them onto the long
        var accum = 0, shiftBy = 0;
        for (shiftBy; shiftBy < 64; shiftBy += 8) {
            // must cast to long or the shift would be done modulo 32
            accum |= (this.unsignedByteToInt(dis[this.i++])) << shiftBy;
        }
        return accum;
    };
    StringUtil.prototype.readCharLittleEndian = function (dis) {
        // get two component unsigned 2 bytes
        var low = dis[this.i++] & 0xff, high = dis[this.i++];
        // combine to unsigned
        return (high << 8 | low);
    };
    // readChar(dis) {
    //     let temp = new Buffer(2);
    //     temp[0] = dis[this.i++];
    //     temp[1] = dis[this.i++];
    // // ret= (dis[this.i++]<<0)&0xff00|(dis[this.i++]<<8)&0xff;
    // // ret= (dis[this.i++]&0xff) << 8;
    // // ret += (dis[this.i++]&0xff) << 0;
    //     ByteBuffer bb = ByteBuffer.wrap(temp);
    //     return bb.getChar();
    // }
    /**
     * Read a 16-bit signed short, in little-endian binary format.
     *
     * @param dis stream to read from.
     *
     * @return binary value.
     */
    StringUtil.prototype.readShortLittleEndian = function (dis) {
        // get 2 bytes, unsigned 0..255
        var low = dis[this.i++] & 0xff, high = dis[this.i++] & 0xff;
        // combine into a signed short.
        return (high << 8 | low);
    };
    StringUtil.prototype.readDoubleLittleEndian = function (dis) {
        // get the 8 unsigned raw bytes, accumulate to a long and then
        // convert the 64-bit pattern to a double.
        var accum = 0, shiftBy = 0;
        for (shiftBy; shiftBy < 64; shiftBy += 8) {
            // must cast to long or the shift would be done modulo 32
            accum |= ((this.unsignedByteToInt(dis[this.i++])) << shiftBy);
        }
        return accum;
    };
    StringUtil.prototype.readFloatLittleEndianByte = function (dis) {
        // get 4 unsigned raw byte components, accumulating to an int,
        // then convert the 32-bit pattern to a float.
        var accum = 0, shiftBy = 0;
        for (shiftBy; shiftBy < 32; shiftBy += 8) {
            accum |= (this.unsignedByteToInt(dis[this.i++])) << shiftBy;
        }
        return accum;
    };
    StringUtil.prototype.readByteLittleEndian = function (dis) {
        // 1 byte signed -128 .. 127. Nothing special needed in addition.
        return dis[this.i++];
    };
    StringUtil.prototype.unsignedByteToInt = function (b) {
        return b & 0xFF;
    };
    return StringUtil;
}());
exports.StringUtil = StringUtil;
;
