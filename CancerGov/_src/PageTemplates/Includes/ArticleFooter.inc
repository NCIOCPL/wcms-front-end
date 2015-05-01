<!--(bake-start _if="comment-block")-->
<!--
    This include is the footer for all inner pages.  As some slots are hidden for certain types, this include takes in
     the following parameters:
     - citations
     - related-resources
     - pagination
     - comments

     cgvDate, nvcgSlPublicUse, and nvcgSlSyndication always display.
-->
<!--(bake-end)-->
<footer class="article-footer">
    <!--(bake-start _if="citations")-->
    <NCI:TemplateSlot ID="cgvCitationSl" runat="server" />
    <!--(bake-end)-->
    <!--(bake-start _if="related_resources")-->
    <NCI:TemplateSlot ID="nvcgRelatedResourcesArea" runat="server" />
    <!--(bake-end)-->
    <NCI:TemplateSlot ID="cgvDate" runat="server" />
    <!--(bake-start _if="pagination")-->
    <NCI:TemplateSlot ID="cgvSlPagination" runat="server" CssClass="clearfix" />
    <!--(bake-end)-->
    <NCI:TemplateSlot ID="nvcgSlPublicUse" runat="server" />
    <NCI:TemplateSlot ID="nvcgSlSyndication" runat="server" />
    <!--(bake-start _if="comments")-->
    <NCI:TemplateSlot ID="cgvCommentsSl" runat="server" />
    <!--(bake-end)-->
</footer>