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
            <!--(bake-start _if="resize=='true'")-->
                <li class="page-options--resize">
                    <a title="Resize font" href="#"></a>
                </li>
            <!--(bake-end)-->
            <li class="page-options--print">
                <a title="Print" href="#"></a>
            </li>
            <li class="page-options--email">
                <a title="Email" href="#"></a>
            </li>
            <li class="social-share social-share--facebook">
                <a class="" title="Facebook" href="#"></a>
            </li>
            <li class="social-share social-share--twitter">
                <a class="" title="Twitter" href="#"></a>
            </li>
            <li class="social-share social-share--googleplus">
                <a class="" title="Google+" href="#"></a>
            </li>
            <li class="social-share social-share--pinterest">
                <a class="" title="Pinterest" href="#"></a>
            </li>
        </ul>
    </div>
    <!-- END PAGE OPTIONS -->
</div>