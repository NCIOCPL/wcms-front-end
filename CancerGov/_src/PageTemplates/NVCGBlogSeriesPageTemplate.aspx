<!--(bake Includes/TemplateIntro.inc template_name="NVCGBlogSeriesPageTemplate.aspx" skipto_id="main")-->
		<!-- Begin MAIN CONTENT AREA -->
		<div class="main-content" id="content" tabindex="0">
            <div class="row general-page-body-container collapse">
                <div class="large-12 columns">
                    <div class="row">
                        <NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
                        <div id="blogPageOptionsOuterContainer">
                            <!--(bake Includes/PageOptions-Inner.inc)-->
                        </div>
                    </div> <!-- END "row" -->
                </div> <!-- END "large-12 columns" -->
                <div class="row">                    
                    
                    <div class="medium-9 columns contentzone" id="main" tabindex="0" role="main">
                        <!-- ********************************* BEGIN Page Content ********************************** -->
                        <article>
                            <!--(bake Includes/PublicArchiveBanner.inc)-->

                            <!-- BANNER SLOT -->
                            <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"
                                CssClass="row banner-slot"
                                AdditionalSnippetClasses="large-12 columns body-banner" />
                            <!-- END BANNER SLOT -->
                            
							<div class="resize-content">
							<!--(bake Includes/PageTitle.inc)-->      

                            <div id="blogPageOptionsInnerContainer"></div>                                    

                            <NCI:TemplateSlot ID="cgvBody" runat="server" />
							</div>
                            <!--(bake includes/ArticleFooter.inc citations="true" related_resources="true" pagination="true" comments="true")-->
                        </article>
                        <!-- ********************************* END Page Content ********************************** -->
                    </div> <!-- END Main -->

                    <!--    SECTION NAVIGATION -->
                    <NCI:TemplateSlot ID="nvcgSlListBlogRTRail" CssClass="medium-3 columns right right-rail" runat="server" />
                    <!--    END SECTION NAVIGATION -->
                    
                </div> <!-- END "row" -->
            </div> <!-- END "row general-page-body-container collapse" -->
		</div> <!-- End MAIN CONTENT AREA -->	
<!--(bake Includes/TemplateEnding.inc)-->