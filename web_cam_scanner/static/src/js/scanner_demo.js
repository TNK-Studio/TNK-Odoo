/** @odoo-module */
// (c) 2024 Ruter Lü (<https://ruterly.com>)
// License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html)

import { registry } from "@web/core/registry";
import { Component, useState, xml } from "@odoo/owl";
import { Scanner } from "../components/scanner/scanner";

const actionRegistry = registry.category("actions");

class ScannerDemo extends Component {
    setup() {
        this.state = useState({
            code: "",
        })
    }
}

ScannerDemo.components = {
    Scanner,
}

ScannerDemo.template = xml`
        <div class="text-center">
            <div class="d-flex justify-content-center p-2">
                <input type="text" name="scanner_demo" t-model="state.code" placeholder="Click the button to scan barcode or qrcode..."/>
                <Scanner onCodeScanned="(res) => { this.state.code = res.decodedText }"></Scanner>
            </div>
        </div>`;

actionRegistry.add("scanner_demo", ScannerDemo);
