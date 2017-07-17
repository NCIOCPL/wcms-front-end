import { MockServiceTermTest } from './mock-service-term-test';
import { TermResults, TermResult } from '../../../../_src/Scripts/NCI/Services/clinical-trials';

export class ServiceTermTest_TypeOnly implements MockServiceTermTest {
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