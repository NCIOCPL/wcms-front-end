import { expect, assert } from 'chai';
import * as TypeMoq from 'typemoq';

import { CTAPIConnection, TermResults } from '../../../../_src/Scripts/NCI/Services/clinical-trials';
import { ClinicalTrialsServiceV1Impl } from '../../../../_src/Scripts/NCI/Services/clinical-trials/v1';

import { ServiceTermTest_TypeOnly } from '../data';

class MockCTAPIConnection implements CTAPIConnection {

    constructor() {}

    getRequest(path:string, params: any): Promise<any> {
        return Promise.resolve({
            total: 0,
            terms: []
        });
    }

}

function getParameterTestMock(
    checkParamCallback: (path: string, params:any) => void
) : TypeMoq.IMock<CTAPIConnection> {
    //Create the fake interface implementation.
    let mock: TypeMoq.IMock<CTAPIConnection> = TypeMoq.Mock.ofType(MockCTAPIConnection);

    //Setup the getTerms method to say if any string, etc is passed in then... 
    mock.setup(m => m.getRequest(
        TypeMoq.It.isAnyString(),
        TypeMoq.It.isAny(), //Undefined is not a string, so must allow any
    ))
    //... then run this callback intercepting the request...
    .callback(checkParamCallback)
    // ...finally returning a promise just like a real implementation of a CTAPIConnection would.
    .returns((path: string, params:any) : Promise<any> => Promise.resolve({
        total: 0,
        terms: []
    }));

    return mock;
}


describe('Services.ClinicalTrials.ClinicalTrialsService', () => {

    describe('getTerms', () => {

        it('should make correct request with default parameters', () => {
            
            let mock: TypeMoq.IMock<CTAPIConnection> = getParameterTestMock(
                (path: string, params:any) => {

                    expect(path).to.be.eq('/terms');

                    expect(params).to.be.deep.eq({
                        term_type: "term_type",
                        size: 10,
                        from: 0
                    });
                }
            );
            let svc = new ClinicalTrialsServiceV1Impl(mock.object);

            return svc.getTerms('term_type');
        });

        it('should make correct request with additional params', () => {
            
            let mock: TypeMoq.IMock<CTAPIConnection> = getParameterTestMock(
                (path: string, params:any) => {
                    expect(path).to.be.eq('/terms');

                    expect(params).to.be.deep.eq({
                        term_type: "term_type",
                        term: "begin",
                        size: 10,
                        from: 0
                    });                    
                }
            );
            let svc = new ClinicalTrialsServiceV1Impl(mock.object);

            return svc.getTerms('term_type', { 
                term: 'begin'
            });
        });

        it('should make correct request with addition params and pager', () => {
            
            let mock: TypeMoq.IMock<CTAPIConnection> = getParameterTestMock(
                (path: string, params:any) => {
                    expect(path).to.be.eq('/terms');

                    expect(params).to.be.deep.eq({
                        term_type: "term_type",
                        term: "begin",
                        size: 20,
                        from: 40
                    });                    
                }
            );
            let svc = new ClinicalTrialsServiceV1Impl(mock.object);

            return svc.getTerms(
                'term_type', 
                {
                    term: 'begin'
                },
                20, 
                40
            );
        });

        it('should handle JSON response', () => {

            expect(true).to.be.true;            
        })
    });

    describe('getInterventions', () => {
        it('should have unit tests', () => {
           expect(true).to.be.true;
        });
    });
});