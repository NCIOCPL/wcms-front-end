<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration"
    TagPrefix="Config" %>

<!DOCTYPE html> 
<html> 
	<head id="header" runat="server">
        <title></title>
        <!-- CGov Mobile Header Info -->
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <!-- CGov Mobile Header Info End-->    
	</head> 
<body runat="server">
<!-- CGov Mobile Container -->
<div data-role="page" id="searchPage">
  <!-- Site Banner -->
  <NCI:TemplateSlot ID="cgvMobileSiteBanner" runat="server" />  
  <!-- Site Banner End-->
  
  <!-- Main Area --> 
  
    <!-- Main Content Area -->
	<div data-role="content" class="content">
	
<NCI:MobileLanguageToggleControl ID="langtoggle" runat="server">
	<MobileLanguageToggles>
		<Config:MobileLanguageToggle Language="en">
		<Template><div class="languageToggle"><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select Espanol');">Espa&#241;ol</a></div></Template>
		</Config:MobileLanguageToggle>
		<Config:MobileLanguageToggle Language="es">
		<Template><div class="languageToggle"><a href="{0}" class="ui-link" onclick="NCIAnalytics.ClickLink(this,'Language Select English');">English</a></div></Template>
		</Config:MobileLanguageToggle>
	</MobileLanguageToggles>
</NCI:MobileLanguageToggleControl>
	  <div class="body-container">
	  <NCI:TemplateSlot ID="cgvMobileTitleSlot" runat="server" />
      
<NCI:AddThisButtonListControl ID="AddThisButtonList1" runat="server">
	<AddThisButtonLanguages>
		<NCI:AddThisButtonLanguageItem Language="en" Compact="print" Expanded="favorites,digg,google,live,reddit,twitter,delicious,facebook,linkedin,myspace,stumbleupon">
			<ButtonsCollection>
				<NCI:AddThisButtonItem Service="email" />
				<NCI:AddThisButtonItem Service="facebook" />
				<NCI:AddThisButtonItem Service="twitter" />
				<NCI:CustomAddThisButtonItem Service="plus.google.com" Name="Google+" Url="http://plus.google.com?url={{url}}&title={{title}}" Icon="http://htmldev.cancer.gov/m/images/Google-Plus-32.png" />
				<NCI:AddThisButtonItem Service="compact" />
			</ButtonsCollection>
		</NCI:AddThisButtonLanguageItem>
		<NCI:AddThisButtonLanguageItem Language="es" Compact="print" Expanded="favorites,digg,google,live,reddit,twitter,delicious,facebook,linkedin,myspace,stumbleupon">
			<ButtonsCollection>
				<NCI:AddThisButtonItem Service="email" />
				<NCI:AddThisButtonItem Service="facebook" />
				<NCI:AddThisButtonItem Service="twitter" />
				<NCI:CustomAddThisButtonItem Service="plus.google.com" Name="Google+" Url="http://plus.google.com?url={{url}}&title={{title}}" Icon="http://htmldev.cancer.gov/m/images/Google-Plus-32.png" />
				<NCI:AddThisButtonItem Service="compact" />
			</ButtonsCollection>
		</NCI:AddThisButtonLanguageItem>

	</AddThisButtonLanguages>
</NCI:AddThisButtonListControl>
      
      <NCI:TemplateSlot ID="cgvMobileBody" runat="server" />
      <NCI:TemplateSlot ID="cgvMobileNav" runat="server" />
      </div>
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
</body>
</html>