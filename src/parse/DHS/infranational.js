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
    var iso2 = common_ressources.iso3toiso2[API_params['Country_Select']];


    $.getJSON(url_array[0], function(yearData) {
        var temp = yearData.features.length
        var surveyyear = yearData.features[temp-1].properties.SurveyYear;
        console.log(temp)
        console.log(surveyyear)
        var apiURL = url_array[0]+"&surveyYear=" + surveyyear.toString();
        var return_data ={}
        $.getJSON(apiURL, function(returnData) {
        	return_data.json = returnData;
            return_data.view = common_ressources.gps_dict[iso2].split(",");
            return_data.year = surveyyear.toString();

            deferred.resolve(return_data)
        });
    });
    return deferred.promise()
  }
