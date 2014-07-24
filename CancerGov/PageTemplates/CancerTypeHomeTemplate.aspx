<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<!doctype html>
<html>
<head id="header" runat="server">
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body id="Body1" runat="server">
<!-- CGov Container -->
<div id="cgovContainer"> 
  <!-- Site Banner and main navigation -->
  <div class="skip"><a title="Skip to content" href="#skiptocontent">Skip to content</a></div>
  <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
  <NCI:TemplateSlot ID="cgvMainNav" runat="server" />
  <!-- End Site Banner and main navigation --> 
  <!-- Content Header -->
  <div id="headerzone">
    <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
    <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
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
      <NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" />
      <NCI:TemplateSlot ID="cgvBodyHeader" runat="server" />
      <div class="cancertypecontent clearfix">
      	<NCI:TemplateSlot ID="cgvPageTitleSl" runat="server" />
        <NCI:TemplateSlot ID="cgvCdrDefinition" runat="server" />
        <NCI:TemplateSlot ID="cgvBody" runat="server"  />
        <NCI:TemplateSlot ID="cgvBodyLeft" runat="server" CssClass="cancertypecontentleft" />
        <NCI:TemplateSlot ID="cgvBodyRight" runat="server" CssClass="cancertypecontentright" />
      </div>
    </div>
    <!-- End Content Area --> 
    <!-- End Main Area --> 
  </div>
  <!-- End Left Navigation and Content Area --> 
  <!-- Footer -->
  <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
  <!-- End Foooter--> 
  <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
  <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</div>
<!-- END CGov Container -->
</body>
</html>