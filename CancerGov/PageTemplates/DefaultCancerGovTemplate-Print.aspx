 <%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
	
<%@ Register src="/SnippetTemplates/TableofLinks.ascx" tagname="TableofLinks" tagprefix="uc1" %>
	
<%@ Register src="/SnippetTemplates/GlossaryTerms.ascx" tagname="GlossaryTerms" tagprefix="uc2" %>
	
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
        <a title="Skip to content" href="#skiptocontent">Skip to content</a>
        </div>  
	
    <div id="bannerDiv">
        <NCI:TemplateSlot ID="cgvSiteBannerPrint" runat="server" />
    </div>
	

	<!-- Content Header --> 
    <div id="headerzone">
        <NCI:TemplateSlot ID="cgvContentHeader" runat="server" />
        <NCI:TemplateSlot ID="cgvLanguageDate" runat="server" />
    </div>
    <!-- Main Area -->
    <!-- Left Navigation and Content Area -->
    <div id="mainContainer">	
				<!-- Main Content Area -->
				<a name="skiptocontent"></a>
            <NCI:TemplateSlot ID="cgvBodyHeader" runat="server"  />
                <NCI:TemplateSlot ID="cgvRightNav" runat="server" />                
            <NCI:TemplateSlot ID="cgvMpToc" runat="server"  />
                    <NCI:TemplateSlot ID="cgvBody" runat="server"  />
			<!-- Glossary of Terms -->
 		    <uc2:GlossaryTerms ID="GlossaryTerms1" runat="server" />
                   
			<!-- Link Extraction -->
		    <uc1:TableofLinks ID="TableofLinks1" runat="server" />
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

