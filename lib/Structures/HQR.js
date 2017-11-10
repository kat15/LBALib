exports.HQRStructure = class {

    constructor() {
        this.offset = 0; // 4 bytes
        this.size = 0; // 4 bytes
        this.compsize = 0; // 4 bytes
        this.compress = 0; // 2 bytes
        this.isLoaded = false;
        this.error = '';
        this.data = '';
    }
};