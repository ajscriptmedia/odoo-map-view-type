from odoo import models, fields


class AjsContact(models.Model):
    _name = 'ajs.contact'
    _description = 'AJS Contact'

    name = fields.Char()
    age = fields.Integer()
