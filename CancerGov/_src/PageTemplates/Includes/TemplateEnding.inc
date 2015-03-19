<!--(bake-start _if="comment-block")-->
<!--
    This include is the bottom of all templates.
-->
<!--(bake-end)-->
        </div> <!-- END Page -->

        <!-- FOOTER -->
        <footer class="site-footer">
            <NCI:TemplateSlot ID="nvcgSlFooter" runat="server" />
        </footer>
        <!-- END FOOTER -->

        <!-- TO INSERT WEB ANALYTICS CODE. Every template should have this
        control else Web analytics scripts will not show up in the HTML-->
        <NCI:WebAnalyticsControl ID="WebAnalyticsControl1" runat="server" />
    </body>

</html>