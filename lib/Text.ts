import {StringUtil} from '../utils/StringUtil';
import {HQR} from './HQR';

let string = new StringUtil();

exports.Text = class Text extends HQR {
    text: string;

    constructor(filename:String) {
        super(filename);
        this.text = '';
    }

    loadEntry(hqrRecord:number, textRecord:number) {
        this.LoadEntry(hqrRecord);
        string.setPosition((textRecord - 1) * 2);
        let position = string.readCharLittleEndian(this.entry.data);
        string.setPosition(position);
        return string.readTillZero(this.entry.data).toString();
    }
};