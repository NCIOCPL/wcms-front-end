<%@ Page Language="C#" AutoEventWireup="true" Inherits="NCI.Web.CDE.UI.WebPageAssembler" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.WebControls"
    TagPrefix="NCI" %>
<%@ Register Assembly="NCILibrary.Web.ContentDeliveryEngine.UI" Namespace="NCI.Web.CDE.UI.Configuration"
    TagPrefix="Config" %>
<%@ Register tagPrefix="CGov" namespace="CancerGov.EmergencyAlert" assembly="CancerGov.EmergencyAlert" %>
<!doctype html>
<html>
<head id="header" runat="server">
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- This is to make content width follow different rules for IE7 and below -->
<!--[if lt IE 8]>
<style type="text/css">
.contentzone-defaultTemplateContentContainer{
	width: 650px !important;
	padding-right: 50px !important;
}
.cgvBody-defaultTemplateContentContainer {
	padding-right: 0 !important;
  width: auto !important;
}
ul.ctpListPageList {
	width: 400px !important;
}
</style>
</head>

<!-- Language Toggle -->
<div class="languageToggle" align="right">
<NCI:LanguageToggleControl ID="LangList1" runat="server">
	<LanguageToggleLanguages>
		<NCI:LanguageToggleLanguageItem Language="en">
			<LangsCollection>
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="es">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="pt">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="zh-cn" Name="Chinese" Title="&#20013;&#25991;" OnClick="NCIAnalytics.ClickLink(this,'Language Select Chinese');" /> 
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
		<NCI:LanguageToggleLanguageItem Language="zh">
			<LangsCollection>
				<NCI:LanguageToggle Locale="en-us" Name="English" Title="English" Url="/" OnClick="NCIAnalytics.ClickLink(this,'Language Select English');" />
				<NCI:LanguageToggle Locale="es-us" Name="Spanish" Title="Espa&ntilde;ol" Url="/espanol" OnClick="NCIAnalytics.ClickLink(this,'Language Select Spanish');" />
				<NCI:LanguageToggle Locale="pt-br" Name="Portuguese" Title="Portugu&ecirc;s" OnClick="NCIAnalytics.ClickLink(this,'Language Select Portuguese');" />
			</LangsCollection>
		</NCI:LanguageToggleLanguageItem>
	</LanguageToggleLanguages>
</NCI:LanguageToggleControl>
</div>

<!-- slots -->

<!--Page Options Bar-->
<div class="page-options">
	<NCI:PageOptionsControl ID="PageOptionsControl1" runat="server">
		<PageOptionsButtonLanguages>
			<NCI:PageOptionsButtonLanguageItem Language="en">
				<ButtonsCollection>
					<NCI:LinkButtonItem Title="View entire document" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
					<NCI:LinkButtonItem Title="Print" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
					<NCI:EmailButtonItem Title="Email" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				</ButtonsCollection>
			</NCI:PageOptionsButtonLanguageItem>
			<NCI:PageOptionsButtonLanguageItem Language="es">
				<ButtonsCollection>
					<NCI:LinkButtonItem Title="Ver el documento completo" CssClass="po-view-entire-document" AlternateContentVersionKey="viewall" />
					<NCI:LinkButtonItem Title="Imprimir" CssClass="po-print" AlternateContentVersionKey="print" WebAnalytics="NCIAnalytics.PrintLink(this);" />
					<NCI:EmailButtonItem Title="Enviar por correo electr&oacute;nico" CssClass="po-email" AlternateContentVersionKey="email" WebAnalytics="NCIAnalytics.eMailLink(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="facebook" Title="Facebook" CssClass="po-facebook" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="twitter" Title="Twitter" CssClass="po-twitter" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="google_plusone_share" Title="Google+" CssClass="po-googleplus" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
					<NCI:PageOptionsAddThisButtonItem Service="pinterest_share" Title="Pinterest" CssClass="po-pinterest" AlternateContentVersionKey="bookmarkshare" WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
				</ButtonsCollection>
			</NCI:PageOptionsButtonLanguageItem>
		</PageOptionsButtonLanguages>
	</NCI:PageOptionsControl>
</div>

<!-- slots -->

</body>
</html>