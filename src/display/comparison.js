/**
 * Display a comparison between indicators, in the format of timeseries.
 * It uses Chart module from Highcharts.
 *
 * @param {String} container - Where should the dataviz be displayed ?
 * @param {Object} return_data - All the data from the parsing.
 * @param {String} credits - How should the dataviz be credited ? This will be interpreted as HTML.

 * @returns {Object} Highcharts.Chart  
 */

export default function (container, return_data, credits) {
    return new Highcharts.Chart({
        chart: {
            type: 'spline',
            renderTo: container
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        credits: {
            enabled: false
        },
        colors: ['#bc456b', '#e2a1b5', '#355ca8', '#b7bee5'],
        title: {

            text: return_data.indicatorName_1 + ' <br> ' + return_data.indicatorName_2,
            x: -20,
            style: {
                "fontSize": "14px"
            }
        },
        subtitle: {
            useHTML: true, // to allow target blank
            text: credits,
            x: -20,
        },
        xAxis: {
            valueDecimals: 0,
            tickInterval: 1,
            categories: return_data.date,

        },
        yAxis: {
            title: {
                text: ""
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            itemStyle: {
                fontSize: '10px',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            valueSuffix: '',
            valueDecimals: 2
        },

        series: return_data.series,
    });





}