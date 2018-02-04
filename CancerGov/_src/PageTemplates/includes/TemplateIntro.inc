<!--(bake-start _if="comment-block")-->
<!--
    This include is the top of all templates.  If things must change in the future please try your best to reuse as much as possible.  This
    template takes in one parameter:
    - template_name : The name of the .aspx file.  This is added as a comment to help front-end debugging.
-->
<!--(bake-end)-->
<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register TagPrefix="NCI" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" %>
<%@ Register TagPrefix="Config" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" %>
<!DOCTYPE html>
<html id="htmlEl" runat="server">
<!-- {{template_name}}  -->
<head id="header" runat="server">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=yes" />
    <title></title>

    <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
    <link rel="preconnect" href="https://ajax.googleapis.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://static.cancer.gov" />
    <link rel="preconnect" href="https://assets.adobedtm.com" />
    <link rel="preconnect" href="https://dap.digitalgov.gov" />

    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Noto+Sans" as="style"
          rel="preload" crossorigin="anonymous" OnClientLoad="this.onload=null;this.rel='stylesheet'" />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:700i|Noto+Sans:400i,700,700i"
          rel="prefetch" OnClientLoad="this.onload=null;this.rel='stylesheet'" />

	<script>
		/* loadCSS. [c]2017 Filament Group, Inc. MIT License */
		(function(a){a.loadCSS||(a.loadCSS=function(){});var c=loadCSS.relpreload={};c.support=function(){try{var b=a.document.createElement("link").relList.supports("preload")}catch(e){b=!1}return function(){return b}}();c.bindMediaToggle=function(b){function a(){b.media=c}var c=b.media||"all";b.addEventListener?b.addEventListener("load",a):b.attachEvent&&b.attachEvent("onload",a);setTimeout(function(){b.rel="stylesheet";b.media="only x"});setTimeout(a,3E3)};c.poly=function(){if(!c.support())for(var b=a.document.getElementsByTagName("link"), e=0;e<b.length;e++){var d=b[e];"preload"!==d.rel||"style"!==d.getAttribute("as")||d.getAttribute("data-loadcss")||(d.setAttribute("data-loadcss",!0),c.bindMediaToggle(d))}};if(!c.support()){c.poly();var f=a.setInterval(c.poly,500);a.addEventListener?a.addEventListener("load",function(){c.poly();a.clearInterval(f)}):a.attachEvent&&a.attachEvent("onload",function(){c.poly();a.clearInterval(f)})}"undefined"!==typeof exports?exports.loadCSS=loadCSS:a.loadCSS=loadCSS})("undefined"!==typeof global?global: this);
	</script>

    <script src="//assets.adobedtm.com/f1bfa9f7170c81b1a9a9ecdcc6c5215ee0b03c84/satelliteLib-5b3dcf1f2676c378b518a1583ef5355acd83cd3d.js"></script>

    <!--(bake Favicons.inc)-->
</head>

<body id="Body1" runat="server">
<div class="skip"><a title="Skip to content" href="#<!--(bake-start _if="skipto_id")-->{{skipto_id}}<!--(bake-end)--><!--(bake-start _if="!skipto_id")-->content<!--(bake-end)-->">Skip to content</a></div>
<!-- NOTIFICATION AREA -->
<NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" CssClass="notification-banner" />
<NCI:TemplateSlot ID="nvcgColo" runat="server"  CssClass="notification-banner" />
<!-- END NOTIFICATION AREA -->

<!-- HEADER -->
<header class="push" role="banner">
    <NCI:TemplateSlot ID="nvcgSlSiteBanner" runat="server"
                      CssClass="row" AdditionalSnippetClasses="nci-logo-pages large-12 columns" />
</header>
<!-- END HEADER -->
<!-- Begin Page -->
<div id="page">
    <!-- Global nav/utilit bar/language  -->
    <div class="fixedtotop">
        <div class="headroom-area">
            <!-- LANGUAGE BAR -->
            <div class="language-bar">
                <div class="row sitewide-language">
                    <NCI:LanguageToggleControl ID="LangList1" CssClass="large-12 columns" runat="server">
                        <LanguageToggleLanguages>
                            <NCI:LanguageToggleLanguageItem Language="en">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="es-us"
                                                        Name="Spanish"
                                                        Title="Espa&ntilde;ol"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                    <NCI:LanguageToggle Locale="zh-cn"
                                                        Name="Chinese"
                                                        Title="&#20013;&#25991;"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="es">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="en-us"
                                                        Name="English"
                                                        Title="English"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                    <NCI:LanguageToggle Locale="zh-cn"
                                                        Name="Chinese"
                                                        Title="&#20013;&#25991;"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="pt">
                                <LangsCollection>
                                    <NCI:LanguageToggle
                                        Locale="en-us"
                                        Name="English"
                                        Title="English"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle
                                        Locale="es-us"
                                        Name="Spanish"
                                        Title="Espa&ntilde;ol"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle
                                        Locale="zh-cn"
                                        Name="Chinese"
                                        Title="&#20013;&#25991;"
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                            <NCI:LanguageToggleLanguageItem Language="zh">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="en-us"
                                                        Name="English"
                                                        Title="English"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle Locale="es-us"
                                                        Name="Spanish"
                                                        Title="Espa&ntilde;ol"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle Locale="pt-br"
                                                        Name="Portuguese"
                                                        Title="Portugu&ecirc;s"
                                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                        </LanguageToggleLanguages>
                    </NCI:LanguageToggleControl>
                </div>
            </div><!-- end "language-bar" -->
            <!-- END LANGUAGE BAR -->

            <!-- UTILITY NAV -->
            <NCI:TemplateSlot ID="nvcgSlUtilityBar" CssClass="utility-background hide-for-medium-down" AdditionalSnippetClasses="row utility" runat="server" />
            <!-- END UTILITY NAV -->
        </div><!-- end "headroom-area" -->
        <!-- BEGIN NAVIGATION -->
        <!-- Begin nav-search bar -->
        <div class="nav-search-bar gradient header"><NCI:TemplateSlot ID="nvcgSlMainNav" runat="server" CssClass="row" /></div>
        <!-- End nav-search bar -->

        <!-- END NAVIGATION -->
    </div><!-- END Global nav/utility bar/language -->
