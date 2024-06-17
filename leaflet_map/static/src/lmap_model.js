/** @odoo-module */

export class LeafletMapModel {
    constructor(services, resModel, archInfo){
        this.orm = services.orm
        this.resModel = resModel
        const { latitude, longitude, fieldsToDisplay } = archInfo
        this.latitude = latitude
        this.longitude = longitude
        this.fieldsToDisplay = fieldsToDisplay
    }

    async load(){

        let fields = ["display_name", this.latitude, this.longitude]

        if (this.fieldsToDisplay.length > 0){
            fields = fields.concat(this.fieldsToDisplay)
        }

        const data = await this.orm.searchRead(this.resModel, [], fields)

        this.records = data
    }
}