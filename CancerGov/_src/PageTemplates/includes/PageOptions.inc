<!--(bake-start _if="comment-block")-->
<!--
    This include is the page options for all pages.  As some options are hidden for certain types, this include takes in
     the following parameters:
     - resize : set true if you want the resize option
-->
<!--(bake-end)-->
<div class="page-options-container">
    <!-- PAGE OPTIONS -->
    <div id="PageOptionsControl1" class="page-options no-resize {{css-class}}">
        <ul>
            <!--(bake-start _if="resize")-->
                <li class="page-options--resize">
                    <a title="Resize font" aria-label="Resize font" href="#"></a>
                </li>
            <!--(bake-end)-->
            <!--(bake-start _if="print")-->
                <li class="page-options--print">
                    <a title="Print" aria-label="Print" href="#"></a>
                </li>
            <!--(bake-end)-->
            <!--(bake-start _if="email")-->
                <li class="page-options--email">
                    <a title="Email" aria-label="Email" href="#"></a>
                </li>
            <!--(bake-end)-->
            <!--(bake-start _if="facebook")-->
                <li class="social-share social-share--facebook">
                    <a title="Facebook" aria-label="Facebook" href="#"></a>
                </li>
            <!--(bake-end)-->
            <!--(bake-start _if="twitter")-->
                <li class="social-share social-share--twitter">
                    <a title="Twitter" aria-label="Twitter" href="#"></a>
                </li>
            <!--(bake-end)-->
            <!--(bake-start _if="pinterest")-->
                <li class="social-share social-share--pinterest">
                    <a title="Pinterest" aria-label="Pinterest" href="#"></a>
                </li>
            <!--(bake-end)-->
        </ul>
    </div>
    <!-- END PAGE OPTIONS -->
</div>