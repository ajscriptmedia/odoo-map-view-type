/** @odoo-module */

import { Component } from "@odoo/owl";
import { standardViewProps } from "@web/views/standard_view_props"
import { LeafletMapRenderer } from "./lmap_renderer"
import { Layout } from "@web/search/layout"

export class LeafletMapController extends Component {
    static template = 'leaflet_map.MapView';
    static components = { LeafletMapRenderer, Layout }
    static props = {
        ...standardViewProps,
    }

    setup(){
        console.log(this)
    }
}