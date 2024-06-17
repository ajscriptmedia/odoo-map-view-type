/** @odoo-module */

import { registry } from "@web/core/registry";
import { LeafletMapController } from "./lmap_controller"
import { LeafletMapArchParser } from "./lmap_arch_parser"

const leafletMapView = {
    type: "lmap",
    display_name: "Leaflet Map",
    icon: "fa fa-map-marker",
    multiRecord: true,
    Controller: LeafletMapController,
    ArchParser: LeafletMapArchParser,

    props(genericProps, view){
        //console.log("genericProps", genericProps)
        //console.log(view, action)

        const { ArchParser } = view
        const { arch } = genericProps

        const archInfo = new ArchParser().parse(arch)

        console.log("archInfo", archInfo)

        return { ...genericProps, test: "test", archInfo }
    }
}

registry.category("views").add("lmap", leafletMapView);