//Extramural Funds Fiscal Year 2015 - excluding Total Intramural/RMS of $1,265,633,204
$(function () {
    new Chart('container', {
        chart: {type: 'NCI_pie'},
        title: {text: 'Extramural Funds'},
        subtitle: {text: 'Fiscal Year 2015'},
        series: [{
            name: 'Amount',
            data: [
                {name: 'Contracts', y: 604951243, drilldown: 'Contracts'},
                {name: 'Grants', y: 3082008742, drilldown: 'Grants'}
            ]
        }],
        drilldown: {
            series: [{
                name: 'Contracts',
                id: 'Contracts',
                data: [
                    ['Research & Development (R&D) Contracts', 596951243],
                    ['Buildings and Facilities', 8000000],
                    ['Construction Contracts', 0]
                ]
            }, {
                name: 'Grants',
                id: 'Grants',
                data: [
                    ['Research Project Grants (RPGs)', 2092634914],
                    ['Cancer Centers/Specialized Centers/SPORES', 509474614],
                    ['NRSA', 69803491], ['Other Research Grants', 410095723]
                ]
            }]
        }
    });
});

// Management Fund
$(function () {
    new Chart('container', {
        chart: {type: 'NCI_pie'},
        title: {text: 'NIH Management Fund, Service & Supply Fund, and GSA Rent'},
        subtitle: {text: 'Fiscal Year 2016'},
        series: [{
            name: 'Amount',
            data: [
                {name: 'NCI', y: 334177085, drilldown: 'NCI'},
                {name: 'All Others', y: 1357342842}
            ]
        }],
        drilldown: {
            series: [{
                name: 'NCI',
                id: 'NCI',
                data: [
                    ['Clinical Center', 119881792],
                    ['Center for Scientific Review', 22405754],
                    ['Center for Information Technology', 6333707],
                    ['Service and Supply Fund Assessment', 167460725],
                    ['Other Research Services', 12817877],
                    ['Other OD', 5277230]
                ]
            }]
        }
    });
});

//program structure
$(function () {
    new Chart('container', {
        chart: {type: 'NCI_pie'},
        title: {text: 'Program Structure'},
        subtitle: {text: 'Fiscal Year 2015'},
        series: [{
            name: 'Budget',
            data: [
                {name: 'Research', y: 3659240015, drilldown: 'Research'},
                {name: 'Resource Development', y: 676398277, drilldown: 'Resource Development'},
                {name: 'Cancer Prevention and Control', y: 194483918},
                {name: 'Program Management and Support',y: 422470978}
            ]
        }],
        drilldown: {
            series: [{
                name: 'Research',
                id: 'Research',
                data: [
                    ['Cancer Causation', 1273084708],
                    ['Detection and Diagnosis Research', 462534811],
                    ['Treatment Research', 1190400743],
                    ['Cancer Biology', 733219753]
                ]
            }, {
                name: 'Resource Development',
                id: 'Resource Development',
                data: [
                    ['Cancer Centers', 501763813],
                    ['Research Manpower Development', 166634464],
                    ['Buildings and Facilities', 8000000]
                ]
            }]
        }
    });
});

//kAwards - Pie
$(function () {
    new Chart('highchart-kAwards-pie', {
        chart: {type: 'NCI_pie'},
        title: {text: 'Percent of Total Research Career Award Funded'},
        subtitle: {text: 'Fiscal Year 2016'},
        legend: {layout: 'vertical', align: 'center', verticalAlign: 'bottom'},
        series: [{
            name: 'Funding',
            data: [
                ['K01 Temin Total', 5593],
                ['K05 Research Scientist Award', 888],
                ['K07 Preventive Oncology', 9635],
                ['K08 Clinical Investigator', 14777],
                ['K12 Institutional Clinical Oncology Research', 13299],
                ['K22 Transitional Career Development', 9996],
                ['K23 Patient-Oriented Career', 3338],
                ['K24 Patient-Oriented Career - Mid Career', 2914],
                ['K25 Mentored Quantitative Research Career Development Award', 1372],
                ['K99 NIH Pathway to Independence Awards', 9789]
            ]
        }]
    });
});

