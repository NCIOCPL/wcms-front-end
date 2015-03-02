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
<%@ Register TagPrefix="CGov" Assembly="CancerGov.EmergencyAlert" Namespace="CancerGov.EmergencyAlert" %>
<!DOCTYPE html>
<html id="htmlEl" runat="server">
<!-- {{template_name}}  -->
<head id="header" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    <title></title>
    <!-- IE8 Polyfills -->
    <!--[if lt IE 9]>
    <script src="/PublishedContent/js/ie8-polyfills.js"></script>
    <![endif]-->
</head>

<body id="Body1" runat="server">
    <!--[if lt IE 9]>
    <script src="/PublishedContent/js/respond.js"></script>
    <![endif]-->
<div class="skip"><a title="Skip to content" href="#content">Skip to content</a></div>
<!-- NOTIFICATION AREA -->
<NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" CssClass="notification-banner" />
<NCI:TemplateSlot ID="nvcgColo" runat="server"  CssClass="notification-banner" />
<!-- END NOTIFICATION AREA -->

<!-- HEADER -->
<header class="push" role="banner">
    <NCI:TemplateSlot ID="nvcgSlSiteBanner" runat="server"
                      CssClass="row" AdditionalSnippetClasses="nci-logo large-12 small-centered columns" />
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

        <!-- Begin section menu clicker (on mobile) -->
        <div></div>
        <!-- End section menu clicker (on mobile) -->
        <!-- END NAVIGATION -->
    </div><!-- END Global nav/utility bar/language -->

    <!-- Begin MAIN CONTENT AREA -->
    <div class="main-content" id="content" tabindex="0">
