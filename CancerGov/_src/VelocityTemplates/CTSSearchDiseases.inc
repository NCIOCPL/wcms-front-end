        <fieldset id="fieldset--type">
            <div class="adv-fieldset-header">
                <h4>CANCER TYPE
                    <a href="/about-cancer/treatment/clinical-trials/search/help#1" class="text-icon-help right" target="_blank" aria-label="Help">?</a>
                </h4>
            </div>
            <div class="adv-fieldset-body">
                <div class="row">
                    <div>You must first select a cancer type. Based on that selection, you will then be able to choose additional options, if applicable, from the subsequent fields.</div>
                </div>
                <div class="row">
                    <div>
                    <label>Primary Type/Condition</label>
                    </div>
                </div>
                <div class="row">
                    <select id="ct-select" class="no-auto-jqueryui" name="t" style="width:97%">
                        <option value="">All</option>
                    </select>
                </div>
                <div id="other-diseases">
                    <div class="row">
                        <div>
                        <label>Sub-type</label>
                        </div>
                    </div>
                    <div class="row">
                        <select id="st-multiselect" name="st" multiple data-placeholder="Select a sub-type" placeholder="Select cancer type first" style="width:97%"></select>
                    </div>
                    <div class="row">
                        <div>
                        <label>Stage</label>
                        </div>
                    </div>
                    <div class="row">
                        <select id="stg-multiselect" name="stg" multiple data-placeholder="Select a stage" placeholder="Select cancer type or sub-type first" style="width:97%"></select>
                    </div>
<!--(bake-start _if="findings")-->
                    <div class="row">
                        <div>
                        <label>Side Effects / Biomarkers / Participant Attributes</label>
                        </div>
                    </div>
                    <div class="row">
                        <select id="fin-multiselect" name="fin" multiple data-placeholder="Examples: Nausea, BRCA1" placeholder="Select cancer type or sub-type first" style="width:97%"></select>
                    </div>
<!--(bake-end)-->                    
                </div>
            </div>
        </fieldset>