//kAwards - Bar
$(function () {
    new Chart('highchart-kAwards-bar', {
        chart: {type: 'NCI_column'},
        title: {text: 'Total Number of kAwards'},
        subtitle: {text: 'Fiscal Years 2006 - 2015'},
        plotOptions: {series: {pointStart: 2006}},
        yAxis: [
            {min: 0, title: {text: 'Number of Awards'}},
            {min: 0, title: {text: '$ in Thousands'}, opposite: true}
        ],
        series: [
            {name: 'Number of Awards', data: [1455, 1475, 1503, 1388, 1387, 1106, 1220, 1095, 1378, 1371]},
            {name: '$ in Thousands', data: [3980, 3997, 3877, 3791, 3692, 3913, 3801, 3721, 3436, 3296]}
        ]
    });
});

//NRSA - trainees
$(function () {
    new Chart('highchart-nrsa', {
        chart: {type: 'NCI_column'},
        title: {text: 'Predoctoral and Postdoctoral Trainees'},
        subtitle: {text: 'Fiscal Years 2007 - 2016'},
        plotOptions: {series: {pointStart: 2007}},
        yAxis: {min: 0, title: {text: 'Number of Trainees'}},
        series: [
            {name: 'Predoc', data: [492, 511, 503, 476, 464, 497, 587, 485, 538, 722]},
            {name: 'Postdoc', data: [963, 1003, 989, 952, 911, 845, 766, 947, 893, 717]},
            {name: 'Total', data: [1455, 1514, 1492, 1428, 1375, 1342, 1353, 1432, 1431, 1439]}
        ]
    });
});

//RPG - Awards
$(function () {
    new Chart('highchart-awards', {
        chart: {type: 'NCI_column'},
        title: {text: 'RPGs Number of Awards'},
        subtitle: {text: 'Fiscal Years 2007 - 2016'},
        plotOptions: {series: {pointStart: 2007}},
        series: [
            {name: 'Competing', data: [1475, 1503, 1388, 1387, 1106, 1220, 1095, 1378, 1371, 1365]},
            {name: 'Non-Competing', data: [3997, 3877, 3791, 3692, 3913, 3801, 3721, 3436, 3396, 3301]}
        ]
    });
});

//RPG - Funding Mechanisms
$(function () {
    new Chart('highchart-funding', {
        chart: {type: 'NCI_pie'},
        title: {text: 'Percent Share of Total RPG Funds'},
        subtitle: {text: 'Fiscal Year 2016'},
        series: [{
            name: 'Funding',
            data: [
                ['R01 Traditional Grants', 57.8],
                ['P01 Program Projects*', 8.4],
                ['RFA', 10.9], ['R03 Small Grants', .4],
                ['R21 Exploratory Phase I', 5.5],
                ['R33 Exploratory Phase II', 0],
                ['R35', 3.5], ['SBIR/STTR', 4.9],
                ['Other RPGs', 8.6]
            ]
        }]
    });
});

//RPG - Average Costs
$(function () {
    new Chart('highchart-average-cost',{
        chart: {
            type: 'NCI_averageCost'
        },
        title: {text: 'RPGs Number of Awards'},
        subtitle: {text: 'Fiscal Years 2007 - 2016'},
        plotOptions: {
            series: {
                pointStart: 2007
            }
        },
        series: [{
            name: 'Awards',
            type: 'column',
            yAxis: 0,
            data: [5435,5472,5380,5179,5079,5019,5021,4816,4814,4767]
        },{
            name: 'Funding',
            type: 'column',
            yAxis: 1,
            data: [2098145,2053093,2021476,2063038,2092729,2088352,2075295,1924803,1939623,2019308]
        }]
    });

});

