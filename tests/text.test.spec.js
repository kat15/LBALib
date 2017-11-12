fs = require('fs');
const {Text} = require('../lib/Text');
const expect = require('chai').expect;

describe('testing text.hqr', function () {
    let hqr = new Text('./tests/text.hqr');

    it('check first text in second record', function () {
        let Normal = hqr.loadEntry(2, 1);
        expect(Normal === 'Normal').to.be.a.true;
    });

    it('check second text in second record', function () {
        let Athletic = hqr.loadEntry(2, 2);
        expect(Athletic === 'Athletic').to.be.a.true;
    });
});