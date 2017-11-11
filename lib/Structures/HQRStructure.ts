// export type HQRStructure = {
export class HQRStructure {
    offset: number; // 4 bytes
    size: number; // 4 bytes
    compsize: number; // 4 bytes
    compress: number; // 2 bytes
    isLoaded: boolean;
    error: string;
    data: string;

    constructor() {
        this.offset = 0;
        this.size = 0;
        this.compsize = 0;
        this.compress = 0;
        this.isLoaded = false;
        this.error = '';
        this.data = '';
    }
}