
function gotoHash(id, $){
var linkto = document.getElementById(id);
var parent = linkto.parentNode;
var sib;
var kid;
var sibList;
var kidList;

while(parent != document){
	if($(parent).hasClass('ui-collapsible-content') && $(parent).hasClass('ui-collapsible-content-collapsed')){
		sibList = parent.parentNode.childNodes
		for(var i = 0; i< sibList.length; i++){			
		sib = sibList[i];
			if($(sib).hasClass('ui-collapsible-heading')){
			kidList = sib.childNodes;
			for(var j = 0; j< kidList.length; j++){		
				kid = kidList[i];
					if($(kid).hasClass('ui-collapsible-heading-toggle')){
						$(kid).click();
						
					}
				}
			}
			
		}
	}
	parent = parent.parentNode;
}

return true;
}


jQuery(document).ready(function($) {
if(location.hash != ""){
	var id = location.hash.substring(1,location.hash.length);
	if(id!=""){
		gotoHash(id,$);
	}
	
	$("html, body").animate({ scrollTop: $(location.hash).offset().top }, 1000);
}
$('.body-container').find('a[href*="#"]').bind('click', function(e){
if (this.baseURI == document.baseURI){
	var id = this.hash.substring(1,this.hash.length);
	if(id!=""){
		gotoHash(id,$);
	}
	return true;
	}
}
);
});


