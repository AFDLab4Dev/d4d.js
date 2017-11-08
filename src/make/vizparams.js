/**
 * Prepare the vizparameters for data preparation
 *
 * @param {String} dataviz_Type of dataviz that will be called
 * @return {viz_params} viz_params dictionary with parameters needed for the visualisation. viz_params should follow the syntax described in API documentation.
  */

  export default function (dataviz_type) {

  	switch(dataviz_type){
  		case 'comparison':
  		return {neighbourg : false, subnational : false, geojson : false, region:true , world: false}
  		break;
  		case 'infranational':
   		return {neighbourg : false, subnational : true, geojson : true, region:false , world: false}
  		break;

  		case 'regionalmap':
   		return {neighbourg : true, subnational : false, geojson : false, region:false , world: false}
  		break;

  		case 'spider':
  		return {neighbourg : false, subnational : false, geojson : false, region:true , world: true}
  		break;

  		case 'timeserie':
   		return {neighbourg : false, subnational : false, geojson : false, region:true , world: true}
  		break;

  		default:
  		return {neighbourg : false, subnational : false, geojson : false, region:false , world: false}
  		break;
  	}

}

