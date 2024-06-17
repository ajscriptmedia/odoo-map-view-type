from odoo import models, fields


class AjsContact(models.Model):
    _name = 'ajs.contact'
    _description = 'AJS Contact'

    name = fields.Char()
    age = fields.Integer()
    latitude = fields.Float(digits=(10, 7))
    longitude = fields.Float(digits=(10, 7))
