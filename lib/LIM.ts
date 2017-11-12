import {StringUtil} from '../utils/StringUtil';
import {LIMEntry} from './Structures/images/LIMEntry';
import {HQR} from './HQR';

let string = new StringUtil();

exports.LIM = class LIM extends HQR {

    lim:LIMEntry;
    palette:Array<String>;

    constructor(filename:String) {
        super(filename);
        this.palette = new Array<String>(256);
        this.lim = new LIMEntry();
    }

    LoadPalette(data:string, toLIM:boolean) {
        if (data.length != 768) {
            return false;
            // something wrong
        }

        let pal = 0,
            index = 0,
            R,
            G,
            B;
        for (index; index < 256; index++) {
            let R = string.unsignedByteToInt(data[pal++]).toString(16),
                G = string.unsignedByteToInt(data[pal++]).toString(16),
                B = string.unsignedByteToInt(data[pal++]).toString(16);
            this.palette[index] = R + G + B;
        }
        if (toLIM) {
            this.lim.palette = this.palette;
        }
        return this.palette;
    }

    LoadLIM(data:number[]) {
        this.lim.size = data.length;
        if (this.lim.size == 307200) {
            this.lim.width = 640;
            this.lim.height = 480;
        } else {
            this.lim.width = 256;
            this.lim.height = 256;
        }
        this.lim.picture = [];
        let pic = 0,
            indexY = 0,
            indexX;
        for (indexY; indexY < this.lim.height; indexY++) {
            this.lim.picture[indexY] = [];
            for (indexX = 0; indexX < this.lim.width; indexX++) {
                this.lim.picture[indexY][indexX] = this.lim.palette[string.unsignedByteToInt(data[pic])];
                pic++;
            }
        }
        return true;
    }
}