<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="header" runat="server">
    <title></title>    
    <script type="text/javascript" language="JavaScript" src="/JS/imgEvents.js"></script>
	<script type="text/javascript" language="JavaScript" src="/JS/popEvents.js"></script>	
	<script type="text/javascript" language="javascript">	    var bSearchBoxBool = false; </script>
	<script type="text/javascript" language="JavaScript" src="/JS/JSLoader/JSLoader.js"></script>    
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" runat="server">
    <!-- Site Banner -->
    <div class="skip">
        <a title="Skip to content" href="#skiptocontent">Skip to content</a></div> 
    <div id="bannerDiv" align="center">
        <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
    </div>
    <div align="center">
    </div>
    <!-- Content Header -->
    <div id="headerzone" align="center">
        <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />        
        <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
    </div>
    <!-- Main Area -->
    <!-- Main Area -->
        <div id="mainContainer">     
                 <!-- Left Nav Column -->
                <div id="leftzone">       
                         <NCI:TemplateSlot ID="cgvSectionNav" runat="server" CssClass="LeftNavSlot" />
                         <NCI:TemplateSlot ID="cgvLeftNav" runat="server" CssClass="LeftNavSlot" />                   
                </div>
                <!-- End Left Nav -->
                <!-- Main Content Area -->
                 <div class="contentzone">    
                    <a name="skiptocontent"></a>
                    <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"  />
                    <NCI:TemplateSlot ID="cgvRightNav" runat="server" />                    
                    <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBody" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBodyNav" runat="server" />
                <!-- End Content Area -->
		       </div>
    </div>
    <!-- End Main Area -->
    <!-- Footer -->
    <div id="footerzone" align="center">
        <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
    </div>
    <!-- End Foooter-->
    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>
