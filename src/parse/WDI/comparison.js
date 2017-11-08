/**
 * Prepare an objet return_data for display_comparison from a public API.
 * This function works with WDI indicators.
 *
 * @param {url_array} is the array containing the necessary url(s) to make the API calls.
 * @param {API_params} dictionary with parameters needed for the API calls. API_params should follow the syntax described in API documentation.
 * @param common_ressources dictionary with data useful to handle conversion.
 * @returns {defered.promise()} delever an object (return_data) containing all information needed to create Highcharts object when all API calls are over. 
  */

export default function (url_array, API_params, common_ressources) {
    var deferred = $.Deferred();
    var request_1 = $.Deferred();
    var request_2 = $.Deferred();
    var cname = common_ressources.country_dict[API_params['Country_Select']];


    var return_data = new Object;
    return_data.arrayRegion_1 = [];
    return_data.arrayCountry_1 = [];
    return_data.arrayRegion_2 = [];
    return_data.arrayCountry_2 = [];
    var date_1 = [];
    var date_2 = [];

    $.getJSON(url_array[0], function(json) {
        var date_1 = []

        $.each(json[1], function(i, data) {
            switch (1) {
                case ($.inArray(data.country.value, common_ressources.region_list)> -1 ? 1 :-1):
                    return_data.region_name = data.country.value;
                    return_data.arrayRegion_1.push(parseFloat(data.value))
                    break;
                default:
                    return_data.arrayCountry_1.push(parseFloat(data.value));
                    break;

            }
            date_1.push(data.date)
            return_data.indicatorName_1 = data.indicator.value;

        });


        request_1.resolve(date_1);

    });

    $.getJSON(url_array[1], function(json) {
        var date_2 = []

        $.each(json[1], function(i, data) {
            switch (1) {
                case ($.inArray(data.country.value, common_ressources.region_list)> -1 ? 1 :-1):
                    return_data.region_name = data.country.value;
                    return_data.arrayRegion_2.push(parseFloat(data.value))
                    break;
                default:
                    return_data.arrayCountry_2.push(parseFloat(data.value));
                    break;

            }
            date_2.push(data.date)
            return_data.indicatorName_2 = data.indicator.value;

        });



        request_2.resolve(date_2);

    });




    $.when(request_1, request_2).done(function(date_1, date_2) {
        return_data.date = date_1.reverse();

        return_data.series = [{
            name: cname + " - " + return_data.indicatorName_1,
            data: return_data.arrayCountry_1.reverse()
        }, {
            name: return_data.region_name + " - " + return_data.indicatorName_1,
            data: return_data.arrayRegion_1.reverse()
        }, {
            name: cname + " - " + return_data.indicatorName_2,
            data: return_data.arrayCountry_2.reverse()
        }, {
            name: return_data.region_name + " - " + return_data.indicatorName_2,
            data: return_data.arrayRegion_2.reverse()
        }]


        deferred.resolve(return_data);


    });

    return deferred.promise();

}
