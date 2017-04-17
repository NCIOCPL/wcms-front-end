$(function () {


    /**********************************
     * Begin Theme Declaration
     * ********************************/


        //The primary color scheme of the chart and each series.
        //These can be modified, but values will be repeated
        //if the number of data points exceeds the number listed here.

    var themeColors =  [
            '#94B8D2',
            '#2a71a5',
            '#A699B9',
            '#4D3474',
            '#CDAED1',
            '#82368C',
            '#AAAEB2',
            '#565E65',
            '#EF92A5',
            '#DF264C',
            '#565E65',
            '#A8E9F3',
            '#FFBA9D',
            '#FF763B',
            '#95FEDB',
            '#27CAE1',
        ];
    var splitColors = [
        [],
        []
    ];
    themeColors.forEach((color, i) => {
        splitColors[i % 2].push(color)
    });

    Highcharts.theme = {
        colors:  themeColors,
        contrastTextColor: themeColors,
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(240, 240, 255)']
                ]
            },
        },
        title: {
            style: {
                color: '#000',
                font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        subtitle: {
            style: {
                color: '#666666',
                font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
            }
        },
        lang: {
            thousandsSep: ','
        },
        legend: {
            itemStyle: {
                font: '9pt Trebuchet MS, Verdana, sans-serif',
                color: 'black'
            },
            itemHoverStyle:{
                color: 'gray'
            }
        }
    };
// Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    /**********************************
     * End Theme Declaration
     * ********************************/



    Highcharts.chart('rpgAwardDonutChart', {
        title: {
            text: "Program Structure",
            style: {
                color: '#41ccb0',
                font: '25px Arial, sans-serif',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: "Fiscal Year 2015",
            style: {
                color: '#AAAEB2',
                font: '15px Arial, sans-serif',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            formatter: function(){
                return '<b>' + this.point.name + '<br/>$' + Highcharts.numberFormat(this.y, 2) + '</b> <br />' + Highcharts.numberFormat(this.percentage, 1) +" %";
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
        },
        series: [{
            type: 'pie',
            name: 'Budget',
            innerSize: '60%',

            data: [{
                name: 'Research',
                y: 3659240015,
                drilldown: 'Research'
            },{
                name: 'Resource Development',
                y: 676398277,
                drilldown: 'Resource Development'
            },{
                name: 'Cancer Prevention and Control',
                y: 194483918,
                drilldown: 'Cancer Prevention and Control'
            },{
                name: 'Program Management and Support',
                y: 422470978,
                drilldown: 'Program Management and Support'
            }],
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100
            },
        }],

        drilldown: {
            activeAxisLabelStyle: {
                textDecoration: 'none !important',
                fontStyle: 'italic'
            },
            activeDataLabelStyle: {
                textDecoration: 'none',
                color: '{point.color}'
            },

            series: [{
                type: 'pie',
                innerSize: '0%',
                name: 'Research',
                id: 'Research',

                data: [
                    ['Cancer Causation', 1273084708],
                    ['Detection and Diagnosis Research', 462534811],
                    ['Treatment Research', 1190400743],
                    ['Cancer Biology', 733219753]
                ]
            },{
                type: 'pie',
                innerSize: '0%',
                name: 'Resource Development',
                id: 'Resource Development',
                data: [
                    ['Cancer Centers', 501763813],
                    ['Research Manpower Development', 166634464],
                    ['Buildings and Facilities', 8000000]
                ]
            },{
                type: 'pie',
                innerSize: '0%',
                name: 'Cancer Prevention and Control',
                id: 'Cancer Prevention and Control',
                data: [
                    ['Cancer Prevention and Control', 194483918]
                ]
            },{
                type: 'pie',
                innerSize: '0%',
                name: 'Program Management and Support',
                id: 'Program Management and Support',
                data: [
                    ['Program Management and Support', 422470978]
                ]
            }]
        },

        plotOptions: {
            pie: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    style: {
                        textOutline: false,
                        fontSize: '17px',
                        font: 'Arial, sans-serif',
                    },
                    formatter: function(label){
                        return '<span style="color:' + this.point.color + '">' + this.point.name + '</span>';
                    },
                },
                showInLegend: true,
            }
        },
    });
});