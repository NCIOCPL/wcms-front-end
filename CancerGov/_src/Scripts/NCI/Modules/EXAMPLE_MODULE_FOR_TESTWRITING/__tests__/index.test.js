import {
    censorWord,
    censorText,
    default as initialize,
} from '../index';

describe('EXAMPLE library', () => {
    
    // NOTE: censorWord is a pure function to handle strings. String -> String.
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

    // NOTE: censorText is impure (it returns the same input but with changes) and handles DOM nodes.
    // However, because we return the input (even though it is unnecessary for the function to be effective),
    // we can test the functions behaviour without needing to interact with the DOM.
    describe('censorText()', () => {
        // We can test this with mock DOM nodes that mimic only the required functionality...
        it('should censor the innerText of given DOM nodes - version 1', () => {
            const array = [
                { innerText: 'How can cancer be so cancery?'},
                { innerText: "It's cancerific!"},
            ];
            const expected = [
                { innerText: 'How can ****** be so ******y?'},
                { innerText: "It's ******ific!"},
            ];
            const actual = censorText(array);

            // We use toEqual for testing Objects that have different references but the same contents
            expect(actual).toEqual(expected);
        })
        
        // ...Or with real ones
            it('should censor the innerText of given DOM nodes - version 2', () => {
                const baseText = ['How can cancer be so cancery?', "It's cancerific!"];
                const array = baseText.map(text => {
                    const node = document.createElement('h3');
                    node.innerText = text;
                    return node;
                })
                const expected = ['How can ****** be so ******y?', "It's ******ific!"];

                const actuals = censorText(array);
                actuals.forEach((actual, index) => {
                    // But we can use toBe for primitives like strings, numbers, and booleans
                    expect(actual.innerText).toBe(expected[index]);
                })
            })
    })

    // NOTE: initialize is impure, takes no input, and returns no output, so it is the least ideal
    // type of function to write a test for. In order to determine if it works, we need to create
    // a DOM for the function to interact with and then test the DOM to see if it has changed as expected.

})