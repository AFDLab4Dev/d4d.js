/**
 * Prepare an objet return_data for display_comparison from a public API.
 * This function works with WDI indicators.
 *
 * @param {url_array} is the url to make all necesseray API calls.
 * @param {API_params} dictionary with parameters needed for the API calls. API_params should follow the syntax described in API documentation.
* @param common_ressources dictionary with data useful to handle conversion.
 * @returns {defered.promise()} delever an object (return_data) containing all information needed to create Highcharts object when all API calls are over. 
  */

export default function (url_array, API_params, common_ressources) {
    var deferred = $.Deferred();
    var raw_data = new Object;
    var cname = common_ressources.country_dict[API_params['Country_Select']];


    function parse_wdi_4_each(data) {
        var raw = new Object;
        raw.label = data[0].indicator.value;

        raw.country = data.filter(item => item.country.value == cname).filter(item => item.value != null)[0]


        raw.region = data.filter(item => $.inArray(item.country.value, common_ressources.region_list) > -1)
        raw.region_label = raw.region[0].country.value;
        raw.region = raw.region.filter(item => item.value != null)[0]

        raw.income = data.filter(item => $.inArray(item.country.value, common_ressources.income_list) > -1)
        raw.income_label = raw.income[0].country.value;
        raw.income = raw.income.filter(item => item.value != null)[0]

        raw.world = data.filter(item => $.inArray(item.country.value, common_ressources.world_list) > -1).filter(item => item.value != null)[0]
        return raw


    }

    $.when.apply($, url_array.map(function(item) {
        return $.getJSON(item).then(function(data) {
            raw_data[data[1][0].indicator.id] = parse_wdi_4_each(data[1]);


        });
    })).then(function() {
        var return_data = new Object;
        return_data.label = [];
        return_data.arrayCountry = [];
        return_data.arrayRegion = [];
        return_data.arrayIncome = [];
        return_data.arrayWorld = [];
        Object.keys(raw_data).forEach(function(key, index) {
            return_data.label.push(raw_data[key].label);
            return_data.region_label = raw_data[key].region_label
            return_data.income_label = raw_data[key].income_label
            return_data.arrayCountry.push(typeof raw_data[key].country != "undefined" ? parseInt(raw_data[key].country.value) : null);
            return_data.arrayRegion.push(typeof raw_data[key].region != "undefined" ? parseInt(raw_data[key].region.value) : null);
            return_data.arrayIncome.push(typeof raw_data[key].income != "undefined" ? parseInt(raw_data[key].income.value) : null);
            return_data.arrayWorld.push(typeof raw_data[key].world != "undefined" ? parseInt(raw_data[key].world.value) : null);
            // key: the name of the object key
            // index: the ordinal position of the key within the object 
        });

        return_data.series = [{
            name: cname,
            data: return_data.arrayCountry,
            color: '#83b3ea',
            pointPlacement: "on"
        }, {
            name: return_data.region_label,
            data: return_data.arrayRegion,
            color: '#4572A7'
        }, {
            name: return_data.income_label,
            data: return_data.arrayIncome,
            color: '#c3d69b'
        }, {
            name: 'World',
            data: return_data.arrayWorld,
            color: '#f4bb90',
            pointPlacement: 'on'
        }]
        deferred.resolve(return_data);

    });

    return deferred.promise()

};



