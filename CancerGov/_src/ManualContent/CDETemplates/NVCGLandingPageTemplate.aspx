


<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register TagPrefix="NCI" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls" %>
<%@ Register TagPrefix="Config" Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration" %>
<%@ Register TagPrefix="CGov" Assembly="CancerGov.EmergencyAlert" Namespace="CancerGov.EmergencyAlert" %>
<!DOCTYPE html>
<html id="htmlEl" runat="server">
<!-- NVCGLandingPageTemplate.aspx  -->
<head id="header" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    <title></title>
    <!-- IE8 Polyfills -->
    <!--[if lt IE 9]>
    <script src="/PublishedContent/js/ie8-polyfills.js"></script>
    <![endif]-->
	<script type="text/javascript">
		// Answers Cloud Services Embed Script v1.02
		// DO NOT MODIFY BELOW THIS LINE *****************************************
		;(function (g) {
			var d = document, i, am = d.createElement('script'), h = d.head || d.getElementsByTagName("head")[0],
					aex = {
						"src": "//gateway.answerscloud.com/cancer-gov/production/gateway.min.js",
						"type": "text/javascript",
						"async": "true",
						"data-vendor": "acs",
						"data-role": "gateway"
					};
			for (var attr in aex) { am.setAttribute(attr,aex[attr]); }
			h.appendChild(am);
			g['acsReady'] = function () {var aT = '__acsReady__', args = Array.prototype.slice.call(arguments, 0),k = setInterval(function () {if (typeof g[aT] === 'function') {clearInterval(k);for (i = 0; i < args.length; i++) {g[aT].call(g, function(fn) { return function() { setTimeout(fn, 1) };}(args[i]));}}}, 50);};
		})(window);
		// DO NOT MODIFY ABOVE THIS LINE *****************************************
	</script>
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

        <!-- END NAVIGATION -->
    </div><!-- END Global nav/utility bar/language -->

<!-- Begin MAIN CONTENT AREA -->
<div class="main-content" id="content" tabindex="0">


<!-- PUBLIC ARCHIVE BANNER -->
<NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" CssClass="row collapse" AdditionalSnippetClasses="large-12 columns" />
<!-- END PUBLIC ARCHIVE BANNER -->


<!-- HERO SLOT -->
<NCI:TemplateSlot ID="nvcgSlHeroHeader" runat="server" CssClass="row hero-slot" AdditionalSnippetClasses="large-12 columns hero" />
<!-- END HERO SLOT -->

<div class="row">

    <!-- PAGE TITLE -->
    <div class="large-7 columns">

        <!-- PAGE TITLE -->
        <h1><NCI:CDEField scope="Page" fieldName="long_title" runat="server" /></h1>
        <NCI:TemplateSlot ID="nvcgSubTitle" runat="server" />
        <!-- END PAGE TITLE -->
        
    </div>
    <!-- END PAGE TITLE -->


    <!-- PAGE OPTIONS -->
    <NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="large-5 columns page-options" runat="server">
        <PageOptionsButtonLanguages>
            <NCI:PageOptionsButtonLanguageItem Language="en">
                <ButtonsCollection>

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

<!-- CARD CONTAINER -->
<NCI:TemplateSlot ID="nvcgSlBodyLayout" runat="server" CssClass="nvcgSlBodyLayout" />
<!-- END CARD CONTAINER -->

</div> <!-- End MAIN CONTENT AREA -->

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