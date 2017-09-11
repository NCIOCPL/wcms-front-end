import { expect, assert } from 'chai';

import { TermResult, TermResults } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

describe('Services.ClinicalTrials.Model.TermResults', () => {


    describe('fromJSON', () => {
        /**
         * Tests deserializing a term response string that has no thesarus codes
         */    
        it('Should deserialize a string', () => {
            let s: string = `
                {
                    "total": 500,
                    "terms": [
                        {
                            "term_key": "ii",
                            "term": "II",
                            "term_type": "phase.phase",
                            "current_trial_statuses": ["ACTIVE", "APPROVED", "CLOSED TO ACCRUAL", "COMPLETE", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "CLOSED TO ACCRUAL AND INTERVENTION", "IN REVIEW", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "ENROLLING BY INVITATION"],
                            "count": 2464,
                            "count_normalized": 1,
                            "score": 0
                        }
                    ]
                }
            `;

            let expected: TermResults = new TermResults();
            let expectedTerm: TermResult = new TermResult();

            expectedTerm.termKey = 'ii';
            expectedTerm.term = 'II';
            expectedTerm.termType = "phase.phase";
            expectedTerm.codes = new Array<string>();
            expectedTerm.count = 2464;

            expected.total = 500;
            expected.terms = <Array<TermResult>>[expectedTerm];

            let actual: TermResults = TermResults.fromJSON(s);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

        /**
         * Tests deserializing a term response string that has no thesarus codes
         */    
        it('Should map an object', () => {
            let obj: any = 
            {
                "total": 500,
                "terms": [
                    {
                        "term_key": "ii",
                        "term": "II",
                        "term_type": "phase.phase",
                        "current_trial_statuses": ["ACTIVE", "APPROVED", "CLOSED TO ACCRUAL", "COMPLETE", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "CLOSED TO ACCRUAL AND INTERVENTION", "IN REVIEW", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "ENROLLING BY INVITATION"],
                        "count": 2464,
                        "count_normalized": 1,
                        "score": 0
                    }
                ]
            };        

            let expected: TermResults = new TermResults();
            let expectedTerm: TermResult = new TermResult();

            expectedTerm.termKey = 'ii';
            expectedTerm.term = 'II';
            expectedTerm.termType = "phase.phase";
            expectedTerm.codes = new Array<string>();
            expectedTerm.count = 2464;

            expected.total = 500;
            expected.terms = <Array<TermResult>>[expectedTerm];

            let actual: TermResults = TermResults.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

        /**
         * Tests deserializing a term response string that has no thesarus codes
         */    
        it('Should deserialize and empty result', () => {
            let s: string = `
                {
                    "total": 0,
                    "terms": []
                }
            `;

            let expected: TermResults = new TermResults();
            let expectedTerm: TermResult = new TermResult();

            expected.total = 0;
            expected.terms = <Array<TermResult>>[];

            let actual: TermResults = TermResults.fromJSON(s);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

        /**
         * Tests deserializing a term response string that has no thesarus codes
         */    
        it('Should map an empty result', () => {
            let obj: any = 
            {
                "total": 0,
                "terms": []
            };

            let expected: TermResults = new TermResults();
            let expectedTerm: TermResult = new TermResult();

            expected.total = 0;
            expected.terms = <Array<TermResult>>[];

            let actual: TermResults = TermResults.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

    })

});