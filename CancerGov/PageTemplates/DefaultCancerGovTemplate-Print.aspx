<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<!doctype html>
<html>
<head id="header" runat="server">
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body runat="server">
<!-- CGov Container -->
<div id="cgovContainer"> 
  <!-- Site Banner -->
  <div class="skip"> <a title="Skip to content" href="#skiptocontent">Skip to content</a> </div>
  <NCI:TemplateSlot ID="cgvSiteBannerPrint" runat="server" />  
  <!-- Content Header -->
  <div id="headerzone">
    <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
    <NCI:TemplateSlot ID="cgvLanguage" runat="server" />
  </div>
  <!-- Main Area --> 
  <!-- Left Navigation and Content Area -->
  <div id="mainContainer"> 
    <!-- Main Content Area --> 
    <a id="skiptocontent" tabindex="1"></a>
    <div class="contentzone-noleftnav">
      <NCI:TemplateSlot ID="cgvPublicArchiveBannerSl" runat="server" />
      <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"  />
      <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />
      <NCI:TemplateSlot ID="cgvBody" runat="server"  />
      <NCI:TemplateSlot ID="cgvRightNav" runat="server" />
	  <NCI:TemplateSlot ID="cgvDate" runat="server" />
    </div>
    <!-- End Main Area --> 
  </div>
  <!-- End Left Navigation and Content Area --> 
  <!-- Footer --> 
</div>
<!-- End CGovContainer--> 
<!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>
