import {
    censorWord,
    censorText,
} from '../index';

describe('EXAMPLE library', () => {
    describe('censorWord()', () => {
        it('should censor the word \'cancer\'', () => {
            const expected = '******';
            const actual = censorWord('cancer')
            expect(actual).toBe(expected);
        })
        it('should be case-insensitive', () => {
            const expected = '******';
            const actuals = ['Cancer', 'CANCER', 'cAnCeR'].map(word => censorWord(word));
            actuals.forEach(actual => {
                expect(actual).toBe(expected);
            })
        })
        it('should handle multiple occurences of \'cancer\' in one string', () => {
            const string = 'How can cancer be so cancery?';
            const expected = 'How can ****** be so ******y?';
            const actual = censorWord(string);
            expect(actual).toBe(expected);
        })
    })
})