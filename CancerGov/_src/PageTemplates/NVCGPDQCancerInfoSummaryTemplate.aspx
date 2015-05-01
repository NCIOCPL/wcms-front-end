<!--(bake Includes/TemplateIntro.inc template_name="NVCGPDQCancerInfoSummaryTemplate.aspx" skipto_id="main")-->
		<!-- Begin MAIN CONTENT AREA -->
		<div class="main-content" id="content" tabindex="0">
            <div class="row general-page-body-container collapse">
                <div class="large-12 columns">
                    <div class="row">
                        <NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
                    </div><!-- END "row" -->
                </div> <!-- END "large-12 columns" -->
                <div class="row">
                    <!--    SECTION NAVIGATION -->
                    <NCI:TemplateSlot ID="nvcgSlSectionNav" CssClass="medium-3 columns local-navigation" runat="server" />
                    <!--    END SECTION NAV -->
                    <div class="medium-9 columns contentzone" id="main" tabindex="0" role="main">
                        <!-- ********************************* BEGIN Page Content ********************************** -->
                        <article>
                            <!--(bake Includes/PublicArchiveBanner.inc)-->
							<div class ="resize-content"> <!-- Begin resizeable area -->
								<!--(bake Includes/PageTitle.inc)-->
								<!--(bake Includes/PageOptions-Inner.inc)-->
								<NCI:TemplateSlot ID="cgvBody" runat="server" />
								<!--(bake includes/ArticleFooter.inc pagination="true")-->
							</div> <!-- End resizeable area -->
                        </article>
                        <!-- ********************************* END Page Content ********************************** -->
                    </div> <!-- END Main -->
                </div> <!-- END "row" -->
            </div> <!-- END "row general-page-body-container collapse" -->
		</div> <!-- End MAIN CONTENT AREA -->
<!--(bake Includes/TemplateEnding.inc)-->
