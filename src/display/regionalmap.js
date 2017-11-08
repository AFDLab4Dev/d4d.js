/**
 * Display a regional map of one indicator.
 * It uses Chart module from Highmaps.
 *
 * @param {String} container - Where should the dataviz be displayed ?
 * @param {Object} return_data - All the data from the parsing.
 * @param {String} credits - How should the dataviz be credited ? This will be interpreted as HTML.

 * @returns {Object} Highcharts.Map  
 */

export default function (container, return_data, API_params) {
    return new Highcharts.Map({
        chart: {
            renderTo: container
        },
        title: {
            text: return_data.ind_label
        },
        credits: {
            enabled: false,
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },
        tooltip: {
            shared: true,
            valuePrefix: '',
            valueSuffix: '',
            valueDecimals: 2
        },
        series: [{
            data: return_data.dataMAP,
            mapData: Highcharts.maps[return_data.map],
            joinBy: 'hc-key',
            name: return_data.ind_label,
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: false,
                format: '{point.name}'
            }
        }]
    });

}