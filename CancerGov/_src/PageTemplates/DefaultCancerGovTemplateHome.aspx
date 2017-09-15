<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration"
    TagPrefix="Config" %>
<%@ Register tagPrefix="CGov" namespace="CancerGov.EmergencyAlert" assembly="CancerGov.EmergencyAlert" %>
<!doctype html>
<html>
<head id="header" runat="server">
  <script src="//assets.adobedtm.com/f1bfa9f7170c81b1a9a9ecdcc6c5215ee0b03c84/satelliteLib-5b3dcf1f2676c378b518a1583ef5355acd83cd3d.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- This is to make content width follow different rules for IE7 and below -->
<!--[if lt IE 8]>
<style type="text/css">
.BodySlotPortal {
	padding-right: 0 !important;
  width: auto !important;
}
</style>
<![endif]-->
<title></title>
<script type="text/javascript" src="/scripts/imgEvents.js"></script>
<script type="text/javascript" src="/JS/NetTracker/ntpagetag.js"></script>
<script src="/JS/popEvents.js" type="text/javascript"></script>
</head>
<body runat="server">
<!-- CGov Container -->
<div id="cgovContainer"> 
<!-- Language Toggle -->
<div class="languageToggle" align="right">
<NCI:LanguageToggleControl ID="LangList1" runat="server">
	<LanguageToggleLanguages>
		<NCI:LanguageToggleLanguageItem Language="en">
			<LangsCollection>
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="es">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
	</LanguageToggleLanguages>
</NCI:LanguageToggleControl>
</div>
  <!-- Site Banner -->
  <div class="skip"><a title="Skip to content" href="#skiptocontent">Skip to content</a></div>
  <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
  <NCI:TemplateSlot ID="cgvMainNav" runat="server" />
  <CGov:EmergencyAlertBanner ID="EmergencyAlertBanner" runat="server" />
  <!-- End Site Banner --> 
  <!-- Content Header -->
  <div id="headerzone">
	<NCI:TemplateSlot ID="coloMessage" runat="server" />
    <NCI:TemplateSlot ID="cgvLanguage" runat="server" />
    <NCI:TemplateSlot ID="cgvSlBreadcrumb" runat="server" /> 
  </div>
  <!-- Main Area --> 
  <!-- Left Navigation and Content Area -->
  <div id="mainContainer"> 
    <!-- Left Nav Column -->
    <div class="leftzone">
    <NCI:TemplateSlot ID="cgvFindACancerTypeSlot" runat="server" CssClass="LeftNavSlot" />
      <NCI:TemplateSlot ID="cgvSectionNav" runat="server" CssClass="LeftNavSlot" />      
      <NCI:TemplateSlot ID="cgvLeftNav" runat="server" CssClass="LeftNavSlot" />
    </div>
    <!-- End Left Nav --> 
    <!-- Main Content Area -->
    <div class="contentzone"> 
    	<a id="skiptocontent" tabindex="1"></a> 
      <!-- Parent container for content and timely content zone column -->
      <NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" />
      <NCI:TemplateSlot ID="cgvBodyHeader" runat="server" CssClass="BodyHeaderSlot"/>
      <NCI:TemplateSlot ID="cgvSlotTimelyContentItem" runat="server" CssClass="TimelyContentSlot" />
      <!-- Tile zone column -->
      <NCI:TemplateSlot ID="cgvTileSlot" runat="server" CssClass="TileSlot" />
      <!-- End Tile zone column -->
      <NCI:TemplateSlot ID="cgvBody" CssClass="BodySlotPortal" runat="server"  />
	  <NCI:TemplateSlot ID="cgvDate" runat="server" />
      <!-- End Parent container for content and timely content zone column --> 
    </div>
    <!-- End Content Area --> 
  </div>
  <!-- End Left Navigation and Content Area --> 
  <!-- End Main Area --> 
  <!-- Footer -->
  <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
  <!-- End Foooter--> 
</div>
<!-- End CGovContainer--> 
<!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
<script type="text/javascript">_satellite.pageBottom();</script>
</body>
</html>
