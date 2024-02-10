# © 2024 Ruter Lü (<https://ruterly.com>)
# License LGPL-3.0 or later (https://www.gnu.org/licenses/lgpl.html)
{
    'name': 'Web Cam Scanner',
    'category': 'Technical',
    'summary': 'Web cam scanner component',
    'version': '17.0.1.0.0',
    'description': "This module adds a web cam scanner component, so that you can use it on any page.",
    'depends': ['base', 'web'],
    'data': [],
    'author': 'Ruter',
    'website': 'https://github.com/TNK-Studio/TNK-Odoo',
    'installable': True,
    'assets': {
        'web.assets_backend': [
            'web_cam_scanner/static/src/components/scanner/*',
            # 'web_cam_scanner/static/src/js/*',
        ],
    },
    'license': 'LGPL-3',
}
