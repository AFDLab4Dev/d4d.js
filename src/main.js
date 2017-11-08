import common_ressources from './data/common_ressources.json';


import display_comparison from './display/comparison.js';
import display_infranational from './display/infranational.js';
import display_regionalmap from './display/regionalmap.js';
import display_spider from './display/spider.js';
import display_timeserie from './display/timeserie.js';

import parse_dhs_comparison from "./parse/DHS/comparison.js";
import parse_dhs_infranational from "./parse/DHS/infranational.js";
import parse_dhs_regionalmap from "./parse/DHS/regionalmap.js";
import parse_dhs_timeserie from "./parse/DHS/timeserie.js";

import parse_wdi_comparison from "./parse/WDI/comparison.js";
import parse_wdi_regionalmap from "./parse/WDI/regionalmap.js";
import parse_wdi_spider from "./parse/WDI/spider.js";
import parse_wdi_timeserie from "./parse/WDI/timeserie.js";

import prepare_dhs from "./prepare/dhs.js"
import prepare_wdi from  "./prepare/wdi.js"

var d4d = {};
d4d.common_ressources = common_ressources;

import {gps_dict} from "./data/gps_dict.js"
import {income_list} from "./data/income_list.js"
import {iso2toiso3} from "./data/iso2toiso3.js"
import {iso3toiso2} from "./data/iso3toiso2.js"
import {world_list} from "./data/world_list.js"
import {dhs_credit} from "./data/dhs_credit.js"
import {wdi_credits} from "./data/wdi_credits.js"

d4d.common_ressources.income_list = income_list;
d4d.common_ressources.iso2toiso3 = iso2toiso3;
d4d.common_ressources.iso3toiso2 = iso3toiso2;
d4d.common_ressources.world_list = world_list; 
d4d.common_ressources.gps_dict = gps_dict;
d4d.common_ressources.credits = {};
d4d.common_ressources.credits.dhs = dhs_credit;
d4d.common_ressources.credits.wdi = wdi_credits;


d4d.display = {}; 
d4d.display.comparison = display_comparison;
d4d.display.infranational = display_infranational; 
d4d.display.regionalmap = display_regionalmap;
d4d.display.spider = display_spider;
d4d.display.timeserie = display_timeserie;

d4d.parse = {};

d4d.parse.dhs = {};
d4d.parse.dhs.comparison = parse_dhs_comparison;
d4d.parse.dhs.infranational = parse_dhs_infranational;
d4d.parse.dhs.regionalmap = parse_dhs_regionalmap;
d4d.parse.dhs.timeserie = parse_dhs_timeserie;

d4d.parse.wdi = {};
d4d.parse.wdi.comparison = parse_wdi_comparison;
d4d.parse.wdi.spider = parse_wdi_spider;
d4d.parse.wdi.regionalmap = parse_wdi_regionalmap;
d4d.parse.wdi.timeserie = parse_wdi_timeserie;

d4d.prepare = {};
d4d.prepare.dhs = prepare_dhs;
d4d.prepare.wdi = prepare_wdi; 

import generate_vizparams from "./make/vizparams.js"
d4d.generate_vizparams = generate_vizparams

d4d.make = function (container, dataviz_type, API_params, common) {
		var viz_params = d4d.generate_vizparams(dataviz_type);

        var url_array = d4d.prepare[API_params["Furnisher"].toLowerCase()](API_params, viz_params, common);
       console.log(url_array)
        var promise = d4d.parse[API_params["Furnisher"].toLowerCase()][dataviz_type](url_array, API_params, common);
        promise.then(function(return_data) {
            var chart =d4d.display[dataviz_type](container, return_data, common.credits[API_params["Furnisher"].toLowerCase()]);
        	return chart
        });

    };

export default d4d