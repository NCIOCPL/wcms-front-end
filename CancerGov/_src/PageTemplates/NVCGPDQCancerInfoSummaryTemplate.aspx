<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register TagPrefix="NCI" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" %>
<%@ Register TagPrefix="Config" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" %>
<%@ Register TagPrefix="CGov" Assembly="CancerGov.EmergencyAlert" Namespace="CancerGov.EmergencyAlert" %>
<!DOCTYPE html>
<html id="htmlEl" runat="server">
<!--
ooooo      ooo   .oooooo.   ooooo 
`888b.     `8'  d8P'  `Y8b  `888' 
 8 `88b.    8  888           888  
 8   `88b.  8  888           888  
 8     `88b.8  888           888  
 8       `888  `88b    ooo   888  
o8o        `8   `Y8bood8P'  o888o
NATIONAL CANCER INSTITUTE
at the National Institutes of Health

`7MM"""Mq. `7MM"""Yb.     .g8""8q.   
  MM   `MM.  MM    `Yb. .dP'    `YM. 
  MM   ,M9   MM     `Mb dM'      `MM 
  MMmmdM9    MM      MM MM        MM 
  MM         MM     ,MP MM.      ,MP 
  MM         MM    ,dP' `Mb.    ,dP' 
.JMML.     .JMMmmmdP'     `"bmmd"'   
                              MMb    
                               `bood'

 Physicians Desk Query  PAGE    TEMPLATE
-->
<head id="header" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    <title></title>
    <!-- IE8 Polyfills -->
    <!--[if lt IE 9]>
        <script src="//webcomm.sapientgov.com/htmldev/evolution/QA/js/ie8-polyfills.js"></script>
        <script src="//webcomm.sapientgov.com/htmldev/evolution/QA/js/vendor/respond.js"></script>
    <![endif]-->
</head>

<body id="Body1" runat="server">
    <div class="skip"><a title="Skip to content" href="#main">Skip to content</a></div>
    <!-- NOTIFICATION AREA -->
    <NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" />
    <!-- END NOTIFICATION AREA -->
    
<!-- HEADER -->
    <header class="push" role="banner">
        <NCI:TemplateSlot ID="nvcgSlSiteBanner" runat="server" 
            CssClass="row" AdditionalSnippetClasses="nci-logo large-12 small-centered columns" />
    </header>
    <!-- END HEADER -->
    
    <div id="page">
        <!-- Global nav/utilit bar/language  -->
        <div class="fixedtotop">
            <div class="headroom-area">
                <!-- LANGUAGE BAR -->
                <div class="language-bar">
                    <NCI:LanguageToggleControl 
                        ID="LangList1" 
                        CssClass="row sitewide-language" 
                        runat="server">
                        <LanguageToggleLanguages>
                            <NCI:LanguageToggleLanguageItem Language="en">
                                <LangsCollection>
                                    <NCI:LanguageToggle Locale="es-us" 
                                        Name="Spanish" 
                                        Title="Espa&ntilde;ol" 
                                        Url="/espanol" 
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
                                        Url="/" 
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
                                        Url="/" 
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle 
                                        Locale="es-us" 
                                        Name="Spanish" 
                                        Title="Espa&ntilde;ol" 
                                        Url="/espanol" 
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
                                        Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
                                    <NCI:LanguageToggle Locale="es-us" 
                                        Name="Spanish" 
                                        Title="Espa&ntilde;ol" 
                                        Url="/espanol" 
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
                                    <NCI:LanguageToggle Locale="pt-br" 
                                        Name="Portuguese" 
                                        Title="Portugu&ecirc;s" 
                                        OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
                                </LangsCollection>
                            </NCI:LanguageToggleLanguageItem>
                        </LanguageToggleLanguages>
                    </NCI:LanguageToggleControl>
                </div><!-- end "language-bar" -->
                <!-- END LANGUAGE BAR -->
                
                <!-- UTILITY NAV -->
                <NCI:TemplateSlot ID="nvcgSlUtilityBar" CssClass="utility-background hide-for-medium-down" AdditionalSnippetClasses="row utility" runat="server" />
                <!-- END UTILITY NAV -->
            </div><!-- end "headroom-area" -->
            
            <!-- BEGIN NAVIGATION -->
            <!-- Begin nav-search bar -->
            <NCI:TemplateSlot ID="nvcgSlMainNav" runat="server" 
                CssClass="nav-search-bar gradient header" AdditionalSnippetClasses="row" />
            <!-- End nav-search bar -->
                
            <!-- Begin section menu clicker (on mobile) -->
            <div></div>
            <!-- End section menu clicker (on mobile) -->
            <!-- END NAVIGATION -->
        </div><!-- END Global nav/utility bar/language -->
            
        <!--  
        ooo        ooooo            o8o              
        `88.       .888'            `"'              
         888b     d'888   .oooo.   oooo  ooo. .oo.   
         8 Y88. .P  888  `P  )88b  `888  `888P"Y88b  
         8  `888'   888   .oP"888   888   888   888  
         8    Y     888  d8(  888   888   888   888  
        o8o        o888o `Y888""8o o888o o888o o888o 
        MAIN CONTENT AREA -->
        <div class="main-content" id="content">
        
            <div class="row general-page-body-container collapse">
                <div class="large-12 columns">
                    <div class="row">
                        <div class="medium-8 columns bcrumbs" id="mySection" role="navigation">
                            <NCI:TemplateSlot ID="cgvSlBreadcrumb" runat="server" />
                        </div>
                        <div class="medium-4 columns">
                            <!-- PAGE OPTIONS -->
                        <NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="page-options" runat="server">
                            <PageOptionsButtonLanguages>
                                <NCI:PageOptionsButtonLanguageItem Language="en">
                                    <ButtonsCollection>
                                        <NCI:LinkButtonItem Title="View entire document" 
                                            CssClass="po-view-entire-document" 
                                            AlternateContentVersionKey="viewall" />
                                        <NCI:LinkButtonItem Title="Print" 
                                            CssClass="po-print" 
                                            AlternateContentVersionKey="print" 
                                            WebAnalytics="NCIAnalytics.PrintLink(this);" />
                                        <NCI:EmailButtonItem Title="Email" 
                                            CssClass="po-email" 
                                            AlternateContentVersionKey="email" 
                                            WebAnalytics="NCIAnalytics.eMailLink(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="facebook" 
                                            Title="Facebook" 
                                            CssClass="po-facebook" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="twitter" 
                                            Title="Twitter" 
                                            CssClass="po-twitter" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" 
                                            Title="Google+" 
                                            CssClass="po-googleplus" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="pinterest_share" 
                                            Title="Pinterest" 
                                            CssClass="po-pinterest" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                    </ButtonsCollection>
                                </NCI:PageOptionsButtonLanguageItem>
                                <NCI:PageOptionsButtonLanguageItem Language="es">
                                    <ButtonsCollection>
                                        <NCI:LinkButtonItem 
                                            Title="Ver el documento completo" 
                                            CssClass="po-view-entire-document" 
                                            AlternateContentVersionKey="viewall" />
                                        <NCI:LinkButtonItem 
                                            Title="Imprimir" 
                                            CssClass="po-print" 
                                            AlternateContentVersionKey="print" 
                                            WebAnalytics="NCIAnalytics.PrintLink(this);" />
                                        <NCI:EmailButtonItem 
                                            Title="Enviar por correo electr&oacute;nico" 
                                            CssClass="po-email" 
                                            AlternateContentVersionKey="email" 
                                            WebAnalytics="NCIAnalytics.eMailLink(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="facebook" 
                                            Title="Facebook" 
                                            CssClass="po-facebook" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="twitter" 
                                            Title="Twitter" 
                                            CssClass="po-twitter" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" 
                                            Title="Google+" 
                                            CssClass="po-googleplus" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                                        <NCI:PageOptionsAddThisButtonItem Service="pinterest_share" 
                                            Title="Pinterest" 
                                            CssClass="po-pinterest" 
                                            AlternateContentVersionKey="bookmarkshare" 
                                            WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
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
                            <NCI:TemplateSlot ID="nvcgSlSectionNav" runat="server" />
                        </div>
                        <!-- END SECTION NAV -->
                        <div class="medium-9 columns contentzone has-section-nav" id="main" tabindex="1" role="main">
                            <!-- ********************************* BEGIN Page Content ********************************** -->
                            <article role="article">
                                <h1><NCI:CDEField scope="Page" fieldName="long_title" runat="server" /></h1>
                                <NCI:TemplateSlot ID="cgvBody" runat="server" />
                                <NCI:TemplateSlot ID="nvcgSlDates" runat="server" />
                                <footer class="footer-article">
                                    <NCI:TemplateSlot ID="nvcgRelatedResourcesArea" runat="server" />
                                    <NCI:TemplateSlot ID="cgvDate" runat="server" />
                                    <NCI:TemplateSlot ID="nvcgSlPublicUse" runat="server" />
                                    <NCI:TemplateSlot ID="nvcgSlSyndication" runat="server" />
                                </footer>
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

    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>

</html>
