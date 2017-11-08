/**
 * Prepare the url for an API call.
 * This function works with DHS indicators.
 *
 * @param {API_params} dictionary with parameters for api call. API_params should follow the syntax described in API documentation.
 * @param {viz_params} dictionary with parameters needed for the visualisation. viz_params should follow the syntax described in API documentation.
 * @returns {url_array} an array contaning all url neded for API calls. 
  */

export default function (API_params,viz_params, common_ressources) {
    
    var isolist ="";

    //Get country
    isolist = isolist + common_ressources.iso3toiso2[API_params['Country_Select']];

    // Get second country
    isolist = isolist + (API_params['Country_SelectExtra'] != undefined ?  ";" + common_ressources.iso3toiso2[API_params['Country_SelectExtra']] : "");

    // Other countries ?
    if (viz_params["neighbourg"] == true ){
        var isolist_iso2 = common_ressources["list_" + common_ressources.region_dict[API_params['Country_Select']].split(";")[1]].map(function(el) {
        return common_ressources.iso3toiso2[el]
        });
        isolist  = isolist + ";"+String(isolist_iso2);
    }

    //subnational ? 
    var subnational = (viz_params["subnational"] == true ? "&returnGeometry=true&breakdown=subnational" : "")

    //need geojson ?
    var format = (viz_params["geojson"] == true ? "?f=geojson" : "?f=json" )



    var url_array = API_params['Ind_Select'].map(function(indicator) {
        return "https://api.dhsprogram.com/rest/dhs/data/"+format+subnational+"&countryIds=" + isolist + "&indicatorIds=" + indicator;
    });
    return url_array
}

