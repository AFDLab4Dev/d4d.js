// type 1 dataviz is an Highchart dataviz with line graph, comparison with regional unit, world. Possibility to add an optional second country

/**
 * Display a line chart of one indicator, in the format of timeserie.
 * A second country can be add.
 * It uses Chart module from Highcharts.
 *
 * @param {String} container - Where should the dataviz be displayed ?
 * @param {Object} return_data - All the data from the parsing.
 * @param {String} credits - How should the dataviz be credited ? This will be interpreted as HTML.

 * @returns {Object} Highcharts.Chart  
 */


export default function (container, return_data, credits) {
    var chart = new Highcharts.Chart({
        chart: {
            type: 'spline',
            renderTo: container
        },
        colors: ['#6e9fc5', '#ffdf51', '#a6ca6d', '#ad46d6', '#f26a2e', '#00adef', '#f4bb90'],
        title: {
            text: return_data.indicatorName
        },
        credits: {
            enabled: false,
        },

        subtitle: {
            text: credits
        },
        xAxis: {
            categories: return_data.date, //.reverse() to have the min year on the left 
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
            }
        },
        tooltip: {
            valueDecimals: 2,
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>'
        },
        series: return_data.series
    });




    Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: "'Open Sans', sans-serif"
            }

        }
    });

    return chart
}





