/** @odoo-module */

import { visitXML } from "@web/core/utils/xml"

export class LeafletMapArchParser {
    parse(arch){
        console.log(arch)

        const latitude = arch.getAttribute("latitude")
        const longitude = arch.getAttribute("longitude")

        //arch.getElementsByTagName("field")

        const fieldsToDisplay = []

        visitXML(arch, (node) => {
            if (node.tagName === "field"){
                fieldsToDisplay.push(node.getAttribute("name"))
            }
        })

        return {
            latitude,
            longitude,
            fieldsToDisplay
        }
    }
}