fs = require('fs');
const {HQR} = require('../lib/HQR');
const expect = require('chai').expect

describe('testing text.hqr', function () {
    let hqr = new HQR("./tests/text.hqr")

    it('should all entries be loaded', function () {
        let allEntriesLoaded = true;
        hqr.loadAllEntries();
        hqr.entries.forEach(function (entry) {
            if (!entry.isLoaded || entry.error !== '') {
                allEntriesLoaded = false;
            }
        });
        expect(allEntriesLoaded).to.be.a.true;
    });

    it('test first record (uncompressed)', function () {
        checkRecord(1);
    });

    it('test second record (compressed)', function () {
        checkRecord(2);
    });

    function checkRecord(record) {
        let testFile = fs.readFileSync('./tests/text00' + record);
        expect(testFile.compare(hqr.entries[record - 1].data) === 0).to.be.a.true;
    };
});