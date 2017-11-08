/**
 * Display a comparison between indicators, in the format of a spider.
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
            renderTo: container,
            polar: true,
            type: 'line'
        },
        title: {
            text: '',
            x: 0,
            style: {
                "fontSize": "14px"
            }
        },
        credits: {
            enabled: false
        },
        subtitle: {
            useHTML: true,
            text: credits
        },

        xAxis: {
            categories: return_data.label,
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            tickInterval: 1
        },
        tooltip: {
            shared: true,
            valuePrefix: '',
            valueSuffix: '',
            valueDecimals: 2
        },

        series: return_data.series
    });
}