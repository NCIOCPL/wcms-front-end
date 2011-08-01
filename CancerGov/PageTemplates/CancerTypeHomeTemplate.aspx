﻿<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>

<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="header" runat="server">
    <title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body id="Body1" runat="server">
<!-- Centered Content (header, body, footer) -->
    <div id="cgovContainer">
    <!-- Site Banner and main navigation -->
<div class="skip">
        <a title="Skip to content" href="#skiptocontent">Skip to content</a></div>    
    <div id="bannerDiv">
        <NCI:TemplateSlot ID="cgvSiteBanner" runat="server" />
    </div>
    <!-- End Site Banner and main navigation -->
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
                <!-- Left Nav Column -->
                <td id="leftzone" valign="top">
                    <table border="0" cellspacing="0" cellpadding="0" width="164">
                        <NCI:TemplateSlot ID="cgvSectionNav" runat="server" CssClass="LeftNavSlot">
                            <HeaderHtml>
                                <tr>
                                    <td valign="top" align="left">                            
                            </HeaderHtml>
                            <FooterHtml>
                </td>
                <td valign="top">
                    <img src="/images/spacer.gif" border="0" alt="" width="16" height="1" />
                </td>
            </tr>
            </FooterHtml> </NCI:TemplateSlot>
            <tr>
                <td valign="top" align="left" width="164">
                    <NCI:TemplateSlot ID="cgvLeftNav" runat="server" CssClass="LeftNavSlot" />
                </td>
                <!-- So... there should be 6px rendered after each item. -->
                <td valign="top">
                    <img src="/images/spacer.gif" border="0" alt="" width="16" height="1" />
                </td>
            </tr>
        </table>
        </td>
        <!-- End Left Nav -->
        <!-- Main Content Area -->
        <td id="contentzone" valign="top" width="571">
        <a name="skiptocontent"></a>
            <NCI:TemplateSlot ID="cgvBodyHeader" runat="server" />
            <table width="571" border="0" cellspacing="0" cellpadding="0">
                <tr>                   
                    <td valign="top">
                        <img height="16" border="0" width="8" alt="" src="/images/spacer.gif" />
                    </td>                    
                </tr>
                <tr>
                
                    <td valign="top">
                        <NCI:TemplateSlot ID="cgvRightNav" runat="server" CssClass="LeftNavSlot">
                            <HeaderHtml>
                            <table cellspacing="0" cellpadding="0" border="0" align="right" width="167">
                                <tbody>                                
                                    <tr>
                                       <%--<td valign="top"><img height="1" border="0" width="8" alt="" src="/images/spacer.gif"/></td>--%>
                                        <td  valign="top" align="right">
                            </HeaderHtml>
                            <FooterHtml>
                    </td>
                    
                </tr>
                <tr>
                    <td valign="top" colspan="2">
                        <img height="8" border="0" width="1" alt="" src="/images/spacer.gif" />
                    </td>
                </tr>
                </tbody>
            </table>
            </FooterHtml> </NCI:TemplateSlot>

            <NCI:TemplateSlot ID="cgvCdrDefinition" runat="server">
            <HeaderHtml>
                </HeaderHtml>
                <FooterHtml>
                        <img height="5" border="0" width="1" alt="" src="/images/spacer.gif" />
                </FooterHtml>
                <%--<HeaderHtml>
                        <table cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr>                                                                 
                                    <td valign="top">
                </HeaderHtml>
                <FooterHtml>
        </td>
        </tr>
        <tr>
            <td>
                <td valign="top">
                    <img height="13" border="0" width="1" alt="" src="/images/spacer.gif" />
                </td>
            </td>
        </tr>
        <tr>
        <td><hr /></td>
<%--            <td valign="top" bgcolor="#999999">
                <img border="0" alt="" src="/images/spacer.gif" height="1" border="0">
            </td>comment
        </tr>
        <tr>
            <td>
                <td valign="top">
                    <img height="1" border="0" width="1" alt="" src="/images/spacer.gif" />
                </td>
            </td>
        </tr>
        </tbody> </table> </FooterHtml>--%> </NCI:TemplateSlot>
        
        <NCI:TemplateSlot ID="cgvBody" runat="server"  />
        <NCI:TemplateSlot ID="cgvBodyLeft" runat="server">
            <HeaderHtml>
                        <table cellspacing="0" cellpadding="0" border="0" align="left" width="202">
                            <tbody> 
                                <tr>
                                    <td valign="top">
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
        <NCI:TemplateSlot ID="cgvBodyRight" runat="server">
            <HeaderHtml>
                        <table cellspacing="0" cellpadding="0" border="0" align="left" width="202">
                            <tbody>
                                <tr>
                                    <td valign="top"><img height="1" border="0" width="8" alt="" src="/images/spacer.gif"/></td>
                                    <td  valign="top">
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
        </td> </tr> <a name="skiptocontent"></a>
        <NCI:TemplateSlot ID="cgvMpToc" runat="server" />
        <NCI:TemplateSlot ID="cgvBodyNav" runat="server" />
        </table> </td>
        <!-- End Content Area -->      
        </tr> </table>   
    <!-- End Main Area -->
    </div>
    <!-- End Left Navigation and Content Area -->
    <!-- Footer -->
    <div id="footerzone">
        <NCI:TemplateSlot ID="cgvFooter" runat="server" RemoveIfEmpty="false" />
    </div>
    <!-- End Foooter-->
    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this 
    control else Web analytics scripts will not show up in the HTML-->
    <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
     </div>
     <!-- END Centered Content (header, body, footer) -->
</body>
</html>
