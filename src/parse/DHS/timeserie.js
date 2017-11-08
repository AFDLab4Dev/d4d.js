/**
 * Prepare an objet return_data for display_comparison from a public API.
 * This function works with WDI indicators.
 *
 * @param {url} is the url to make the API call.
 * @param {API_params} dictionary with parameters needed for the API calls. API_params should follow the syntax described in API documentation.
 * @param common_ressources dictionary with data useful to handle conversion.

 * @returns {defered.promise()} delever an object (return_data) containing all information needed to create Highcharts object when all API calls are over. 
 */


export default function(url_array, API_params, common_ressources) {
    var deferred = $.Deferred();
    var cname = common_ressources.country_dict[API_params['Country_Select']];
    var CnameExtra = common_ressources.country_dict[API_params['Country_SelectExtra']];

    $.getJSON(url_array[0], function(json) {
            var return_data = new Object;
            return_data.arrayCountry = [];
            return_data.arrayCountryExtra = [];
            return_data.date = [];


            $.each(json.Data, function(index, value) {

                var iso3 = common_ressources.iso2toiso3[value.DHS_CountryCode] // get the country code from API
                if (value.CharacteristicLabel == "Total") { // in the API answer only  consider aggregated data
                    switch (iso3) {
                        case (API_params['Country_Select']):
                            return_data.arrayCountry.push(value.Value)
                            return_data.arrayCountryExtra.push(null)
                            break;
                        case (API_params['Country_SelectExtra']):
                            return_data.arrayCountry.push(null)
                            return_data.arrayCountryExtra.push(value.Value)
                            break;
                        default:
                            break;
                    }

                    return_data.date.push(value.SurveyYear)
                }
                return_data.indicatorName = value.Indicator
            });




            // temporary array holds objects with position and sort-value
            var mapped = return_data.date.map(function(el, i) {
                return {
                    index: i,
                    date: el,
                    value_c: return_data.arrayCountry[i],
                    value_ce: return_data.arrayCountryExtra[i]
                };
            })

            // sorting the mapped array containing the reduced values
            mapped.sort(function(a, b) {
                if (a.date > b.date) {
                    return 1;
                }
                if (a.date < b.date) {
                    return -1;
                }
                return 0;
            });

            // container for the resulting order
            return_data.date = mapped.map(function(el) {
                return return_data.date[el.index];
            });
            return_data.arrayCountry = mapped.map(function(el) {
                return return_data.arrayCountry[el.index];
            });
            return_data.arrayCountryExtra = mapped.map(function(el) {
                return return_data.arrayCountryExtra[el.index];
            });


            for (var i = 0; i < return_data.date.length - 1; i++) {
                if (return_data.date[i + 1] == return_data.date[i]) {
                    return_data.date.splice(i + 1, 1);
                    switch (null) {
                        case (return_data.arrayCountry[i]):

                            return_data.arrayCountry[i] = return_data.arrayCountry[i + 1];
                            return_data.arrayCountry.splice(i + 1, 1);
                            return_data.arrayCountryExtra.splice(i + 1, 1);
                            break;
                        case (return_data.arrayCountryExtra[i]):
                            return_data.arrayCountryExtra[i] = return_data.arrayCountryExtra[i + 1];
                            return_data.arrayCountry.splice(i + 1, 1);
                            return_data.arrayCountryExtra.splice(i + 1, 1);
                            break;
                    }
                }
            }







            return_data.series = [{
                type: 'column',
                name: cname,
                data: return_data.arrayCountry,
                color: '#6e9fc5'
            }, {
                type: 'spline',
                name: cname + " (Trend)",
                data: return_data.arrayCountry,
                connectNulls: true,
                marker: {
                    lineWidth: 2,
                    lineColor: '#6e9fc5',
                    fillColor: 'white'
                },
                color: '#6e9fc5'
            }, {
                type: 'column',
                name: CnameExtra,
                data: return_data.arrayCountryExtra,
                color: '#a6ca6d'
            }, {
                type: 'spline',
                name: CnameExtra + " (Trend)",
                data: return_data.arrayCountryExtra,
                connectNulls: true,
                marker: {
                    lineWidth: 2,
                    lineColor: '#a6ca6d',
                    fillColor: 'white'
                },
                color: '#a6ca6d'
            }]

            deferred.resolve(return_data)

        });


        return deferred.promise()
    }