<!--(bake-start _if="comment-block")-->
<!--
    This include is the page options for all pages.  As some options are hidden for certain types, this include takes in
     the following parameters:
     - resize : set true if you want the resize option
-->
<!--(bake-end)-->
<!-- PAGE OPTIONS -->
<NCI:PageOptionsControl ID="PageOptionsControl1" CssClass="{{css-class}}" runat="server">
    <PageOptionsButtonLanguages>
        <NCI:PageOptionsButtonLanguageItem Language="en">
            <ButtonsCollection>
                <!--(bake-start _if="resize")-->
                <NCI:LinkButtonItem
                    Title="Resize font"
                    CssClass="po-font-resize"
                    AlternateContentVersionKey="fontResize" />
                <!--(bake-end)-->
                <NCI:LinkButtonItem Title="Print"
                                    CssClass="po-print"
                                    AlternateContentVersionKey="print"
                                    WebAnalytics="NCIAnalytics.PrintLink(this);" />
                <NCI:EmailButtonItem Title="Email"
                                     CssClass="po-email"
                                     AlternateContentVersionKey="email"
                                     WebAnalytics="NCIAnalytics.eMailLink(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="facebook"
                                                  Title="Facebook"
                                                  CssClass="po-facebook"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="twitter"
                                                  Title="Twitter"
                                                  CssClass="po-twitter"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share"
                                                  Title="Google+"
                                                  CssClass="po-googleplus"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="pinterest_share"
                                                  Title="Pinterest"
                                                  CssClass="po-pinterest"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
            </ButtonsCollection>
        </NCI:PageOptionsButtonLanguageItem>
        <NCI:PageOptionsButtonLanguageItem Language="es">
            <ButtonsCollection>
                <!--(bake-start _if="resize")-->
                <NCI:LinkButtonItem
                    Title="Control de tama&ntilde;o de fuente"
                    CssClass="po-font-resize"
                    AlternateContentVersionKey="fontResize" />
                <!--(bake-end)-->
                <NCI:LinkButtonItem
                    Title="Imprimir"
                    CssClass="po-print"
                    AlternateContentVersionKey="print"
                    WebAnalytics="NCIAnalytics.PrintLink(this);" />
                <NCI:EmailButtonItem
                    Title="Enviar por correo electr&oacute;nico"
                    CssClass="po-email"
                    AlternateContentVersionKey="email"
                    WebAnalytics="NCIAnalytics.eMailLink(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="facebook"
                                                  Title="Facebook"
                                                  CssClass="po-facebook"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="twitter"
                                                  Title="Twitter"
                                                  CssClass="po-twitter"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="google_plusone_share"
                                                  Title="Google+"
                                                  CssClass="po-googleplus"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
                <NCI:PageOptionsAddThisButtonItem Service="pinterest_share"
                                                  Title="Pinterest"
                                                  CssClass="po-pinterest"
                                                  AlternateContentVersionKey="bookmarkshare"
                                                  WebAnalytics="NCIAnalytics.BookmarkShareClick(this);" />
            </ButtonsCollection>
        </NCI:PageOptionsButtonLanguageItem>
    </PageOptionsButtonLanguages>
</NCI:PageOptionsControl>
<!-- END PAGE OPTIONS -->