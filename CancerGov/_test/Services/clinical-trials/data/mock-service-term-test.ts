import { TermResults } from '../../../../_src/Scripts/NCI/Services/clinical-trials';


export interface MockServiceTermTest {
    getExpected():TermResults;
    getJSON():any;
}