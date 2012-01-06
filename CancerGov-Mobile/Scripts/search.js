function toggle() {
	
	var imgTag = "<img src='/publishedcontent/images/images/icon-search.png' height='35'>";

    if ($('meta[name="content-language"]').attr("content") == "es") {
	
	var imgTag = "<img src='/publishedcontent/images/images/icon-search-es.png' height='35'>";
    }
	
	var ele = document.getElementById("toggleText");
	var text = document.getElementById("displayText");
	if(ele.style.display == "block") {
    		ele.style.display = "none";
		text.innerHTML = imgTag;
  	}
	else {
		ele.style.display = "block";
		text.innerHTML = imgTag;
	}
} 