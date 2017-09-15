<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>


<!DOCTYPE html> 
<html> 
	<head id="header" runat="server">
        <title></title>
        <script src="//assets.adobedtm.com/f1bfa9f7170c81b1a9a9ecdcc6c5215ee0b03c84/satelliteLib-5b3dcf1f2676c378b518a1583ef5355acd83cd3d.js"></script>
        <!-- CGov Mobile Header Info -->
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <!-- CGov Mobile Header Info End-->    
	</head> 
<body runat="server">
<!-- CGov Mobile Container -->
<div data-role="page">
  <!-- Site Banner -->
  <NCI:TemplateSlot ID="cgvMobileSiteBanner" runat="server" />  
  <!-- Site Banner End-->
  
  <!-- Main Area --> 
  
    <!-- Main Content Area -->
	<div data-role="content" class="content-general">
    <NCI:TemplateSlot ID="languageToggle" runat="server" />
	  <NCI:TemplateSlot ID="cgvMobileTitleSlot" runat="server" />
      <NCI:TemplateSlot ID="cgvMobileBody" runat="server" />
      <NCI:TemplateSlot ID="cgvMobileNav" runat="server" />
    </div>
    <!-- End Content Area --> 

  <!-- End Main Area -->
   
  <!-- Footer -->
  <NCI:TemplateSlot ID="cgvMobileFooter" runat="server" RemoveIfEmpty="false" />
  <!-- End Foooter--> 
</div>
<!-- End CGovMobileContainer--> 
<!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
<script type="text/javascript">_satellite.pageBottom();</script>
</body>
</html>