"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtil_1 = require("../utils/StringUtil");
var LIMEntry_1 = require("./Structures/images/LIMEntry");
var HQR_1 = require("./HQR");
var string = new StringUtil_1.StringUtil();
exports.LIM = (function (_super) {
    __extends(LIM, _super);
    function LIM(filename) {
        var _this = _super.call(this, filename) || this;
        _this.palette = new Array(256);
        _this.lim = new LIMEntry_1.LIMEntry();
        return _this;
    }
    LIM.prototype.LoadPalette = function (data, toLIM) {
        if (data.length != 768) {
            return false;
            // something wrong
        }
        var pal = 0, index = 0, R, G, B;
        for (index; index < 256; index++) {
            var R_1 = string.unsignedByteToInt(data[pal++]).toString(16), G_1 = string.unsignedByteToInt(data[pal++]).toString(16), B_1 = string.unsignedByteToInt(data[pal++]).toString(16);
            this.palette[index] = R_1 + G_1 + B_1;
        }
        if (toLIM) {
            this.lim.palette = this.palette;
        }
        return this.palette;
    };
    LIM.prototype.LoadLIM = function (data) {
        this.lim.size = data.length;
        if (this.lim.size == 307200) {
            this.lim.width = 640;
            this.lim.height = 480;
        }
        else {
            this.lim.width = 256;
            this.lim.height = 256;
        }
        this.lim.picture = [];
        var pic = 0, indexY = 0, indexX;
        for (indexY; indexY < this.lim.height; indexY++) {
            this.lim.picture[indexY] = [];
            for (indexX = 0; indexX < this.lim.width; indexX++) {
                this.lim.picture[indexY][indexX] = this.lim.palette[string.unsignedByteToInt(data[pic])];
                pic++;
            }
        }
        return true;
    };
    return LIM;
}(HQR_1.HQR));
