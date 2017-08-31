import { expect, assert } from 'chai';
import { CDERuntimeConfig, CDEConfiguration } from '../../../_src/Scripts/NCI/Services/cde-configuration-service';

describe('Services.CDEConfigurationService.CDERuntimeConfig', () => {
  it('should return defaults when no config loaded', () => {
    
    let config:CDERuntimeConfig = new CDERuntimeConfig();
    let actual:CDEConfiguration = config.getConfiguration();
    let expected:CDEConfiguration = <CDEConfiguration> {
      ClinicalTrialsAPIServer: "clinicaltrialsapi.cancer.gov"
    };

    expect(actual).to.eql(expected);
  });

  it('should override defaults', () => {
    
    // Figure out how to add CDE config object to global 
    // Fake hostname - use sinon or pushstate?

    // Create new config object
    let config:CDERuntimeConfig = new CDERuntimeConfig();

    // Get the configuration (either default or overrides if they exist)
    let actual:CDEConfiguration = config.getConfiguration();

    // Set value to compare against
    let expected:CDEConfiguration = <CDEConfiguration> {
      ClinicalTrialsAPIServer: "clinicaltrialsapi.cancer.gov"
    };

    expect(actual).to.eql(expected);
  });

});
