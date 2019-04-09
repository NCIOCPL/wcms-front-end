console.log("This file should only be loaded for NCI Connect");
import './purple.scss';

const onDOMContentLoaded = () => {
  var micrositeSnippet = function(i) {
    function e() {
      var i = $("#microsite-a");
      var $this;
      i.length > 0 && ($("#nvcgSlUtilityBar").addClass("micro-a"), $(".row.guide-card").addClass("micro-a"), $(".feature-primary-title h3, .guide-title h2").each(function(i) {
        $this = $(this), $this.html().trim() || $this.remove()
      }), "/" == $(".breadcrumbs li a").first().attr("href") && $(".breadcrumbs li").first().remove())
    }
    var t = !1;
    return {
      init: function() {
        t || (e(), t = !0)
      }
    }
  }
  $(document).ready(function() {
    micrositeSnippet().init()
  });
  };
  
  document.addEventListener('DOMContentLoaded',onDOMContentLoaded);