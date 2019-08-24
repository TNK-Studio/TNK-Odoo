# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import ValidationError

from odoo.tools.safe_eval import safe_eval


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
        if self.exc_type == 'model':
            exc_object = self.env[self.res_model]
        else:
            exc_object = self.ref_id
        name = self.method_name
        if not hasattr(exc_object, name):
            raise ValidationError('Method `{}` not found.'.format(name))
        context = self.context or {}
        if context:
            context = safe_eval(context)
        exc_object = exc_object.with_context(**context)
        func = getattr(exc_object, name)
        return func()
