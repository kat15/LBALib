fs = require('fs');
const {LIM} = require('../lib/LIM');
const expect = require('chai').expect;
const MainLBAPalette = ['000', 'ffff0', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', '2b1f1b', '372723', '43332b', '4f3f37', 'ff8b0', 'ffc30', 'ffff0', 'ffc70', 'ff930', 'ff5f0', 'ffffff', 'ffffff', 'ffffff', 'ffffff', 'ffffff', '000', '01717', '01f1f', '02727', '0332f', '73b37', '74343', 'b4f4b', '135b53', '1b6b5f', '277767', '378773', '4b9b7b', '63af87', '7bc397', '97d7ab', 'bbebc3', '9f674b', 'a36b4f', 'ab7357', 'af7b5b', 'b78363', 'bb8b67', 'c3936f', 'cb9b77', 'cfa37f', 'd3af87', 'dbbf93', 'e3cb9f', 'e7d7ab', 'efe3b3', 'f7efc3', 'fffbcf', '7b17', 'b1327', 'f2337', '17334b', '1b3f57', '1b4b67', '1f5777', '236787', '237797', '2787a7', '3b8fb3', '4f9bbf', '67a7cb', '83b7d7', '9fc7e3', 'bfdbef', '2f0b', '3f013', '53017', '6b71b', '7b723', '83171f', '93727', 'b3033', 'cb037', 'e303f', 'ef273f', 'ff1f43', 'ff3f63', 'e76f7f', 'e79397', 'e7b7b7', '3fff', '571713', '732717', '872f1f', '973b27', 'a73b2b', 'b3472b', 'c74b2f', 'db633f', 'ef7b53', 'ff9367', 'f3ab7f', 'ebbb93', 'f7cf97', 'f7dbb7', 'fbebd7', '71bb', 'b27f', '133717', '1b471f', '23532b', '2b6333', '37733f', '437f4b', '4f8f57', '5b9f63', '67ab6f', '77bb7f', '87cb8f', '9bd79f', 'abe7af', 'bff7c3', '2b177', '371fb', '4327f', '532f13', '5f3717', '6f431f', '7b4b27', '8b572f', '935f37', '9b6b43', 'a37753', 'ab835f', 'b38f6f', 'bf9777', 'cb9f7f', 'd7ab8b', '4f371b', '5b431f', '6f4b1b', '7f5b23', '936b33', 'ab7b37', 'c38b3f', 'd3974b', 'e3a34f', 'f3af53', 'f7bb57', 'fbcf63', 'ffe377', 'fbef8f', 'fbf7ab', 'fbf7cb', '71f27', 'b2b37', '133b47', '1f4b57', '2b5b6b', '336773', '27737b', '1b837f', 'f8f8f', 'f9f9b', '13abab', '37b3b3', '4fc3c3', '6fd7d7', '93ebeb', 'abffff', '172f2b', '232f33', '1f3737', '27373b', '2b3f43', '2f4347', '374b4b', '3b4f53', '475f63', '536f73', '637f87', '678b8f', '779fa3', '8bb3b7', 'a3c7cb', 'bbdfe3', 'f13f', '171f17', '232f23', '2f3b2b', '3b4b33', '4b573b', '576743', '67734b', '778353', '878f5f', '979b6b', 'a7a77b', 'b7b78b', 'cbcb97', 'dbdba7', 'd7e7af', '3b2b37', '4b3743', '5b4753', '6b5b63', '776b73', '877f83', '93878b', '9f8f97', 'ab97a7', 'b7a3af', 'c3b3bf', 'cbbbc3', 'd3bfc7', 'dbc7c7', 'e3d3cf', 'ebdfd7', '57713', '6fb1f', '8b132f', 'a71f43', 'ab334f', 'bb4b67', 'd35377', 'df5783', 'eb5f87', 'fb6797', 'ff77ab', 'ff87b7', 'ff93cf', 'ff9fe3', 'ffabf3', 'ffbfe7', '2f2f2b', '3b3b37', '4b4b43', '575753', '63635f', '73736b', '7f7f7b', '8f8f87', '9b9b97', 'ababa3', 'b7b7b3', 'c7c7c3', 'd3d3cf', 'e3e3df', 'efefef', 'ffffff'];

describe('testing ress.hqr', function () {
    let lim = new LIM('./tests/ress.hqr');

    it('should all entries be loaded', function () {
        let allEntriesLoaded = true;
        lim.loadAllEntries();
        lim.entries.forEach(function (entry) {
            if (!entry.isLoaded || entry.error !== '') {
                allEntriesLoaded = false;
            }
        });
        expect(allEntriesLoaded).to.be.a.true;
    });

    it('check Main LBA palette', function () {
        expect(lim.LoadPalette(lim.entries[0].data).equals(MainLBAPalette)).to.be.a.true;
    });
});

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length !== array.length)
        return false;
    let index = 0,
        length = this.length;

    for (index; index < length; index++) {
        if ((this[index] instanceof Array && array[index] instanceof Array) && (!this[index].equals(array[index]))) {
            return false;
        } else if (this[index] !== array[index]) {
            return false;
        }
    }
    return true;
};