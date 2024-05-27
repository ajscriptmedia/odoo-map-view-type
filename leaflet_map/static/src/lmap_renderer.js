/** @odoo-module */

import { Component, onWillStart, useRef, onMounted } from "@odoo/owl"
import { loadJS, loadCSS } from "@web/core/assets"

export class LeafletMapRenderer extends Component {
    static template = "leaflet_map.MapRenderer"
    static props = {}

    setup(){
        this.root = useRef('map')

        onWillStart(async ()=>{
            await loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css")
            await loadJS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js")
        })

        onMounted(()=>{
            this.map = L.map(this.root.el).setView([51.505, -0.09], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            const marker = L.marker([51.5, -0.09]).addTo(this.map);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup. <br/><br/> <button class='btn btn-primary'>Open</button>");
        })
    }
}