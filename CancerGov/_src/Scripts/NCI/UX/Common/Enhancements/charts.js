define(function(require) {
// Module Constructor - matching Highcarts' arguments of target, options
	var Chart = function (target, options) {
		this.defaultSettings = {
			type: 'pie',
			colors: [
				'#40bfa2',
				'#984e9b',
				'#fb7830',
				'#01acc8',
				'#2A71A4',
				'#82378C',
				'#BB0E3C',
				'#FE9F65',
				'#7F99B4',
				'#80DDC2',
				'#329FBE',
				'#706E6F',
				'#1C4A79'
			],
			bgColors: [
				'#ffffff',
				'#f0f0ff'
			],
			font: 'DIN-Condensed-Bold, Arial, sans-serif',
			title: {
				color: '#80378b'
			},
			subtitle: {
				color: '#80378b'
			},
			drilldown: {}
		};

		// extend defaults with settings
		this.settings = $.extend(true,{}, this.defaultSettings, options);
		this.settings.target = target;

		if (typeof window.fetchingHighcharts == "undefined") {
			window.fetchingHighcharts = false;
		}

		this.init();

	};

// Module methods
	Chart.prototype = function () {
		var loadHighcharts = function () {

			var dfd = $.Deferred();

			if (typeof Highcharts == 'undefined' && !window.fetchingHighcharts) {
				console.log("loading Highcharts");
				console.time("Highcharts Load Time");
				window.fetchingHighcharts = true;
				$.when(
					$.getScript('https://code.highcharts.com/highcharts.src.js'),
					$.getScript('https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.1/tinycolor.min.js')
				).then(function () {
					console.log("loading Highchart plug-ins");
					return $.when(
						$.getScript('https://code.highcharts.com/modules/exporting.js'),
						$.getScript('https://code.highcharts.com/modules/accessibility.js'),
						$.getScript('https://code.highcharts.com/modules/drilldown.js')
					).done(function () {
						console.log("Highcharts plug-ins loaded");
						window.fetchingHighcharts = false;
						console.timeEnd("Highcharts Load Time");
						dfd.resolve();
					});
				});
			} else {
				console.log("Highcharts is loading...");

				function isHighchartsLoaded () {
					if (typeof Highcharts == "undefined" || typeof Highcharts == "object" && window.fetchingHighcharts) {
						setTimeout(function () {
							console.log("Highcharts is not ready yet...");
							isHighchartsLoaded();
						}, 100);
					} else {
						console.log("Highcharts and plug-ins are loaded");
						dfd.resolve();
					}
				}

				isHighchartsLoaded();

			}

			return dfd.promise();
		};

		var initialize = function () {

			var module = this;

			$.when(loadHighcharts.call(module)).done(function () {
				//console.log("Highcharts is present");
				baseTheme.call(module);

				if (module.settings.chart.type in module) {
					console.log("rendering custom chart:", module.settings.chart.type);
					module[module.settings.chart.type].call(module);
				} else {
					console.log("rendering default chart:", module.settings.chart.type);
					module.instance = Highcharts.chart(module.settings.target, module.settings)
				}
			});

		};

		var baseTheme = function () {
			console.log("applying base theme");
			// theme settings for NCI
			var theme = {
				colors: this.settings.colors,
				chart: {
					backgroundColor: {
						linearGradient: [0, 0, 500, 500],
						stops: [
							[0, this.settings.bgColors[0]],
							[1, this.settings.bgColors[1]]
						]
					},
					style: {
						fontFamily: 'DIN-Condensed, Arial, sans-serif',
						color: '#80378b'
					},
					height: 400
				},
				title: {
					text: this.settings.title.text,
					style: {
						color: this.settings.title.color,
						fontSize: '25px',
						fontWeight: 'bold'
					}
				},
				subtitle: {
					text: this.settings.subtitle.text,
					style: {
						color: this.settings.subtitle.color,
						fontSize: '16px',
						fontWeight: 'normal'
					}
				},
				legend: {
					itemStyle: {
						color: '#58595b'
					}
				},
				credits: {
					text: 'cancer.gov',
					href: 'http://www.cancer.gov'
				},
				lang: {
					thousandsSep: ','
				},
				// plotOptions: {
				//     pie: {
				//         cursor: 'pointer',
				//         dataLabels: {
				//             enabled: true,
				//             distance: 15,
				//             crop: false,
				//             overflow: 'none',
				//             allowOverlap: true,
				//             y: -2,
				//             style: {
				//                 textOutline: false,
				//                 fontSize: '11px',
				//                 fontFamily: '"Noto Sans", Arial, sans-serif'
				//             }
				//         }
				//     }
				// },
				tooltip: {
					hideDelay: 150,
					followTouchMove: false
				},
				drilldown: {
					activeAxisLabelStyle: {
						textDecoration: 'none !important',
						fontStyle: 'italic'
					},
					activeDataLabelStyle: {
						textDecoration: 'none',
						color: '{point.color}'
					},
					drillUpButton: {
						position: {
							y: 80
						},
						relativeTo: 'spacingBox'
					}
				},
				// making axis labels and titles gray
				xAxis: {
					labels: {
						style: {
							color: '#58595b'
						}
					},
					title: {
						style: {
							color: '#58595b'
						}
					}
				},
				yAxis: {
					labels: {
						style: {
							color: '#58595b'
						}
					},
					title: {
						style: {
							color: '#58595b'
						}
					}
				},
				zAxis: {
					labels: {
						style: {
							color: '#58595b'
						}
					},
					title: {
						style: {
							color: '#58595b'
						}
					}
				}
			};

			// Apply the theme
			Highcharts.setOptions(theme);
		};

		var generateDrilldownColors = function(drilldown){

			//var drilldown = this.settings.drilldown;


			if(typeof drilldown.series == "object") {

				for (var i = 0; i < drilldown.series.length; i++) {
					var obj = drilldown.series[i];
					if (typeof obj.data == "object") {
						var colors = tinycolor(this.settings.colors[i]).analogous(obj.data.length, 5);
						obj.colors = colors.map(function (t) { return t.toHexString(); });
					}
				}
			}

			return drilldown;

		};

		var NCI_pie = function () {

			var module = this;

			var seriesSettings = {
				innerSize: '60%'
			};
			var drilldownSettings = {
				innerSize: '60%'
			};

			var totalText;

			if (Object.keys(this.settings.drilldown).length > 0) {
				for (var i = 0; i < this.settings.drilldown.series.length; i++) {
					$.extend(this.settings.drilldown.series[i], drilldownSettings);
					//this.settings.drilldown.series[i].id = this.settings.drilldown.series[i].name;
				}
			}

			$.extend(true, this.settings.series[0], seriesSettings);

			// console.log("pie settings",this.settings);

			//this.instance = Highcharts.chart(this.settings.target, this.settings);

			var presets = {
				tooltip: {
					// pointFormat: '{series.name}: <b>{point.y:.1f}%</b>: <b>{point.percentage:.1f}%</b>',
					formatter: function () {
						return '<b>' + this.point.name + '</b><br/>Budget: $' + Highcharts.numberFormat(this.y, 0);
						// return '<b>' + this.point.name + '<br/>$' + Highcharts.numberFormat(this.y, 0) + '</b> <br />' + Highcharts.numberFormat(this.percentage, 1) +'%';
					}
				},
				chart: {
					type: 'pie',
					events: {
						// drilldown: function () {
						//     // console.log(this);
						//     //this.chartHeight += 70;
						//     //this.series[0].chart.marginBottom += 70;
						// },
						load: function (chart) {

							if(module.settings.showTotal) {

								var pie = this.series[0],
									left = this.plotLeft + pie.center[0],
									top = this.plotTop + pie.center[1] - 4;

								totalText = this.renderer.text("TOTAL<br/>$" + Highcharts.numberFormat(pie.total, 0));

								totalText.attr({
									'text-anchor': 'middle',
									id: 'donutText',
									x: left,
									y: top,
									style: 'color:#585757;font:bold 14px ' + module.settings.font + ';'
								}).add();
							}
						},
						redraw: function () {
							if(module.settings.showTotal) {
								var pie = this.series[0],
									left = this.plotLeft + pie.center[0],
									top = this.plotTop + pie.center[1] - 4;

								if (typeof totalText != 'undefined') {

									totalText.element.lastChild.innerHTML = "$" + Highcharts.numberFormat(this.series[0].data[0].total, 0);
									totalText.attr({
										x: left,
										y: top
									})
								}
							}
						}
					}
				},

				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle'
				},

				series: this.settings.series,
				//drilldown: this.settings.drilldown,
				drilldown: generateDrilldownColors.call(this, this.settings.drilldown),

				plotOptions: {
					pie: {
						size: '90%',
						dataLabels: {
							enabled: true,
							distance: 15,
							crop: false,
							overflow: 'none',
							allowOverlap: true,
							y: -6,
							style: {
								textOutline: false,
								fontSize: '16px',
								fontFamily: this.settings.font,
								color: '#58595b'
							},
							formatter: function (label) {
								return '<span>' + Highcharts.numberFormat(this.percentage, 1) + '%</span>';
								//return '<span style="color:' + this.point.color + '">' + Highcharts.numberFormat(this.percentage, 1) + '%</span>';
								//return '<span style="color:' + this.point.color + '">' + this.point.name + '</span>';
							}
						},
						showInLegend: true
					}
				},
				responsive: {
					rules: [{
						condition: {
							maxWidth: 610
						},
						chartOptions: {
							chart: {
								height: 600
							},
							spacingLeft: 0,
							spacingRight: 0,
							legend: {
								align: 'center',
								verticalAlign: 'bottom',
								layout: 'vertical'
							}
						}
					}
						// ,
						// {
						//     condition: {
						//         minWidth: 650
						//     },
						//     chartOptions: {
						//         plotOptions: {
						//             pie: {
						//                 dataLabels: {
						//                     y: -6,
						//                     style: {
						//                         fontSize: '16px'
						//                     }
						//                 }
						//             }
						//         }
						//     }
						// }
					]
				}
			};

			var chartSettings = $.extend(true, presets, this.settings);

			//force the chart type to pie
			chartSettings.chart.type = "pie";

			this.instance = Highcharts.chart(this.settings.target, chartSettings);

		};

		var NCI_bar = function () {

			var module = this;

			var presets = {
				chart: {
					type: 'column'
				},
				legend: {
					enabled: true,
					itemStyle: 'cursor:default',
					itemHoverStyle: 'none'

				},
				plotOptions: {
					column: {
						pointPadding: 0.2,
						borderWidth: 0
					}
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><div class="flexTable--2cols">',
					pointFormat: '<div style="color:{series.color};">{series.name}: </div><div><b>{point.y}</b></div>',
					footerFormat: '</div>',
					shared: true,
					useHTML: true
				}
			};

			var chartSettings = $.extend(true, presets, module.settings);

			//force the chart type to bar or column
			chartSettings.chart.type = this.settings.chart.type == 'NCI_bar' ? 'bar' : 'column';

			console.log(chartSettings);

			this.instance = Highcharts.chart(this.settings.target, chartSettings);
		};

		var NCI_averageCost = function () {

			// console.log("averageCost settings:",this.settings);

			var module = this;

			// Highcharts.Axis.prototype.hasData = function () {
			//     return this.hasVisibleSeries;
			// };

			function calcSpline () {
				var spline = {
					type: 'spline',
					name: 'Average',
					yAxis: 2,
					data: (function () {
							var data = [];
							var awardData = module.settings.series[0].data;
							var fundingData = module.settings.series[1].data;
							for (var i = 0; i < awardData.length; i++) {
								// if (awardData.length >= i && fundingData.length >= i) {
								data[i] = [];
								data[i].push(((fundingData[i]) / awardData[i])); //average
								// }
							}
							return data;
						}()
					),
					tooltip: {
						pointFormat: '<div style="color:{series.color};width:40%;">{series.name}: </div><div style="width:60%"><b>{point.y:,.0f}</b></div>',
					},
					marker: {
						lineWidth: 2,
						lineColor: Highcharts.getOptions().colors[3],
						fillColor: 'white'
					}
				};

				return spline;
			}

			// Caluculate Avergate and Generate Spline
			module.settings.series.push(calcSpline());

			var presets = {
				yAxis: [{
					id: 'awards',
					min: 4000,
					max: 6000,
					tickInterval: 500,
					PixelInterval: 100,
					labels: {
						format: '{value}',
						style: {
							color: Highcharts.getOptions().colors[0]
						}
					},
					title: {
						text: 'Awards',
						style: {
							color: Highcharts.getOptions().colors[0]
						}
					},
					showEmpty: false,
					opposite: false
				}, {
					id: 'funding',
					min: 1500000,
					max: 2250000,
					tickInterval: 250000,
					PixelInterval: 100,
					gridLineWidth: 0,
					title: {
						text: 'Funding',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					labels: {
						format: '${value:,0f}',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					showEmpty: false,
					opposite: true
				}, {
					id: 'perAward',
					gridLineWidth: 0,
					title: {
						text: 'Average Cost Per Award',
						style: {
							color: Highcharts.getOptions().colors[2]
						}
					},
					labels: {
						format: '${value}',
						style: {
							color: Highcharts.getOptions().colors[2]
						}
					},
					showEmpty: false,
					opposite: true
				}]
				,
				labels: {
					items: [{
						style: {
							left: '50px',
							top: '18px',
							color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
						}
					}]
				},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><div class="flexTable--2cols">',
					pointFormat: '<div style="color:{series.color};width:40%;">{series.name}: </div><div style="width:60%"><b>{point.y}</b></div>',
					footerFormat: '</div>',
					shared: true,
					useHTML: true
				}
				// tooltip: {
				//     shared: false, formatter: function () {
				//         if (this.series.name == "Funding") {
				//             return '<b>$' + Highcharts.numberFormat(this.point.y, 0) + '</b>';
				//         }
				//         if (this.series.name == "Awards") {
				//             return "<b>" + Highcharts.numberFormat(this.point.y, 0) + "</b>";
				//         }
				//         if (this.series.name == "Average") {
				//             return "<b>$" + Highcharts.numberFormat(this.point.y, 0) + " per award.</b>";
				//         }
				//     }
				// }
				,
				series: this.settings.series,
				responsive: {
					rules: [{
						condition: {
							maxWidth: 610
						},
						chartOptions: {
							yAxis: [{
								labels: {
									formatter: function () {
										return (this.value / 1000)
									},
									x: -5
								},
								title: {
									text: 'Awards (thousands)',
									margin: 5
								}
							}, {
								labels: {
									rotation: -60,
									formatter: function () {
										return '$' + (this.value / 1000000)
									},
									x: 10
								},
								title: {
									text: 'Funding (millions)',
									margin: 0
								}
							}, {
								labels: {
									rotation: -60,
									x: 10
								},
								title: {
									margin: 0
								}
							}]
						}
					}]
				}
			};

			var chartSettings = $.extend(true, presets, module.settings);

			this.instance = Highcharts.chart(this.settings.target, chartSettings);
		};

		/**
		 * Exposed functions of this module.
		 */
		return {
			init: initialize,
			NCI_pie: NCI_pie,
			NCI_bar: NCI_bar,
			NCI_column: NCI_bar,
			NCI_averageCost: NCI_averageCost
		}

	}();

	return Chart;
});