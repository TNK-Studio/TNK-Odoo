# -*- coding: utf-8 -*-

from odoo import models, fields, api


class MethodExecutorWizard(models.TransientModel):
    _name = 'method.executor.wizard'
    _description = 'Method Executor Wizard'

    @api.model
    def _select_objects(self):
        records = self.env['ir.model'].search([])
        return [(record.model, record.name) for record in records]

    exc_type = fields.Selection(
        selection=[('model', 'Model'), ('record', 'Record')],
        default='model',
        string='Reference type')
    ref_id = fields.Reference(
        selection='_select_objects', string='Reference record')
    res_model = fields.Selection(
        selection='_select_objects', string='Reference model')
    method_name = fields.Char('Method name', required=True)
    context = fields.Text('Context')
    exc_args = fields.Text('Execute args')

    @api.multi
    def action_execute(self):
        pass