//bypass-appropriations
$(function () {
    new Chart('highchart-appropriations', {
        chart: {type: 'line'},
        title: {text: 'Appropriations of the NCI'},
        subtitle: {text: 'Fiscal Years 2003 - 2016'},
        plotOptions: {series: {pointStart: 2003}},
        yAxis: {title: {text: 'Amount'}},
        series: [{
            name: 'Amount',
            data: [4622394000, 4770519000, 4865525000, 4841774000, 4797639000, 4827556000, 4968973000, 5103388000, 5058577000, 5072183000, 5072183000, 4923238000, 4950396000, 5214701000]
        }]
    });
});

//compairison - amount
$(function () {
    new Chart('highchart-compare-amount', {
        chart: {type: 'area'},
        title: {text: 'Comparison of Dollars, Positions, and Space'},
        subtitle: {text: 'Fiscal Years 2007 - 2016'},
        plotOptions: {series: {pointStart: 2007}},
        yAxis: [{
            title: {text: 'Funds (millions)', style: {color: '#40bfa2'}}, labels: {
                formatter: function () {
                    return '$' + this.value / 1000000 + 'm'
                }, style: {color: '#40bfa2'}
            }, min: 3800000, max: 5100000
        }, {
            title: {text: 'Space (Sq Ft)', style: {color: '#984e9b'}, margin: 0}, labels: {
                formatter: function () {
                    return this.value / 1000000 + 'm'
                }, style: {color: '#984e9b'}, x: 5
            },
            opposite: true,
            min: 800000,
            max: 1200000
        }, {
            title: {text: 'FTEs', style: {color: '#fb7830'}, margin: 5},
            labels: {style: {color: '#fb7830'}, x: 10},
            opposite: true,
            min: 2700,
            max: 4500
        }],
        tooltip: {crosshairs: true, shared: true},
        series: [
            {name: 'Funds', yAxis: 0, data: [4792615, 4827552, 4966927, 5098147, 5058105, 5067342, 4789014, 4932368, 4952593, 5084292]},
            {name: 'Space (Sq Ft)', yAxis: 1, data: [934482, 915724, 954957, 983152, 951998, 951592, 1072410, 991644, 1010876, 1000815]},
            {name: 'FTEs', yAxis: 2, data: [2828, 2882, 2956, 3056, 3135, 3136, 3103, 3040, 2998, 2962]}
        ]
    });
});

//compairison - % change
$(function () {
    new Chart('highchart-compare-change', {
        chart: {type: 'spline'},
        title: {text: 'Comparison of Dollars, Positions, and Space'},
        subtitle: {text: 'Fiscal Years 2007 - 2016'},
        plotOptions: {series: {pointStart: 2007}},
        yAxis: {title: {text: 'Annual Percent Change'}},
        tooltip: {
            pointFormatter: function () {
                var seriesText = this.series.name.replace(/.\(.*\)/, '');
                return '<div style="padding:3px"><b style="color:' + this.color + '">' + seriesText + '</b>: ' + (this.y * 100) + '%</div>';
            },
            crosshairs: true,
            shared: true,
            useHTML: true
        },
        series: [
            {name: 'Funds', data: [.01, .01, .03, .03, -.01, 0, -.055, .03, .04, .027]},
            {name: 'Space (Sq Ft)', data: [-.04, -.02, .04, .03, -.03, 0, .13, -.08, .02, -.01]},
            {name: 'FTEs', data: [.02, .02, .03, .03, .03, 0, -.01, -.02, -.01, -.01]}
        ]
    });
});

