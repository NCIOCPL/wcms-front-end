﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.SnippetControls.SubLayoutControl" %>
<!-- BEGIN Row Title -->
<div class="row collapse">
    <div class="large-12 columns guide-title">
        <NCI:CDEField
            Scope="Snippet"
            FieldName="sublayout_title"
            WrappingTagName="h2"
            id="CDEField1"
            runat="server" />
    </div>
</div>
<!-- END Row Title -->
<!-- BEGIN GUIDE CARDS ROW -->
<div class="accordion">
    <NCI:TemplateSlot
        id="nvcgSlLayoutGuideB"
        CssClass="row guide-card"
        AdditionalSnippetClasses="equalheight large-4 columns card gutter"
        runat="server"
        data-match-height="" />
</div>
<!-- END GUIDE CARDS ROW -->
<!-- BEGIN FEATURE SECONDARY CARDS ROW -->
<NCI:TemplateSlot
    id="nvcgSlLayoutFeatureB"
    CssClass="row feature-secondary"
    AdditionalSnippetClasses="equalheight large-4 columns card gutter"
    runat="server"
    data-match-height="" />
<!-- END FEATURE SECONDARY CARDS ROW -->