import {StringUtil} from '../utils/StringUtil';
import {HQR} from './HQR';

let string = new StringUtil();

exports.Text = class Text extends HQR {
    text: string;

    constructor(filename) {
        super(filename);
        this.text = '';
    }

    loadEntry(hqrRecord, textRecord) {
        // console.log('loadEntry');
        this.LoadEntry(hqrRecord);
        string.setPosition(textRecord * 2);
        let position = string.readLongLittleEndian(this.file);
        string.setPosition(position);
        // console.log(textRecord +":"+position);
        // this.text = string.readTillZero(this.file);
        // console.log(this.text);
    }
};