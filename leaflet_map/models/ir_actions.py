from odoo import fields,models


class WindowActionView(models.Model):
    _inherit = "ir.actions.act_window.view"

    view_mode = fields.Selection(selection_add=[("lmap", "Leaflet Map")], ondelete={"lmap": "cascade"})
