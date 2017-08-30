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

});
