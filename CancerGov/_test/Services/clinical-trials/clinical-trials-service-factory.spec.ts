import { expect, assert } from 'chai';
import * as TypeMoq from 'typemoq';

import { ClinicalTrialsServiceFactory, ClinicalTrialsService } from '../../../_src/Scripts/NCI/Services/clinical-trials';
import { ClinicalTrialsServiceV1Impl, CTAPIConnectionV1Impl } from '../../../_src/Scripts/NCI/Services/clinical-trials/v1';

describe('Services.ClinicalTrials.ClinicalTrialsServiceFactory', () => {

    describe('create', () => {

        it('should return v1 instance with correct name', () => {
            let svc:ClinicalTrialsService = ClinicalTrialsServiceFactory.create('myhostname');

            //Make sure it returned a v1 impl
            expect(svc instanceof ClinicalTrialsServiceV1Impl).to.be.true;
            
            //TODO: Figure out if we can get to the CTAPIConnectionV1Impl object, or inspect the constructor params.
        });

        it('should return error for unsupported version', () => {
            expect(()=> {
                let svc:ClinicalTrialsService = ClinicalTrialsServiceFactory.create('myhostname', 'vX');
            }).to.throw('You must specify a valid Clinical Trials Service version');            
        });
        
    });
});