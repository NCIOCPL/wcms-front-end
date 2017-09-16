import { expect, assert } from 'chai';

import { InterventionResult, InterventionResults } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

describe('Services.ClinicalTrials.Model.InterventionResults', () => {


    describe('fromJSON', () => {

        it('Should deserialize a string', () => {
            let s: string = `
                {
                    "total": 500,
                    "terms": [
                        {
                            "name": "Trastuzumab",
                            "category": "agent",
                            "codes": ["C12345"],
                            "type": "Biologic / Vaccine",
                            "synonyms": ["Herceptin"]
                        }
                    ]
                }
            `;

            let expected: InterventionResults = new InterventionResults();
            let expectedTerm: InterventionResult = new InterventionResult();

            expectedTerm.name = 'Trastuzumab';
            expectedTerm.category = 'agent';
            expectedTerm.type = "Biologic / Vaccine";
            expectedTerm.codes = [ "C12345" ];
            expectedTerm.synonyms = [ "Herceptin" ];

            expected.total = 500;
            expected.terms = <Array<InterventionResult>>[expectedTerm];

            let actual: InterventionResults = InterventionResults.fromJSON(s);

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
                        "name": "Trastuzumab",
                        "category": "agent",
                        "codes": ["C12345"],
                        "type": "Biologic / Vaccine",
                        "synonyms": ["Herceptin"]
                    }
                ]
            };

            let expected: InterventionResults = new InterventionResults();
            let expectedTerm: InterventionResult = new InterventionResult();

            expectedTerm.name = 'Trastuzumab';
            expectedTerm.category = 'agent';
            expectedTerm.type = "Biologic / Vaccine";
            expectedTerm.codes = [ "C12345" ];
            expectedTerm.synonyms = [ "Herceptin" ];

            expected.total = 500;
            expected.terms = <Array<InterventionResult>>[expectedTerm];

            let actual: InterventionResults = InterventionResults.fromJSON(obj);

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

            let expected: InterventionResults = new InterventionResults();
            let expectedTerm: InterventionResult = new InterventionResult();

            expected.total = 0;
            expected.terms = <Array<InterventionResult>>[];

            let actual: InterventionResults = InterventionResults.fromJSON(s);

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

            let expected: InterventionResults = new InterventionResults();
            let expectedTerm: InterventionResult = new InterventionResult();

            expected.total = 0;
            expected.terms = <Array<InterventionResult>>[];

            let actual: InterventionResults = InterventionResults.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

    })

});