<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" TagPrefix="Config" %>
<%@ Register tagPrefix="CGov" namespace="CancerGov.EmergencyAlert" assembly="CancerGov.EmergencyAlert" %>
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
 __         ______     __   __     _____     __     __   __     ______
/\ \       /\  __ \   /\ "-.\ \   /\  __-.  /\ \   /\ "-.\ \   /\  ___\
\ \ \____  \ \  __ \  \ \ \-.  \  \ \ \/\ \ \ \ \  \ \ \-.  \  \ \ \__ \
 \ \_____\  \ \_\ \_\  \ \_\\"\_\  \ \____-  \ \_\  \ \_\\"\_\  \ \_____\
  \/_____/   \/_/\/_/   \/_/ \/_/   \/____/   \/_/   \/_/ \/_/   \/_____/
 ______   ______     ______     ______     ______
/\  == \ /\  __ \   /\  ___\   /\  ___\   /\  ___\
\ \  _-/ \ \  __ \  \ \ \__ \  \ \  __\   \ \___  \
 \ \_\    \ \_\ \_\  \ \_____\  \ \_____\  \/\_____\
  \/_/     \/_/\/_/   \/_____/   \/_____/   \/_____/
  LANDING PAGE TEMPLATE
-->
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

    <!-- Begin Page -->
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
                </div>
                <!-- END LANGUAGE BAR -->

                <!-- UTILITY NAV -->
                    <NCI:TemplateSlot ID="nvcgSlUtilityBar" CssClass="utility-background hide-for-medium-down" AdditionalSnippetClasses="row utility" runat="server" />
                <!-- END UTILITY NAV -->
            </div><!-- end "headroom-area" -->

            <!-- BEGIN NAVIGATION -->
            <!-- Begin nav-search bar -->
            <div class="nav-search-bar gradient header"><NCI:TemplateSlot ID="nvcgSlMainNav" runat="server" CssClass="row" /></div>
            <!-- End nav-search bar -->
            <!-- Begin mobile section menu clicker -->
            <div></div>
            <!-- END mobile section menu clicker -->
        <!-- END NAVIGATION -->
        </div>
        <!-- END Global nav/utility bar/language -->

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

            <!-- PUBLIC ARCHIVE BANNER -->
            <NCI:TemplateSlot ID="nvcgSlPublicArchiveBanner" runat="server" />
            <!-- END PUBLIC ARCHIVE BANNER -->

            <!-- HERO SLOT -->
             <NCI:TemplateSlot ID="nvcgSlHeroHeader" runat="server" CssClass="row hero-slot" AdditionalSnippetClasses="large-12 columns hero" />
            <!-- END HERO SLOT -->

            <div class="row collapse title-page-options">
                <!-- PAGE OPTIONS -->
                <NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="large-5 push-7 columns" runat="server">
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

                <!-- PAGE TITLE -->
                    <div class="large-7 pull-5 columns">
                        <h1><NCI:CDEField scope="Page" fieldname="short_title" runat="server" /></h1>
                    </div>
                <!-- END PAGE TITLE -->
            </div>

            <!-- CARD CONTAINER -->
            <NCI:TemplateSlot ID="nvcgSlBodyLayout" runat="server" CssClass="nvcgSlBodyLayout" />
            <!-- END CARD CONTAINER -->

            <!-- OTHER NCI SITES - NOT SURE IF A SLOT EXISTS FOR THIS-->
            <!-- <NCI:TemplateSlot ID="nvcgSlOtherSites" runat="server" /> -->
            <!-- END OTHER NCI SITES -->

        </div> <!-- END MAIN CONTENT -->
    </div> <!-- END Page -->

    <!-- FOOTER -->
    <footer class="site-footer">
        <NCI:TemplateSlot ID="nvcgSlFooter" runat="server" />
    </footer>
    <!-- END FOOTER -->

    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>
