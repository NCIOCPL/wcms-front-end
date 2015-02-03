<!--(bake Includes/TemplateIntro.inc template_name="NVCGCancerTypeHomePageTemplate.aspx")-->
<!-- slots -->
<div class="row">
	<div class="large-12" style="border: 1px solid blue;">
	<!--(bake Includes/PageTitle.inc)-->
	</div>
</div>
<div class="row">
<div class="large-12 columns">
		<NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
	</div>
	<!-- END "row" -->
</div>
<!-- END "large-12 columns" -->
<!--(bake Includes/PageOptions.inc)-->
<!-- Body slot -->
<NCI:TemplateSlot ID="nvcgSlCTHPIntro" runat="server" CssClass="resize-content" />
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