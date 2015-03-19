<!--(bake Includes/TemplateIntro.inc template_name="NVCGCancerTypeHomePageTemplate.aspx")-->
<!-- Begin MAIN CONTENT AREA -->
<div class="main-content" id="content">
<!-- slots -->
<div class="row">
	<div class="large-12 columns cthp-breadcrumb">
		<NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
	</div>
	<!-- END "row" -->
</div>
<div class="cthp-content" id="content" tabindex="0">
	<div class="row">
		<div class="large-12 columns resize-content">
			<!--(bake Includes/PageTitle.inc)-->
			<!--(bake Includes/PageOptions-Inner.inc)-->
			<!-- Body slot -->
			<NCI:TemplateSlot ID="nvcgSlCTHPIntro" runat="server" />
			<!-- Does this contain intro text, OnThisPage, article image, sections, & endnotes? -->
			<NCI:TemplateSlot ID="nvcgSlCTHPCards" CssClass="cthp-card-container" AdditionalSnippetClasses="large-6 columns cthpCard no-resize" runat="server" /> 
		</div>
	</div>
</div>
</div> <!-- End MAIN CONTENT AREA -->
<!--(bake Includes/TemplateEnding.inc)-->