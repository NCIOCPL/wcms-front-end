﻿<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
    
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
    <!-- Content Header -->
    <div id="headerzone">
        <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
        <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
    </div>
    <!-- Main Area -->
        <!-- Left Navigation and Content Area -->
    <div id="mainContainer">
        <table width="751" cellspacing="0" cellpadding="0" border="0">
            <tr>                        
                <!-- Main Content Area -->
                <td id="contentzone" valign="top" width="752">
                    <a name="skiptocontent"></a>
                    <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"  />
                    <NCI:TemplateSlot ID="cgvRightNav" runat="server">
                        <HeaderHtml>
                        <table cellspacing="0" cellpadding="0" border="0" align="right" width="167">
                            <tbody>
                                <tr>
                                    <td valign="top"><img height="1" border="0" width="8" alt="" src="/images/spacer.gif"/></td>
                                    <td width="159" valign="top">
                        </HeaderHtml>
                        <FooterHtml>
                                    </td>
                                </tr> 
                                <tr>
		                            <td valign="top" colspan="2"><img height="8" border="0" width="1" alt="" src="/images/spacer.gif"/></td>
	                            </tr>                                
                            </tbody>
                        </table>                        
                        </FooterHtml>
                    </NCI:TemplateSlot>
                    <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBody" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBodyNav" runat="server" />
                </td>
                <!-- End Content Area -->
                          </tr>
        </table>
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
