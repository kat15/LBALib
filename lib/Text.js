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
var HQR_1 = require("./HQR");
var string = new StringUtil_1.StringUtil();
exports.Text = (function (_super) {
    __extends(Text, _super);
    function Text(filename) {
        var _this = _super.call(this, filename) || this;
        _this.text = '';
        return _this;
    }
    Text.prototype.loadEntry = function (hqrRecord, textRecord) {
        this.LoadEntry(hqrRecord);
        string.setPosition((textRecord - 1) * 2);
        var position = string.readCharLittleEndian(this.entry.data);
        string.setPosition(position);
        return string.readTillZero(this.entry.data).toString();
    };
    return Text;
}(HQR_1.HQR));
