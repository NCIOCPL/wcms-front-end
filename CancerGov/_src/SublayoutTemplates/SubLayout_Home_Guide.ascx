<%@ Control Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.SnippetControls.SubLayoutControl" %>
<!-- BEGIN CARDS ROW -->
<div class="row guide-card guide-card--home accordion flex-columns">
    <NCI:TemplateSlot
        id="nvcgSlLayoutGuideB"
        class="nvcgSlLayoutGuideB"
        AdditionalSnippetClasses="equalheight large-4 columns card gutter"
        runat="server" />
</div>
<!-- END CARDS ROW -->

<!--  NOTE TO change percussion such that all three items are layoutguideB with the 
previously layoutguideA element being the first child -->