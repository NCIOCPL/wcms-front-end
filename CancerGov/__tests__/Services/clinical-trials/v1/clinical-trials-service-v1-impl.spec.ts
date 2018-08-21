import * as TypeMoq from 'typemoq';

import { CTAPIConnection, TermResults, TermResult } from '../../../../_src/Scripts/NCI/Services/clinical-trials';
import { ClinicalTrialsServiceV1Impl } from '../../../../_src/Scripts/NCI/Services/clinical-trials/v1';

interface MockServiceTermTest {
    getExpected():TermResults;
    getJSON():any;
}
class ServiceTermTest_TypeOnly implements MockServiceTermTest {
    getExpected():TermResults {
        let rtn = new TermResults();

        rtn.total = 2;

        let term1 = new TermResult();
        term1.termKey = "ii";
        term1.term = "II";
        term1.termType = "phase.phase";
        term1.count = 2464
        rtn.terms.push(term1);

        let term2 = new TermResult();
        term2.termKey = "i";
        term2.term = "I";
        term2.termType = "phase.phase";
        term2.count = 1831
        rtn.terms.push(term2);

        return rtn;
    }

    getJSON():any {
        return {
            "total": 2,
            "terms": [{
                "term_key": "ii",
                "term": "II",
                "term_type": "phase.phase",
                "current_trial_statuses": ["ACTIVE", "APPROVED", "CLOSED TO ACCRUAL", "COMPLETE", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "CLOSED TO ACCRUAL AND INTERVENTION", "IN REVIEW", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "ENROLLING BY INVITATION"],
                "count": 2464,
                "count_normalized": 1,
                "score": 0
            }, {
                "term_key": "i",
                "term": "I",
                "term_type": "phase.phase",
                "current_trial_statuses": ["ACTIVE", "CLOSED TO ACCRUAL", "IN REVIEW", "COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL", "APPROVED", "ADMINISTRATIVELY COMPLETE", "TEMPORARILY CLOSED TO ACCRUAL AND INTERVENTION", "WITHDRAWN", "CLOSED TO ACCRUAL AND INTERVENTION", "ENROLLING BY INVITATION"],
                "count": 1831,
                "count_normalized": 0.8016558753309245,
                "score": 0
            }]
        };
    }
}
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

                    expect(path).toBe('/terms');

                    expect(params).toEqual({
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
                    expect(path).toBe('/terms');

                    expect(params).toEqual({
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
                    expect(path).toBe('/terms');

                    expect(params).toEqual({
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

            expect(true).toBe(true);            
        })
    });

    describe('getInterventions', () => {
        it('should have unit tests', () => {
           expect(true).toBe(true);
        });
    });
});