/**
 * Display a comparison between subnational area, on a map.
 * It uses Leaflet to display data.
 *
 * @param {String} container - Where should the dataviz be displayed ?
 * @param {Object} return_data - All the data from the parsing.
 * @param {String} credits - How should the dataviz be credited ? This will be interpreted as HTML.

 * @returns {Object} Highcharts.Chart  
 */


export default function (container, return_data, credits) {
    console.log(map)
    if (map == undefined){
        var map = L.map(container).setView([return_data.view[1], return_data.view[2]], return_data.view[3]);

    } else {
        map.remove()
        map = L.map(container).setView([return_data.view[1], return_data.view[2]], return_data.view[3]);

    }


    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.light'
    }).addTo(map);

    var Indicator = return_data.json.features[0].properties.Indicator

    var Max = 0;
    var Min = 100000;

    return_data.json.features.map(function(f) {
        if (f.properties.Value > Max) {
            Max = f.properties.Value;
        }
        if (f.properties.Value < Min) {
            Min = f.properties.Value;
        }
    })

    function getColor(d, Max, Min) {

        return d > Math.round(Min + (4 / 5) * (Max - Min)) ? '#092f47' :
            d > Math.round(Min + (3 / 5) * (Max - Min)) ? '#3e6b82' :
            d > Math.round(Min + (2 / 5) * (Max - Min)) ? '#50A1D8' :
            d > Math.round(Min + (1 / 5) * (Max - Min)) ? '#77abce' :
            d > Math.round(Min) ? '#90c3db' :
            '#E0E9F0';
    }

    function style(feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature.properties.Value, Max, Min)
        };
    }


    // control that shows state info on hover
    var info = L.control();

    info.onAdd = function(map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };
    info.update = function(props) {
        this._div.innerHTML = (props ? '<h3>' + Indicator + '</h3>' + '<h4>' + props.CharacteristicLabel.substr(2, props.CharacteristicLabel.length) + '</h4>' + props.Value + ' %' +'<br><h3> Survey Year</h3><h4>'+return_data.year +'</h4>':
            Indicator);
    };

    info.addTo(map);

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        info.update(layer.feature.properties);
    }

    var geojson;

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }


    geojson = L.geoJson(return_data.json, {
        onEachFeature: onEachFeature,
        style: style
    }).addTo(map);


    var legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function(map) {
        console.log(Min)
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [Min, Math.round(Min + (1 / 5) * (Max - Min)), Math.round(Min + (2 / 5) * (Max - Min)), Math.round(Min + (3 / 5) * (Max - Min)), Math.round(Min + (4 / 5) * (Max - Min)), Math.round(Max)],
            labels = [],
            from, to;

        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            console.log('<i style="background:' + getColor(from + 1, Max, Min) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'))

            labels.push(
                '<i style="background:' + getColor(from + 1, Max, Min) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

}