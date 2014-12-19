<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" TagPrefix="Config" %>
<%@ Register tagPrefix="CGov" namespace="CancerGov.EmergencyAlert" assembly="CancerGov.EmergencyAlert" %>
<!DOCTYPE html>
<!--[if IE 8]><html class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js">
<!--<![endif]-->

<head id="header" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    <title></title>
    <!-- IE8 Polyfills -->
    <!--[if lt IE 9]>
        <script src="js/ie8-polyfills.js"></script>
        <script src="js/vendor/respond.js"></script>
    <![endif]-->
</head>

<body id="Body1" runat="server">
    <div class="skip"><a title="Skip to content" href="#skiptocontent">Skip to content</a></div>
    <!-- NOTIFICATION AREA -->
    <CGov:EmergencyAlertBanner ID="EmergencyAlertBanner" runat="server" />
    <Cgov:ShutdownBanner ID=??? />
    <CGov:ColocationBanner ID=??? />
    <!-- OR this ?? -->
    <NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" />
    <!-- END NOTIFICATION AREA -->
    
    <!-- HEADER -->
    <header class="push" role="banner">
        <div class="row">
            <div class="large-12 small-centered columns" id="nci-logo">
                <NCI:TemplateSlot ID="nvcgSlSiteBanner" runat="server" />
            </div>
        </div>
    </header>
    <!-- END HEADER -->
    
    <div id="page">
    
        <!-- Global nav/utilit bar/language  -->
        <div class="fixedtotop">
            <div class="headroom-area">
                <!-- LANGUAGE BAR -->
                    <div class="language-bar">
                        <div class="row sitewide-language">
                            <div class="large-12 small columns">
                                <NCI:LanguageToggleControl ID="LangList1" runat="server">
                                    <LanguageToggleLanguages>
                                        <NCI:LanguageToggleLanguageItem Language="en">
                                            <LangsCollection>
                                                <NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                                <NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                                <NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                            </LangsCollection>
                                        </NCI:LanguageToggleLanguageItem>
                                        <NCI:LanguageToggleLanguageItem Language="es">
                                            <LangsCollection>
                                                <NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                                <NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                                <NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                            </LangsCollection>
                                        </NCI:LanguageToggleLanguageItem>
                                        <NCI:LanguageToggleLanguageItem Language="pt">
                                            <LangsCollection>
                                                <NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                                <NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                                <NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" />
                                            </LangsCollection>
                                        </NCI:LanguageToggleLanguageItem>
                                        <NCI:LanguageToggleLanguageItem Language="zh">
                                            <LangsCollection>
                                                <NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                                <NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                                <NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                            </LangsCollection>
                                        </NCI:LanguageToggleLanguageItem>
                                    </LanguageToggleLanguages>
                                </NCI:LanguageToggleControl>
                            </div>
                        </div>
                    </div>
                <!-- END LANGUAGE BAR -->
                
                <!-- UTILITY NAV -->
                    <div class="utility-background hide-for-medium-down">
                        <div class="row utility">
                            <div class="large-12 columns utility">
                                <NCI:TemplateSlot ID="nvcgUtilityBarSlot" runat="server" />
                            </div>
                        </div>
                    </div>
                <!-- END UTILITY NAV -->
                
            </div>
            
            <!-- BEGIN NAVIGATION -->
                <!-- Begin nav-search bar -->
                    <section class="nav-search-bar gradient header">
                        <div class="row">
                            <NCI:TemplateSlot ID="nvcgSlMainNavigation" runat="server" />
                        </div>
                    </section>
                <!-- End nav-search bar -->
                <!-- Begin section menu clicker (on mobile) --> <a id="section-menu-button" aria-hidden="true">Section menu</a>
                <!-- End section menu clicker (on mobile) -->
            <!-- END NAVIGATION -->
        
        </div>
        <!-- END Global nav/utility bar/language -->
        
        <!-- MAIN CONTENT -->
        <div class="main-content" id="content">
        
            <div class="row general-page-body-container collapse">
                <div class="large-12 columns">
                    <div class="row">
                        <div class="medium-8 columns bcrumbs" id="mySection" role="navigation">
                            <NCI:TemplateSlot ID="cgvSlBreadcrumb" runat="server" />
                        </div>
                        <div class="medium-4 columns">
                            <!-- PAGE OPTIONS -->
                            <NCI:PageOptionsControl ID="PageOptionsControl1" runat="server">
                                <PageOptionsButtonLanguages>
                                    <NCI:PageOptionsButtonLanguageItem Language="en">
                                        <ButtonsCollection>
                                            <NCI:LinkButtonItem Title="View entire document" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
                                            <NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
                                            <NCI:EmailButtonItem Title="Email" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        </ButtonsCollection>
                                    </NCI:PageOptionsButtonLanguageItem>
                                    <NCI:PageOptionsButtonLanguageItem Language="es">
                                        <ButtonsCollection>
                                            <NCI:LinkButtonItem Title="Ver el documento completo" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
                                            <NCI:LinkButtonItem Title="Imprimir" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
                                            <NCI:EmailButtonItem Title="Enviar por correo electr&oacute;nico" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                            <NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        </ButtonsCollection>
                                    </NCI:PageOptionsButtonLanguageItem>
                                </PageOptionsButtonLanguages>
                            </NCI:PageOptionsControl>
                            <!-- END PAGE OPTIONS -->
                        </div>
                    </div>
                    <div class="row">
                        <!-- SECTION NAV -->
                        <div class="medium-3 columns local-navigation">
                            <NCI:TemplateSlot ID="nvcgSlLeftNav" runat="server" />
                        </div>
                        <!-- END SECTION NAV -->
                        <div class="medium-9 columns contentzone has-section-nav" id="skiptocontent" tabindex="1" role="main">
                            <!-- ********************************* BEGIN Page Content ********************************** -->
                            <article role="article">
                                <NCI:TemplateSlot ID="nvcgSlTitle" runat="server" />
                                <NCI:TemplateSlot ID="nvcgSlBody" runat="server" />
                                <NCI:TemplateSlot ID="nvcgSlDates" runat="server" />
                            </article>
                            <!-- ********************************* END Page Content ********************************** -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END MAIN CONTENT -->

    <!-- FOOTER -->
    <footer>
        <NCI:TemplateSlot ID="nvcgSlFooter" runat="server" />
    </footer>
    <!-- END FOOTER -->

    <!-- Is This Necessary? -->
    <NCI:TemplateSlot ID="nvcgBackToTop" runat="server" />

    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>

</html>
