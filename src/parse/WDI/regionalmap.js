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
        var cname = API_params['Country_Select'];
        $.getJSON(url_array[0], function(json) {
            // store indicator label
            var return_data = new Object;

            return_data.ind_label = json[1][0].indicator.value
                // create empty array

            var data_jsonMAP = []
            $.each(json[1], function(i, item) {
                var iso2 = item.country.id.toLowerCase();
                data_jsonMAP.push('{"hc-key": "' + iso2 + '","value":' + item.value + '}')
            });


            return_data.dataMAP = JSON.parse('[' + data_jsonMAP + ']')

            if ($.inArray(cname, common_ressources.asia) != -1) {
                return_data.map = "custom/asia"
            }

            if ($.inArray(cname, common_ressources.africa) != -1) {
                return_data.map = "custom/africa"
            }

            if ($.inArray(cname, common_ressources.europe) != -1) {
                return_data.map = "custom/europe"
            }

            if ($.inArray(cname, common_ressources.oceania) != -1) {
                return_data.map = "custom/oceania"
            }

            if ($.inArray(cname, common_ressources.south_america) != -1) {
                return_data.map = "custom/south-america"
            }

            if ($.inArray(cname, common_ressources.north_america_no_central) != -1) {
                return_data.map = "custom/north-america-no-central"
            }

            if ($.inArray(cname, common_ressources.middle_east) != -1) {
                return_data.map = "custom/middle-east"
            }

            if ($.inArray(cname, common_ressources.central_america) != -1) {
                return_data.map = "custom/central-america"
            }


            deferred.resolve(return_data)

        });

        return deferred.promise()
}