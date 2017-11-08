/**
 * Prepare an objet return_data for display_comparison from a public API.
 * This function works with WDI indicators.
 *
 * @param {url} is the url to make the API call.
 * @param {API_params} dictionary with parameters needed for the API calls. API_params should follow the syntax described in API documentation.
 * @param common_ressources dictionary with data useful to handle conversion.

 * @returns {defered.promise()} delever an object (return_data) containing all information needed to create Highcharts object when all API calls are over. 
  */


export default function (url_array, API_params, common_ressources) {
    var deferred = $.Deferred();
    var cname = common_ressources.country_dict[API_params['Country_Select']];
    var CnameExtra = common_ressources.country_dict[API_params['Country_SelectExtra']];


    $.getJSON(url_array[0], function(json) {

            var return_data = new Object;
            return_data.arrayRegion = [];
            return_data.arrayIncome = [];
            return_data.arrayWorld = [];
            return_data.arrayCountry = [];
            return_data.arrayCountryExtra = [];
            return_data.date = [];

            $.each(json[1], function(i, data) {

                switch (1) {
                    case ($.inArray(data.country.value, common_ressources.region_list)> -1 ? 1 :-1 ):
                        return_data.region_name = data.country.value;
                        return_data.arrayRegion.push(parseFloat(data.value))
                        break;
                    case ($.inArray(data.country.value, common_ressources.income_list)> -1 ? 1 :-1):
                        return_data.income_name = data.country.value;
                        return_data.arrayIncome.push(parseFloat(data.value))

                        break;
                    case ($.inArray(data.country.value, common_ressources.world_list)> -1 ? 1 :-1):
                        return_data.arrayWorld.push(parseFloat(data.value))

                        break;
                    default:
                        switch (data.country.value) {
                            case cname:
                                return_data.arrayCountry.push(parseFloat(data.value));
                                break;
                            case CnameExtra:
                                return_data.arrayCountryExtra.push(parseFloat(data.value));
                                break;
                            default:
                                break;
                        }
                }

                return_data.indicatorName = data.indicator.value;
                return_data.date.push(data.date);
                return_data.date.reverse();
            });

            return_data.series = [{
                name: cname,
                data: return_data.arrayCountry.reverse()
            }, {
                name: return_data.region_name,
                data: return_data.arrayRegion.reverse()
            }, {
                name: return_data.income_name,
                data: return_data.arrayIncome.reverse()
            }, {
                name: 'World',
                data: return_data.arrayWorld.reverse()
            }, {
                name: CnameExtra,
                data: return_data.arrayCountryExtra.reverse()
            }]
            deferred.resolve(return_data)
        });


    return deferred.promise()

};