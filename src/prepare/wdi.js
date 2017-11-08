/**
 * Prepare the url for an API call.
 * This function works with WDI indicators.
 *
 * @param {API_params} dictionary with parameters for api call. API_params should follow the syntax described in API documentation.
 * @param {viz_params} dictionary with parameters needed for the visualisation. viz_params should follow the syntax described in API documentation.
 * @param common_ressources dictionary with data useful to handle conversion.

 * @returns {url_array} an array contaning all url neded for API calls. 
  */

export default function (API_params, viz_params, common_ressources) {

    var isolist ="";

    //Get country
    isolist = isolist + API_params['Country_Select'];

    // Get second country
    isolist = isolist + (API_params['Country_SelectExtra'] != undefined ?  ";" + API_params['Country_SelectExtra'] : "");

    // get region name from dictionary
    isolist = isolist + (viz_params["region"] == true ? ";"+common_ressources.region_dict[API_params['Country_Select']] : "");

    // Other countries ?
    if (viz_params["neighbourg"] == true ){
        var temp
        var region_iso3 = ["EAS", "ECS", "LCN", "MEA", "OED", "SAS", "SSA"]
        for (var i = 0, len = region_iso3.length; i < len; i++) {
            if ($.inArray(API_params['Country_Select'], common_ressources["list_" + region_iso3[i]]) != -1) {
                temp = common_ressources["list_" + region_iso3[i]];
                break;
            }
        }
        isolist = isolist + ";"+String(temp).replace(/,/g, ';');
    }
    // World ? 
    isolist = isolist + (viz_params["world"] == true ? ";WLD" : "");


    // display is the amount of information retrieved from the API query 

    var display = isolist.length * ((API_params['end'] - API_params['start']) + 1);
    var url_array = API_params['Ind_Select'].map(function(indicator) {
        return "http://api.worldbank.org/countries/" + isolist+"/indicators/" + indicator + "?date=" + API_params['start'] + ":" + API_params['end'] + "&per_page=" + display + "&MRV=" + (display / isolist.length) + "&format=jsonP&prefix=?"
    });

    return url_array

}




