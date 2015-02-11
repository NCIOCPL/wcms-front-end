<!--(bake Includes/TemplateIntro.inc template_name="NVCGCancerTypeHomePageTemplate.aspx")-->
<!-- slots -->
<div class="row">
	<div class="large-12 columns">
		<NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
	</div>
	<!-- END "row" -->
</div>
<div class="cthp-content">
	<div class="row">
		<div class="large-12 columns">
			<!--(bake Includes/PageTitle.inc)-->
			<!--(bake Includes/PageOptions-Inner.inc)-->
	<!-- Body slot -->
	<NCI:TemplateSlot ID="nvcgSlCTHPIntro" runat="server" CssClass="resize-content" />
	<!-- Does this contain intro text, OnThisPage, article image, sections, & endnotes? -->
	<NCI:TemplateSlot ID="nvcgSlCTHPCards" CssClass="cthp-card-container" AdditionalSnippetClasses="medium-6 columns cthpCard" runat="server" />
</div>
	</div>
</div>
<!--(bake Includes/TemplateEnding.inc)-->