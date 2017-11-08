


/**
 * Return the ratio of the inline text length of the links in an element to
 * the inline text length of the entire element.
 * @name d4d.make.dataviz -
 * @param container - anchor of the dataviz. 
 * @param dataviz_type - Comparison, infranational, regionalmap, spider, timeserie.
 * @param API_params - See documentation for specification.
 * @param common_ressources - Needed.

 */


export default function (container, dataviz_type, API_params, common_ressources) {
        
        var url_array = d4d.prepare[API_params["Furnisher"].toLowerCase()](API_params, viz_params);

        var promise = d4d.parse[API_params["Furnisher"]][dataviz_type](url_array, API_params, common_ressources);

        promise.then(function(return_data) {
            return d4d.display[dataviz_type](container, return_data, common_ressources.credits);
        });

    }

 

