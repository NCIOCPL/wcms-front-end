import { expect, assert } from 'chai';

import { DiseaseResult } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

describe('Services.ClinicalTrials.Model.DiseaseResult', () => {

    describe('fromJSON', () => {

        it('Should deserialize a string', () => {
            let s: string = `
                {
                    "name": "Breast Cancer",
                    "parent_disease_id": null,
                    "codes": ["C12345"],
                    "menu": "disease"
                }        
            `;

            let expected: DiseaseResult = new DiseaseResult();
            expected.name = 'Breast Cancer';
            expected.parentDiseaseID = null;
            expected.codes = [ "C12345" ];
            expected.menu = "disease";

            let actual: DiseaseResult = DiseaseResult.fromJSON(s);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });

        it('Should deserialize an object', () => {
            let obj:any =
            {
                "name": "Breast Cancer",
                "parent_disease_id": null,
                "codes": ["C12345"],
                "menu": "disease"
            };

            let expected: DiseaseResult = new DiseaseResult();
            expected.name = 'Breast Cancer';
            expected.parentDiseaseID = null;
            expected.codes = [ "C12345" ];
            expected.menu = "disease";

            let actual: DiseaseResult = DiseaseResult.fromJSON(obj);

            //Deep Equal because they are class instances
            expect(actual).to.deep.eq(expected);
        });
        
    });
});