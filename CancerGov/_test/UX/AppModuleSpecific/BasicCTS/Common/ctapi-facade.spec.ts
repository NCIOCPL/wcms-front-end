import { expect, assert } from 'chai';
import * as TypeMoq from 'typemoq';

import { ClinicalTrialsService, TermResults, DiseaseResults, TermResult, InterventionResults, InterventionResult } from '../../../../../_src/Scripts/NCI/Services/clinical-trials';
import { CTAPIFacade } from '../../../../../_src/Scripts/NCI/UX/AppModuleSpecific/BasicCTS/Common/ctapi-facade';

const VIEWABLE_TRIALS:string[] = [
    "Active",
    "Approved", 
    "Enrolling by Invitation",
    "In Review",
    "Temporarily Closed to Accrual",
    "Temporarily Closed to Accrual and Intervention"
];

const COUNTRY_KEY:string = "sites.org_country";
const HOSPITAL_KEY:string = "sites.org_name";
const TRIAL_INVESTIGATORS_KEY:string = "principal_investigator";
const LEAD_ORG_KEY:string = "lead_org";

/**
 * Mock Service for tests
 */
class MockCTService implements ClinicalTrialsService {

    constructor() {}

    getTerms(termType: string, additionalParams?:any, size?:number, from?:number): Promise<TermResults> {
        let res:TermResults = new TermResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }

    getInterventions(category?: string|string[], name?: string, size?:number, additionalParams?:any, sort?:string, order?:string): Promise<InterventionResults> {
        let res:InterventionResults = new InterventionResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }
    getDiseases(menuType:string|string[], diseaseAncestorIDs?:string | string[], additionalParams?:any): Promise<DiseaseResults> {
        let res:DiseaseResults = new DiseaseResults();
        res.total = 0;
        res.terms = [];
        return Promise.resolve(res);
    }

}

/**
 * Gets a Mock for testing parameters - Could also be used for other testing.
 * @param checkParamCallback A callback to inspect the parameters
 * @param results A TermResults object to return
 */
function getParameterTestMock(
    checkParamCallback: (termType: string, additionalParams?:any, size?:number, from?:number) => void,
    results:TermResults
) : TypeMoq.IMock<ClinicalTrialsService> {
    //Create the fake interface implementation.
    let mock: TypeMoq.IMock<ClinicalTrialsService> = TypeMoq.Mock.ofType(MockCTService);

    //Setup the getTerms method to say if any string, etc is passed in then... 
    mock.setup(m => m.getTerms(
        TypeMoq.It.isAnyString(),
        TypeMoq.It.isAny(), //Undefined is not a string, so must allow any
        TypeMoq.It.isAny(), //Can be a number or can be undefined
        TypeMoq.It.isAny()  //Can be a number or can be undefined
    ))
    //... then run this callback intercepting the request...
    .callback(checkParamCallback)
    // ...finally returning a promise just like a real implementation of a CTAPIConnection would.
    .returns(() => Promise.resolve(results));

    return mock;
}

/**
 * Gets a Term Result with properties filled in.
 */
function getTermResult(termKey:string, termType:string, term:string, count:number, codes:string[]): TermResult {
    let rtn:TermResult = new TermResult();

    rtn.termKey = termKey;
    rtn.termType = termType;
    rtn.term = term;
    rtn.count = count;
    rtn.codes = codes;

    return rtn;
}

