<!--(bake Includes/TemplateIntro.inc template_name="NVCGCancerTypeHomePageTemplate.aspx")-->

            <!-- slots -->
            <!-- Breadcrumb slot -->
            <div class="row collapse">
                <NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
                <!--(bake Includes/PageOptions.inc resize="true" css-class="medium-4 columns cthp-desktop page-options")-->
            </div>
            <!-- slots -->
            <!-- Body slot -->
            <NCI:TemplateSlot ID="nvcgSlCTHPIntro" runat="server" />
            <!-- Does this contain intro text, OnThisPage, article image, sections, & endnotes? -->
            <div class="cthp-content-bottom-slot">
                <div class="row">
                    <div class="large-12 columns guide">
                        <h3><NCI:CDEField scope="Page" fieldName="Tagline" runat="server" /></h3>
                    </div>
                </div>
                <NCI:TemplateSlot ID="nvcgSlCTHPCards" AdditionalSnippetClasses="large-6 columns cthpCard" runat="server" />
            </div>
<!--(bake Includes/TemplateEnding.inc)-->