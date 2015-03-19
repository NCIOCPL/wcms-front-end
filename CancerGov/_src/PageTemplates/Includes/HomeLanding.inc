<!--(bake-start _if="comment-block")-->
<!--
    This include is the template for Home and LAnding pages.  The only difference between the two is if the title appears or not.
    This include takes two parameters:
    - title : set if you want the title to display
    - template_name : the name of the .asox template
-->
<!--(bake-end)-->

<!--(bake TemplateIntro.inc template_name="{{template_name}}")-->
<!-- Begin MAIN CONTENT AREA -->
<div class="main-content" id="content" tabindex="0">

<!--(bake PublicArchiveBanner.inc)-->

<!-- HERO SLOT -->
<NCI:TemplateSlot ID="nvcgSlHeroHeader" runat="server" CssClass="row hero-slot" AdditionalSnippetClasses="large-12 columns hero" />
<!-- END HERO SLOT -->

<div class="row">
    <!--(bake-start _if="title")-->
    <!-- PAGE TITLE -->
    <div class="large-7 columns">
        <!--(bake PageTitle.inc)-->
    </div>
    <!-- END PAGE TITLE -->
    <!--(bake-end)-->

    <!--(bake PageOptions.inc css-class="large-5 columns page-options")-->
</div>

<!-- CARD CONTAINER -->
<NCI:TemplateSlot ID="nvcgSlBodyLayout" runat="server" CssClass="nvcgSlBodyLayout" />
<!-- END CARD CONTAINER -->

</div> <!-- End MAIN CONTENT AREA -->
<!--(bake TemplateEnding.inc)-->