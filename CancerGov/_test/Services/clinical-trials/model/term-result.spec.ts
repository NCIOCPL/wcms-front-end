import { expect, assert } from 'chai';

import { TermResult } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

describe('Services.ClinicalTrials.Model.TermResult', () => {

    describe('fromJSON', () => {

        it('Should deserialize a string without codes', () => {
            let s: string = `
                {
                    "term_key": "ii",
                    "term": "II",
                    "term_type": "phase.phase",
                    "current_trial_statuses": ["ACTIVE", "APPROVED", "CLOSED TO ACCRUAL", "COMPLETE", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "CLOSED TO ACCRUAL AND INTERVENTION", "IN REVIEW", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "ENROLLING BY INVITATION"],
                    "count": 2464,
                    "count_normalized": 1,
                    "score": 0
                }        
            `;

            let expected: TermResult = new TermResult();
            expected.termKey = 'ii';
            expected.term = 'II';
            expected.termType = "phase.phase";
            expected.codes = new Array<string>();
            expected.count = 2464;

            let actual: TermResult = TermResult.fromJSON(s);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

        /**
         * Tests deserializing a term response string that has thesarus codes
         */    
        it('Should deserialize a string with codes', () => {
            let s: string = `
                {
                    "term_key": "primary_peritoneal_high_grade_serous_adenocarcinoma",
                    "term": "Primary Peritoneal High Grade Serous Adenocarcinoma",
                    "term_type": "_diseases",
                    "current_trial_statuses": [
                        "ACTIVE",
                        "COMPLETE"
                    ],
                    "count": 8,
                    "count_normalized": 0.002953317389347421,
                    "codes": [
                        "C126353"
                    ],
                    "score": 0
                }        
            `;

            let expected: TermResult = new TermResult();
            expected.termKey = 'primary_peritoneal_high_grade_serous_adenocarcinoma';
            expected.term = 'Primary Peritoneal High Grade Serous Adenocarcinoma';
            expected.termType = "_diseases";
            expected.codes = <Array<string>> [ "C126353" ];
            expected.count = 8;

            let actual: TermResult = TermResult.fromJSON(s);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });
        
        /**
         * Tests mapping a term response object that has no thesaurus codes
         */
        it('Should map an object without codes', () => {
            let obj: any = {
                    "term_key": "ii",
                    "term": "II",
                    "term_type": "phase.phase",
                    "current_trial_statuses": ["ACTIVE", "APPROVED", "CLOSED TO ACCRUAL", "COMPLETE", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "CLOSED TO ACCRUAL AND INTERVENTION", "IN REVIEW", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "ENROLLING BY INVITATION"],
                    "count": 2464,
                    "count_normalized": 1,
                    "score": 0
            };

            let expected: TermResult = new TermResult();
            expected.termKey = 'ii';
            expected.term = 'II';
            expected.termType = "phase.phase";
            expected.codes = new Array<string>();
            expected.count = 2464;

            let actual: TermResult = TermResult.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);

        });
        
        /**
         * Tests mapping a term response object that has thesarus codes
         */
        it('Should map an object with codes', () => {
            let obj: any = {
                "term_key": "primary_peritoneal_high_grade_serous_adenocarcinoma",
                "term": "Primary Peritoneal High Grade Serous Adenocarcinoma",
                "term_type": "_diseases",
                "current_trial_statuses": [
                    "ACTIVE",
                    "COMPLETE"
                ],
                "count": 8,
                "count_normalized": 0.002953317389347421,
                "codes": [
                    "C126353"
                ],
                "score": 0
            };

            let expected: TermResult = new TermResult();
            expected.termKey = 'primary_peritoneal_high_grade_serous_adenocarcinoma';
            expected.term = 'Primary Peritoneal High Grade Serous Adenocarcinoma';
            expected.termType = "_diseases";
            expected.codes = <Array<string>> [ "C126353" ];
            expected.count = 8;

            let actual: TermResult = TermResult.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

    });
});