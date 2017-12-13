<%@ Control Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.SnippetControls.SubLayoutControl" %>
<div class="feature-primary-title">
	<NCI:CDEField
            Scope="Snippet"
            FieldName="sublayout_title"
            WrappingTagName="h3"
            id="CDEField1"
            runat="server" />
</div>
<!-- BEGIN FEATURE PRIMARY CARDS ROW -->
<NCI:TemplateSlot
    id="nvcgSlLayoutFeatureA"
    CssClass="row feature-primary micro-a flex-columns"
    AdditionalSnippetClasses="equalheight large-4 columns card gutter"
    runat="server"
    />
<!-- END FEATURE PRIMARY CARDS CARDS ROW -->