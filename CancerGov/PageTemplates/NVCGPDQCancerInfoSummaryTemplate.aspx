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
					<!-- NVCGPDQCancerInfoSummaryTemplate -->
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
					<div class="skip"><a title="Skip to content" href="#main">Skip to content</a>
					</div>
					<!-- NOTIFICATION AREA -->
					<NCI:TemplateSlot ID="nvcgSlNotificationArea" runat="server" />
					<!-- END NOTIFICATION AREA -->
					<!-- HEADER -->
					<header class="push" role="banner">
						<NCI:TemplateSlot ID="nvcgSlSiteBanner" CssClass="row" AdditionalSnippetClasses="large-12 small-centered columns nci-logo" runat="server" />
					</header>
					<!-- END HEADER -->
					<div id="page">
						<!-- Global nav/utilit bar/language  -->
						<div class="fixedtotop">
							<div class="headroom-area">
								<!-- LANGUAGE BAR -->
								<div class="language-bar">
									<div class="row sitewide-language">
										<NCI:LanguageToggleControl ID="LangList1" CssClass="large-12 small columns" runat="server">
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
								<!-- END LANGUAGE BAR -->
								<!-- UTILITY NAV -->
								<div class="utility-background hide-for-medium-down">
									<NCI:TemplateSlot ID="nvcgSlUtilityNav" CssClass="row utility" AdditionalSnippetClasses="large-12 columns utility" runat="server" />
								</div>
								<!-- END UTILITY NAV -->
							</div>
							<!-- BEGIN NAVIGATION -->
							<!-- Begin nav-search bar -->
							<NCI:TemplateSlot ID="nvcgSlMainNav" runat="server" CssClass="nav-search-bar gradient header" AdditionalSnippetClasses="row" />
							<!-- End nav-search bar -->
							<!-- Begin section menu clicker (on mobile) -->
							<div></div>
							<!-- End section menu clicker (on mobile) -->
							<!-- END NAVIGATION -->
						</div>
						<!-- END Global nav/utility bar/language -->
						<!-- MAIN CONTENT -->
						<div class="main-content" id="content">
							<div class="row general-page-body-container collapse">
								<div class="large-12 columns">
									<div class="row">
										<NCI:TemplateSlot ID="cgvSlBreadcrumb" CssClass="medium-8 columns bcrumbs" runat="server" />
										<!-- PAGE OPTIONS -->
										<NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="medium-4 columns" runat="server">
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
									<!-- 	SECTION NAVIGATION -->
									<NCI:TemplateSlot ID="nvcgSlSectionNav" CssClass="medium-3 columns local-navigation" runat="server" />
									<!-- 	END SECTION NAVIGATION -->
									<div class="medium-9 columns contentzone" id="main" tabindex="1" role="main">
										<!-- ********************************* BEGIN Page Content ********************************** -->
										<article>
											<!-- PAGE TITLE -->
											<h1><NCI:CDEField Scope="Page" FieldName="long_title" runat="server" /></h1>
											<!-- END PAGE TITLE -->
											<!-- PDQ Specific wrapper Mobile Accordion
											<div id="accordion">
												<NCI:TemplateSlot ID="cgvBody" runat="server" />
											</div>
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
					<!-- END MAIN CONTENT -->
					<!-- FOOTER -->
					<footer class="footer-site">
						<NCI:TemplateSlot ID="nvcgSlSiteFooter" runat="server" />
					</footer>
					<!-- END FOOTER -->
					<NCI:TemplateSlot ID="nvcgBackToTop" runat="server" />
					<!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
					<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
				</body>

				</html>