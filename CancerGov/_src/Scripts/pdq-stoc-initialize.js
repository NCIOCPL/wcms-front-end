$(function () {
	var mysplit = window.location.pathname.split("/");
	var pagename = mysplit[mysplit.length - 1];

	if ($(".expandable-container").length > 0) {
		$(".expandable-container").supersizeme({});
	}
	//The toptoc function creates the "Sections" top-level TOC
	$("#_toptoc").topToc({
		search: "article",
		start: 2,
		depth: 1,
		tocTitleEn: "Sections",
		tocTitleEs: "Secciones",
		topToc: 1
	});


	/* do things between topToc and stoc */
	//The showSection function handles the display/hide of individual sections
	//as those are clicked on the "Sections" TOC
	$("#_toptoc ul").showSection({});

	//The stoc function on the "article" container creates the
	//document level TOC
	$("#_toc_articleX").stoc({
		search: "article",
		start: 3,
		depth: 5,
		tocTitleEn: "Table of Contents",
		tocTitleEs: "Tabla de contenidos para esta (document???)"
	});

	// run stoc last
	switch (pagename) {
	case "cancertypes-nsclc-pdq-hp.shtml":
		//These stoc calls are creating the section level TOC
		$("#_toc_section_118_1").stoc({
			search: "#_section_118_1",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_134_2").stoc({
			search: "#_section_134_2",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_3_3").stoc({
			search: "#_section_3_3",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_4_4").stoc({
			search: "#_section_4_4",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_5_5").stoc({
			search: "#_section_5_5",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_6_6").stoc({
			search: "#_section_6_6",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_7_7").stoc({
			search: "#_section_7_7",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_8_8").stoc({
			search: "#_section_8_8",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_9_9").stoc({
			search: "#_section_9_9",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_10_10").stoc({
			search: "#_section_10_10",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_11_11").stoc({
			search: "#_section_11_11",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_12_12").stoc({
			search: "#_section_12_12",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_13_13").stoc({
			search: "#_section_13_13",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_14_14").stoc({
			search: "#_section_14_14",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_164_4").stoc({
			search: "#_section_164_4",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_205_5").stoc({
			search: "#_section_205_5",
			start: 4,
			depth: 2,
			tocTitleEn: "",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		$("#_toc_section_AboutThis_1_9").stoc({
			search: "#_section_AboutThis_1_9",
			start: 4,
			depth: 2,
			tocTitleEn: "",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		break;

	case "cancertypes-nsclc-pdq-patient.shtml":
		//These stoc calls are creating the section level TOC
		$("#_toc_section_162_x").stoc({
			search: "#_section_162_3",
			start: 3,
			depth: 2,
			tocTitleEn: "Dada"
		});
		$("#_toc_section_205_5").stoc_kp({
			search: "#_section_205_5",
			start: 3,
			depth: 2,
			kp: 1
		});
		$("#_toc_section_231_6").stoc({
			search: "#_section_231_6",
			start: 3,
			depth: 2,
			kp: 1
		});
		$("#_toc_section_310_7").stoc({
			search: "#_section_310_7",
			start: 3,
			depth: 2,
			tocTitleEn: "Table of content for this section",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		$("#_toc_section_AboutThis_1_9").stoc({
			search: "#_section_AboutThis_1_9",
			start: 3,
			depth: 2,
			tocTitleEn: "Table of content for this section",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		break;

	case "cancertypes-nsclc-pdq-patient-es.shtml":
		//These stoc calls are creating the section level TOC
		$("#_toc_section_118_1").stoc_kp({
			search: "#_section_118_1",
			start: 4,
			depth: 2,
			kp: 1
		});
		$("#_toc_section_134_2").stoc_kp({
			search: "#_section_134_2",
			start: 4,
			depth: 2,
			kp: 1
		});
		$("#_toc_section_164_4").stoc_kp({
			search: "#_section_164_4",
			start: 4,
			depth: 2,
			kp: 1
		});
		$("#_toc_section_205_5").stoc_kp({
			search: "#_section_205_5",
			start: 3,
			depth: 2,
			kp: 1,
			tocTitleEn: "",
			tocTitleEs: ""
		});
		$("#_toc_section_AboutThis_1_9").stoc_kp({
			search: "#_section_AboutThis_1_9",
			start: 4,
			depth: 2,
			tocTitleEn: "Table of content for this section",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		break;

	case "cancertypes-colorectal-pdq-hp.shtml":
		//These stoc calls are creating the section level TOC
		$("#_toc_section_118_1").stoc({
			search: "#_section_118_1",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_134_2").stoc({
			search: "#_section_134_2",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_3_3").stoc({
			search: "#_section_3_3",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_4_4").stoc({
			search: "#_section_4_4",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_5_5").stoc({
			search: "#_section_5_5",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_6_6").stoc({
			search: "#_section_6_6",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_7_7").stoc({
			search: "#_section_7_7",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_8_8").stoc({
			search: "#_section_8_8",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_9_9").stoc({
			search: "#_section_9_9",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_10_10").stoc({
			search: "#_section_10_10",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_11_11").stoc({
			search: "#_section_11_11",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_12_12").stoc({
			search: "#_section_12_12",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_13_13").stoc({
			search: "#_section_13_13",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_14_14").stoc({
			search: "#_section_14_14",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_164_4").stoc({
			search: "#_section_164_4",
			start: 4,
			depth: 2,
			kp: 1,
			tocTitleEn: ""
		});
		$("#_toc_section_205_5").stoc({
			search: "#_section_205_5",
			start: 4,
			depth: 2,
			tocTitleEn: "",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		$("#_toc_section_AboutThis_1_9").stoc({
			search: "#_section_AboutThis_1_9",
			start: 4,
			depth: 2,
			tocTitleEn: "",
			tocTitleEs: "Tabla de contenidos para esta secci&#243;n"
		});
		break;

	default:
		break;
	}
});