describe('UX.AppModuleSpecific.BasicCTS.Common.CTAPIFacade', () => {

    describe('getCountries', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq(COUNTRY_KEY);
                    expect(size).to.be.eq(100);
                    expect(additionalParams).to.be.deep.eq({
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            // TODO: change 'let' to return   
            let countries:Promise<string[]> = facade.getCountries();
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 2;
            
            res.terms.push(getTermResult(
                "argentina",
                COUNTRY_KEY,
                "Argentina",
                2,
                undefined
            ));

            res.terms.push(getTermResult(
                "australia",
                COUNTRY_KEY,
                "Australia",
                47,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq("sites.org_country");
                    expect(size).to.be.eq(100);
                    expect(additionalParams).to.eql({
                        sort: "term",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.getCountries()
                    .then((actual:string[]) => {
                        expect(actual).to.eql(["Argentina", "Australia"]);
                    });
        });

    });

    describe('searchHospital', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq(HOSPITAL_KEY);
                    expect(size).to.be.eq(10);
                    expect(additionalParams).to.be.deep.eq({
                        term: 'mayo',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchHospital('mayo'); 
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 1;
            
            res.terms.push(getTermResult(
                "mayo clinic in arizona",
                HOSPITAL_KEY,
                "Mayo Clinic in Arizona",
                240,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq("sites.org_name");
                    expect(size).to.be.eq(10);
                    expect(additionalParams).to.eql({
                        sort: "term",
                        term: "mayo clinic in arizona",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchHospital('mayo clinic in arizona')
                    .then((actual:TermResult[]) => {
                        expect(actual).to.eql(res.terms);
                    });
        });
    });

    describe('searchDrugs', () => {
        // Placeholder unit tests until endpoint is working
        it('should make the correct request to the ClinicalTrialsService', () => {
                expect('istanbul').to.be.eq('constantinople');
        });

        it('should return the correct results based on response', () => {
                expect('new york').to.be.eq('new amsterdam');
        });

    });

    describe('searchOtherInterventions', () => {
        // Placeholder unit tests until endpoint is working
        it('should make the correct request to the ClinicalTrialsService', () => {
                expect(1).to.be.eq(2);
        });

        it('should return the correct results based on response', () => {
                expect(3).to.be.eq(4);
        });

    });

    describe('searchDiseases', () => {
        // Placeholder unit tests until endpoint is working
        it('should make the correct request to the ClinicalTrialsService', () => {
                expect(5).to.be.eq(6);
        });

        it('should return the correct results based on response', () => {
                expect(7).to.be.eq(8);
        });

    });    

    describe('searchTrialInvestigators', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq(TRIAL_INVESTIGATORS_KEY);
                    expect(size).to.be.eq(10);
                    expect(additionalParams).to.be.deep.eq({
                        term: 'david',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchTrialInvestigators('david'); 
        });

        it('should return the correct results based on response', () => {

            let res:TermResults = new TermResults();
            res.total = 1;
            
            res.terms.push(getTermResult(
                "david",
                TRIAL_INVESTIGATORS_KEY,
                "David Hui",
                8,
                undefined
            ));

            res.terms.push(getTermResult(
                "david",
                TRIAL_INVESTIGATORS_KEY,
                "David Eric Gerber",
                4,
                undefined
            ));

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq("principal_investigator");
                    expect(size).to.be.eq(10);
                    expect(additionalParams).to.eql({
                        sort: "term",
                        term: "david",
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            //Mocha will handle promises when they are returned.  So you can
            //run the assertions in a then.
            return facade.searchTrialInvestigators('david')
                    .then((actual:TermResult[]) => {
                        expect(actual).to.eql(res.terms);
                    });
        });

    });

    describe('searchLeadOrgs', () => {

        it('should make the correct request to the ClinicalTrialsService', () => {

            let res:TermResults = new TermResults();
            res.total = 0;
            res.terms = [];            

            let svcMock:TypeMoq.IMock<ClinicalTrialsService> = getParameterTestMock(
                (termType: string, additionalParams?:any, size?:number, from?:number) => {
                    //Callback for assetions.
                    expect(termType).to.be.eq(LEAD_ORG_KEY);
                    expect(size).to.be.eq(10);
                    expect(additionalParams).to.be.deep.eq({
                        term: 'mayo',
                        sort: 'term',
                        current_trial_statuses: VIEWABLE_TRIALS
                    });
                    expect(from).to.be.undefined;
                },
                res
            );

            let facade:CTAPIFacade = new CTAPIFacade(svcMock.object);

            return facade.searchLeadOrg('mayo'); 
        });

    });

});