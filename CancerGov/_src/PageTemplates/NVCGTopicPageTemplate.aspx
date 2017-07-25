<!--(bake includes/TemplateIntro.inc template_name="NVCGTopicPageTemplate.aspx" skipto_id="main")-->
		<!-- Begin MAIN CONTENT AREA -->
		<div class="main-content" id="content" tabindex="0">
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
                            <!--(bake includes/PublicArchiveBanner.inc)-->

                            <!-- BANNER SLOT -->
                            <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"
                                CssClass="row banner-slot"
                                AdditionalSnippetClasses="large-12 columns body-banner" />
                            <!-- END BANNER SLOT -->
							<div class="resize-content"> <!-- Begin resizeable area -->
								<!--(bake includes/PageTitle.inc)-->
								<!--(bake includes/PageOptions-Inner.inc)-->
								<NCI:TemplateSlot ID="cgvIntroText" runat="server" />
								<!-- BEGIN FEATURE CARDS ROW -->
								<NCI:TemplateSlot
									id="nvcgSlLayoutFeatureA"
									CssClass="row"
									AdditionalSnippetClasses="equalheight large-6 topic-feature columns card gutter"
									runat="server"
									data-match-height="" />
								<!-- END FEATURE CARDS ROW -->
								<NCI:TemplateSlot ID="cgvBody" runat="server" />
								<!-- BEGIN THUMBNAIL CARDS ROW -->
								<NCI:TemplateSlot
									id="nvcgSlLayoutThumbnailA"
									CssClass="row card-thumbnail"
									runat="server"
									/>
								<!-- END THUMBNAIL CARDS ROW -->
								<!--(bake includes/ArticleFooter.inc related_resources="true")-->
							</div> <!-- End resizeable area -->
                        </article>
                        <!-- ********************************* END Page Content ********************************** -->
                    </div> <!-- END Main -->
                </div> <!-- END "row" -->
            </div> <!-- END "row general-page-body-container collapse" -->
		</div> <!-- End MAIN CONTENT AREA -->
<!--(bake includes/TemplateEnding.inc)-->
