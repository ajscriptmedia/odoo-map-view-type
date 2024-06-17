/** @odoo-module */

import { Component, onWillStart, useRef, onMounted } from "@odoo/owl"
import { loadJS, loadCSS } from "@web/core/assets"
import { useService } from "@web/core/utils/hooks"

export class LeafletMapRenderer extends Component {
    static template = "leaflet_map.MapRenderer"
    static props = {
        model: Object,
        archInfo: Object,
    }

    setup(){
        this.root = useRef('map')
        this.action = useService('action')
        const { latitude, longitude, fieldsToDisplay } = this.props.archInfo
        this.latitude = latitude
        this.longitude = longitude
        this.fieldsToDisplay = fieldsToDisplay

        onWillStart(async ()=>{
            await loadCSS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.css")
            await loadJS("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js")
        })

        onMounted(()=>{
            this.map = L.map(this.root.el).setView([51.505, -0.09], 2);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            this.props.model.records.forEach(record => {
                this.createMarker(record)
            })

            this.map.on('popupopen', ()=>{
                this.openContact()
            })
        })
    }

    createMarker(record){

        if (record[this.latitude] == 0 && record[this.longitude] == 0) return

        const marker = L.marker([record[this.latitude], record[this.longitude]]).addTo(this.map);

        let html = ""

        if (this.fieldsToDisplay.length > 0){
            this.fieldsToDisplay.forEach(field=>{
                html += `<p>${record[field]}</p>`
            })
        } else {
            html += `<p>${record["display_name"]}</p>`
        }

        html += `<button id="leafletMapPopupOpenBtn" data-res-id='${record.id}' class='btn btn-primary'>Open</button>`

        marker.bindPopup(html);
    }

    openContact(){
        const buttons = document.querySelectorAll("#leafletMapPopupOpenBtn")
        buttons.forEach(button => {
            button.addEventListener('click', ()=>{
                console.log("Open button works!")
                // action.doAction or action.switchView | resId
                this.action.switchView("form", { resId: parseInt(button.dataset.resId) })
            })
        })
    }
}