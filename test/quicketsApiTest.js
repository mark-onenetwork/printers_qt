var nock = require('nock');
var expect = require('chai').expect
var printToPrinter = require('../dist/printers_qt').printToPrinter;

const printer = {
  id: 1,
  description: 'TEST',
  server: {
    'host': 'http://cups-pdf.quicktravel.com.au',
    'api_key': '123456789',
  },
};

const page_format = {
  tickets: [],
  page_format: {
    length: 100,
    width: 200,
    margin: 2
  },
  base_url: '/'
};

describe('errors', () => {
  beforeEach(function() {
    nock('http://cups-pdf.quicktravel.com.au')
      .post('/print-tickets')
      .reply(500, {msg: 'Success'});
  });

  it ('should print to the printer', (done) => {
    printToPrinter(printer, page_format).catch(function(err) {
      expect(err.response.status).to.eq(500);
      done();
    });
  });
});

describe('printToPrinter', () => {
  beforeEach(function() {
    nock('http://cups-pdf.quicktravel.com.au')
      .post('/print-tickets')
      .reply(200, {msg: 'Success'});
  });

  it ('should print to the printer', (done) => {
    printToPrinter(printer, page_format).then(function(response) {
      expect(response).to.deep.equal({msg: 'Success'});
      done();
    });
  });
});
