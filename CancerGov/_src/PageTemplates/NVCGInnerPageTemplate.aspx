<!--(bake Includes/TemplateIntro.inc template_name="NVCGInnerPageTemplate.aspx")-->

            <div class="row general-page-body-container collapse">
                <div class="large-12 columns">
                    <div class="row">
                        <NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
                    </div> <!-- END "row" -->
                </div> <!-- END "large-12 columns" -->
                <div class="row">
                    <!--    SECTION NAVIGATION -->
                    <NCI:TemplateSlot ID="nvcgSlSectionNav" CssClass="medium-3 columns local-navigation" runat="server" />
                    <!--    END SECTION NAVIGATION -->
                    <div class="medium-9 columns contentzone" id="main" tabindex="0" role="main">
                        <!-- ********************************* BEGIN Page Content ********************************** -->
                        <article>
                            <!--(bake Includes/PublicArchiveBanner.inc)-->

                            <!-- BANNER SLOT -->
                            <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"
                                CssClass="row banner-slot"
                                AdditionalSnippetClasses="large-12 columns body-banner" />
                            <!-- END BANNER SLOT -->
                            <!--(bake Includes/PageTitle.inc)-->

                            <!--(bake Includes/PageOptions-Inner.inc)-->

                            <NCI:TemplateSlot ID="cgvBody" runat="server" />
                            <!--(bake includes/ArticleFooter.inc citations="true" related_resources="true" pagination="true" comments="true")-->
                        </article>
                        <!-- ********************************* END Page Content ********************************** -->
                    </div> <!-- END Main -->
                </div> <!-- END "row" -->
            </div> <!-- END "row general-page-body-container collapse" -->
<!--(bake Includes/TemplateEnding.inc)-->