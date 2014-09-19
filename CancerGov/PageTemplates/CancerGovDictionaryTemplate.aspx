<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration"
    TagPrefix="Config" %>
<!doctype html>
<html>
<head id="header" runat="server">
<title></title>
<script type="text/javascript" src="/JS/imgEvents.js"></script>
<script type="text/javascript" src="/JS/popEvents.js"></script>
<script type="text/javascript">	    var bSearchBoxBool = false; </script>
<script type="text/javascript" src="/JS/JSLoader/JSLoader.js"></script>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" runat="server">
<!-- Language Toggle -->
<div class="languageToggle" align="right">
  <NCI:LanguageToggleControl ID="langtoggle" runat="server">
	<LanguageToggles>
	  <Config:LanguageToggle Language="en" Url="/espanol">
	  <Template><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select {1}');">{1}</a>&nbsp;&nbsp;&nbsp;</Template>
	  </Config:LanguageToggle>
	  <Config:LanguageToggle Language="es" Url="/">
	  <Template><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select {1}');">{1}</a>&nbsp;&nbsp;&nbsp;</Template>
	  </Config:LanguageToggle>
	  <Config:LanguageToggle Language="pt" Url="/">
	  <Template><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select {1}');">{1}</a>&nbsp;&nbsp;&nbsp;</Template>
	  </Config:LanguageToggle>
	  <Config:LanguageToggle Language="zh" Url="/">
	  <Template><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select {1}');">{1}</a>&nbsp;&nbsp;&nbsp;</Template>
	  </Config:LanguageToggle>	  
	</LanguageToggles>
  </NCI:LanguageToggleControl>
</div>
<!-- Site Banner -->
<div class="skip"> <a title="Skip to content" href="#skiptocontent">Skip to content</a></div>
<NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
<NCI:TemplateSlot ID="cgvMainNav" runat="server" />
<!--Page Options Bar-->
<div align="right">
<NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="page-options" runat="server">
	<PageOptionsButtonLanguages>
		<NCI:PageOptionsButtonLanguageItem Language="en">
			<ButtonsCollection>
				<NCI:EmailButtonItem Title="email" CssClass="po-email" AlternateContentVersionKey="Email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
				<NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
				<NCI:LinkButtonItem Title="View All" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
				<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
			</ButtonsCollection>
		</NCI:PageOptionsButtonLanguageItem>
		<NCI:PageOptionsButtonLanguageItem Language="es">
			<ButtonsCollection>
				<NCI:EmailButtonItem Title="email" CssClass="po-email" AlternateContentVersionKey="Email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
				<NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
				<NCI:LinkButtonItem Title="View All" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
				<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
			</ButtonsCollection>
		</NCI:PageOptionsButtonLanguageItem>
	</PageOptionsButtonLanguages>
</NCI:PageOptionsControl>
</div>
<!-- Content Header -->
<div id="headerzone">
  <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
  <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
</div>
<!-- Main Area --> 
<!-- Main Area -->
<div id="mainContainer"> 
  <!-- Left Nav Column -->
  <div id="leftzone">
    <NCI:TemplateSlot ID="cgvSectionNav" runat="server" CssClass="LeftNavSlot" />
    
    <NCI:TemplateSlot ID="cgvFindACancerTypeSlot" runat="server" CssClass="LeftNavSlot" />
    <NCI:TemplateSlot ID="cgvLeftNav" runat="server" CssClass="LeftNavSlot" />
  </div>
  <!-- End Left Nav --> 
  <!-- Main Content Area -->
  <div class="contentzone"> <a id="skiptocontent" tabindex="1"></a>
    <NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" />
    <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"  />
    <NCI:TemplateSlot ID="cgvRightNav" runat="server" />
    <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />
    <NCI:TemplateSlot ID="cgvBody" runat="server"  />
    <NCI:TemplateSlot ID="cgvBodyNav" runat="server" />
  </div>
  <!-- End Content Area --> 
  
</div>
<!-- End Main Area --> 
<!-- Footer -->
<NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
<!-- End Foooter--> 
<!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>