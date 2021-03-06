<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<!DOCTYPE html>
<html runat="server">
<head runat="server"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<script language="javascript" id="_fed_an_ua_tag" src="https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js?agency=HHS&subagency=NCI" async></script>
	<script src="//assets.adobedtm.com/f1bfa9f7170c81b1a9a9ecdcc6c5215ee0b03c84/satelliteLib-e2d4238892e44723cb52bc27724200218ab96baf.js"></script>
</head>
<body class="genHome">
	<div class="genSiteSkipToContent"><a title="Skip to content" href="#skiptocontent">Skip to Content</a></div>
	<!-- Branding Bar Slot (#genSlotBrandingBar) // TODO: Color class on slot determined by Content Type field value  -->
	<!-- <div class="clearFix red" id="genSlotBrandingBar"> -->
	<NCI:TemplateSlot ID="genSlotBrandingBar" runat="server" class="clearFix" />
	<!-- </div> -->
	<!-- END Branding Bar Slot (#genSlotBrandingBar) -->
	<div class="genSiteContainer">
		<!-- Site Banner Slot (#genSlotSiteBanner) -->
		<!-- <div id="genSlotSiteBanner" class="clearFix"> -->
			<!-- Site Banner Content // From Content Type in Slot -->
			<NCI:TemplateSlot ID="genSlotSiteBanner" runat="server"  class="clearFix"/>
			<!-- Site Banner Content -->
		<!-- </div> END Site Banner Slot (#genSlotSiteBanner) -->
		<!-- <div id="genSlotMainNav" class="clearFix"> -->
			<NCI:TemplateSlot ID="genSlotMainNav" runat="server"  class="clearFix"/>
		<!-- </div> -->
		<!-- END Main Navigation Slot (#genSlotMainNav) -->
		<div class="genSiteContentContainer clearFix"><a name="skiptocontent" id="skiptocontent "></a> 		
				
				<div class="genSiteRightColumn">
					<NCI:TemplateSlot ID="genSlotRightSidebar" runat="server"  />
				</div><!-- END Right Content Column (#genSiteRightColumn) -->
			
				<div class="genSiteContentColumn">
					<!-- Timely Content Slot (#genSlotTC) -->
					<!-- <div id="genSlotTC">  -->
						<NCI:TemplateSlot ID="genSlotTC" runat="server"  />
					<!-- </div> --> <!-- END Timely Content Slot (#genSlotTC) -->
					<!-- Body Slot (#genSlotBody) -->
					<!-- <div id="genSlotBody"> -->
						<NCI:TemplateSlot ID="genSlotBody" runat="server"  />
					<!-- </div> -->
					<!-- END Body Slot (#genSlotBody) -->
					<div class="genSlotColumnContainer clearFix">
					<NCI:TemplateSlot ID="genSlotColumn1" runat="server" />
					<NCI:TemplateSlot ID="genSlotColumn2" runat="server" />
					</div>
					<div class="genSiteHighlightContainer clearFix">
					<NCI:TemplateSlot ID="genSlotHighlight1" runat="server" />
					<NCI:TemplateSlot ID="genSlotHighlight2" runat="server" />
					<NCI:TemplateSlot ID="genSlotHighlight3" runat="server" />
					</div>
				</div>
		</div>
		<!-- Site Footer Slot (#genSlotSiteFooter) -->
		<!-- <div id="genSlotSiteFooter"> -->
			<NCI:TemplateSlot ID="genSlotSiteFooter" runat="server"  />
		<!-- </div> --><!-- END Site Footer Slot (#genSlotSiteFooter) -->
	</div><!-- END Site Container (#genSiteContainer) -->
    <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
    control else Web analytics scripts will not show up in the HTML-->
	<NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
	<script type="text/javascript">_satellite.pageBottom();</script>
</body>
</html>