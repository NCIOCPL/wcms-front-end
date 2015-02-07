<!--(bake Includes/TemplateIntro.inc template_name="NVCGCancerTypeHomePageTemplate.aspx")-->
<!-- slots -->
<div class="row">
	<div class="large-12 columns">
		<NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
	</div>
	<!-- END "row" -->
</div>
<div class="cthp-content accordion">
	<div class="row">
		<div class="large-12 columns">
			<!--(bake Includes/PageTitle.inc)-->
			<!--(bake Includes/PageOptions.inc css-class="page-options")-->
	<!-- Body slot -->
	<NCI:TemplateSlot ID="nvcgSlCTHPIntro" runat="server" CssClass="resize-content" />
	<!-- Does this contain intro text, OnThisPage, article image, sections, & endnotes? -->
	<div class="row">
		<div class="large-12 columns guide">
			<h3><NCI:CDEField scope="Page" fieldName="Tagline" runat="server" /></h3>
		</div>
	</div>
	<NCI:TemplateSlot ID="nvcgSlCTHPCards" CssClass="cthp-card-container" AdditionalSnippetClasses="large-6 columns cthpCard" runat="server" />
</div>
	</div>
</div>
<!--(bake Includes/TemplateEnding.inc)-->