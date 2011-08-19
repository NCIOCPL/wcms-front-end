﻿<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register tagPrefix="CGov" namespace="CancerGov.EmergencyAlert" assembly="CancerGov.EmergencyAlert" %>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="header" runat="server">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body runat="server">
    <!-- CGov Container -->
    <div id="cgovContainer">
    <!-- Site Banner -->
<div class="skip">
        <a title="Skip to content" href="#skiptocontent">Skip to content</a></div>  
    
    <div id="bannerDiv">
        <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
    </div>
    <CGov:EmergencyAlertBanner ID="EmergencyAlertBanner" runat="server" />       
    <!-- Content Header -->
    <div id="headerzone">
        <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
        <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
    </div>
    <!-- Main Area -->
    <!-- Left Navigation and Content Area -->
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
                    <NCI:TemplateSlot ID="cgvRightNav" runat="server" CssClass="RightNavSlot" />                    
                    <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />                    
                    <NCI:TemplateSlot ID="cgvBody" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBodyNav" runat="server" />
				</div>
                <!-- End Content Area -->                        
         </div>
    <!-- End Left Navigation and Content Area -->
     <!-- End Main Area -->
    <!-- Footer -->
    <div id="footerzone">
        <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
    </div>
    <!-- End Foooter-->
    </div>
    <!-- End CGovContainer--> 
    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
</body>
</html>