//extramural-intramural-rms
$(function () {
    new Chart('highchart-bar', {
        chart: {type: 'bar'},
        title: {text: 'RPGs Number of Awards'},
        subtitle: {text: 'Fiscal Years 2012 - 2016'},
        plotOptions: {series: {pointStart: 2012}},
        xAxis: [
            {type: 'category', showEmpty: false},
            {type: 'category', showEmpty: false},
            {type: 'category',showEmpty: false}
        ],
        series: [{
            name: 'Extramural',
            xAxis: 0,
            data: [
                {y: 3834.6, drilldown: '2012E'},
                {y: 3611.4, drilldown: '2013E'},
                {y: 3715.9, drilldown: '2014E'},
                {y: 3687, drilldown: '2015E'},
                {y: 3911.9, drilldown: '2016E'}
            ]
        }, {
            name: 'Intramural',
            data: [
                {y: 1232.8, drilldown: '2012I'},
                {y: 1177.6, drilldown: '2013I'},
                {y: 1216.5, drilldown: '2014I'},
                {y: 1265.6, drilldown: '2015I'},
                {y: 1294.3, drilldown: '2016I'}
            ]
        }],
        drilldown: {
            series: [{
                name: '2012 Extramural',
                id: '2012E',
                xAxis: 1,
                data: [
                    ['Research Project Grants', 2150.6],
                    ['Cancer Centers', 279.9],
                    ['SPOREs', 113.5],
                    ['Other P50s/P20s', 33.4],
                    ['Other Specialized Centers', 186.0],
                    ['Other Research Grants', 407.5],
                    ['NRSA', 66.0],
                    ['R&D Contracts', 589.7],
                    ['Buildings & Facilities', 7.9]
                ]
            }, {
                name: '2013 Extramural',
                id: '2013E',
                xAxis: 1,
                data: [
                    ['Research Project Grants', 2000.2],
                    ['Cancer Centers', 262.2],
                    ['SPOREs', 104.3],
                    ['Other P50s/P20s', 21.5],
                    ['Other Specialized Centers', 146.0],
                    ['Other Research Grants', 387.5],
                    ['NRSA', 65.8],
                    ['R&D Contracts', 616.0],
                    ['Buildings & Facilities', 7.9]
                ]
            }, {
                name: '2014 Extramural',
                id: '2014E',
                xAxis: 1,
                data: [
                    ['Research Project Grants', 2012.6],
                    ['Cancer Centers', 281.8],
                    ['SPOREs', 104.6],
                    ['Other P50s/P20s', 18.2],
                    ['Other Specialized Centers', 139.2],
                    ['Other Research Grants', 430.0],
                    ['NRSA', 69.2],
                    ['R&D Contracts', 652.3],
                    ['Buildings & Facilities', 8.0]
                ]
            }, {
                name: '2015 Extramural',
                id: '2015E',
                xAxis: 1,
                data: [
                    ['Research Project Grants', 2092.6],
                    ['Cancer Centers', 288.7],
                    ['SPOREs', 102.7],
                    ['Other P50s/P20s', 5.8],
                    ['Other Specialized Centers', 112.2],
                    ['Other Research Grants', 410.1],
                    ['NRSA', 69.8],
                    ['R&D Contracts', 597.0],
                    ['Buildings & Facilities', 8.0]
                ]
            }, {
                name: '2016 Extramural',
                id: '2016E',
                xAxis: 1,
                data: [
                    ['Research Project Grants', 2146.1],
                    ['Cancer Centers', 335.0],
                    ['SPOREs', 102.7],
                    ['Other P50s/P20s', 5.8],
                    ['Other Specialized Centers', 112.2],
                    ['Other Research Grants', 410.1],
                    ['NRSA', 69.8],
                    ['R&D Contracts', 597.0],
                    ['Buildings & Facilities', 8.0]
                ]
            }, {
                name: '2012 Intramural',
                id: '2012I',
                xAxis: 2,
                data: [
                    ['Intramural Research', 857.84],
                    ['RMS', 374.9]
                ]
            }, {
                name: '2013 Intramural',
                id: '2013I',
                xAxis: 2,
                data: [
                    ['Intramural Research', 811.57],
                    ['RMS', 366.1]
                ]
            }, {
                name: '2014 Intramural',
                id: '2014I',
                xAxis: 2,
                data: [
                    ['Intramural Research', 845.07],
                    ['RMS', 371.4]
                ]
            }, {
                name: '2015 Intramural',
                id: '2015I',
                xAxis: 2,
                data: [
                    ['Intramural Research', 843.16],
                    ['RMS', 422.5]
                ]
            }, {
                name: '2016 Intramural',
                id: '2016I',
                xAxis: 2,
                data: [
                    ['Intramural Research', 894.53],
                    ['RMS', 399.8]
                ]
            }]
        }
    });
});