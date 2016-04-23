if (typeof process !== 'undefined') {
  require('amd-loader');
  global.ace = { define: global.define };
}

const assert = require('chai').assert;
const M = require('../../../../src/ace/ext/antlr4/tokenizer');
const SingleTokenLexer = require('../../../../src/parser/SingleToken/SingleTokenLexer').SingleTokenLexer;

module.exports = {
  'tokenizer': {
    'Antlr4Tokenizer': {
      'is constructor': function () {
        new M.Antlr4Tokenizer();
      },
      'getLineTokens': {
        'gets empty token list of empty line': function () {
          var tokenizer = new M.Antlr4Tokenizer(SingleTokenLexer);
          assert.deepEqual(
            tokenizer.getLineTokens(''),
            {
              tokens: [],
              state: 'start'
            }
          );
        },
        'gets single token': function () {
          var tokenizer = new M.Antlr4Tokenizer(SingleTokenLexer);
          assert.deepEqual(
            tokenizer.getLineTokens('token'),
            {
              tokens: [
                { type: 'text', value: 'token' }
              ],
              state: 'start'
            }
          );
        },
        'get multiple tokens': function () {
          var tokenizer = new M.Antlr4Tokenizer(SingleTokenLexer);
          assert.deepEqual(
            tokenizer.getLineTokens('tokentoken'),
            {
              tokens: [
                { type: 'text', value: 'token' },
                { type: 'text', value: 'token' }
              ],
              state: 'start'
            }
          );
        }
      }
    },
    mapCommonTokenToAceToken: {
      'should map CommonToken to ACE token format': function () {
        var commonToken = {
          type: 1,
          text: 'token'
        };
        assert.deepEqual(
          M.mapCommonTokenToAceToken(commonToken),
          {
            type: 'text',
            value: 'token'
          }
        );
      }
    }
  }
};