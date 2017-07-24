import { expect, assert } from 'chai';

import { DiseaseResult, DiseaseResults } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

describe('Services.ClinicalTrials.Model.DiseaseResults', () => {


    describe('fromJSON', () => {

        it('Should deserialize a string', () => {
            let s: string = `
                {
                    "total": 500,
                    "terms": [
                        {
                            "name": "Breast Cancer",
                            "parent_disease_id": null,
                            "codes": ["C12345"],
                            "menu": "disease"
                        }
                    ]
                }
            `;

            let expected: DiseaseResults = new DiseaseResults();
            let expectedTerm: DiseaseResult = new DiseaseResult();

            expectedTerm.name = 'Breast Cancer';
            expectedTerm.parentDiseaseID = null;
            expectedTerm.codes = [ "C12345" ];
            expectedTerm.menu = "disease";

            expected.total = 500;
            expected.terms = <Array<DiseaseResult>>[expectedTerm];

            let actual: DiseaseResults = DiseaseResults.fromJSON(s);

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
                            "name": "Breast Cancer",
                            "parent_disease_id": null,
                            "codes": ["C12345"],
                            "menu": "disease"
                        }
                    ]
                }
            ;

            let expected: DiseaseResults = new DiseaseResults();
            let expectedTerm: DiseaseResult = new DiseaseResult();

            expectedTerm.name = 'Breast Cancer';
            expectedTerm.parentDiseaseID = null;
            expectedTerm.codes = [ "C12345" ];
            expectedTerm.menu = "disease";

            expected.total = 500;
            expected.terms = <Array<DiseaseResult>>[expectedTerm];

            let actual: DiseaseResults = DiseaseResults.fromJSON(obj);

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

            let expected: DiseaseResults = new DiseaseResults();
            let expectedTerm: DiseaseResult = new DiseaseResult();

            expected.total = 0;
            expected.terms = <Array<DiseaseResult>>[];

            let actual: DiseaseResults = DiseaseResults.fromJSON(s);

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

            let expected: DiseaseResults = new DiseaseResults();
            let expectedTerm: DiseaseResult = new DiseaseResult();

            expected.total = 0;
            expected.terms = <Array<DiseaseResult>>[];

            let actual: DiseaseResults = DiseaseResults.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

    })

});