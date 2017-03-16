
require('babel-register')(); 

var chai = require('chai');
chai.use(require('chai-as-promised'));

var chaiEnzyme = require('chai-enzyme');
chai.use(chaiEnzyme());
global.expect = chai.expect;