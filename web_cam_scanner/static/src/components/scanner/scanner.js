/** @odoo-module **/
// (c) 2024 Ruter Lü (<https://ruterly.com>)
// License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html)

import { loadJS } from "@web/core/assets";

import { Component, onMounted, onWillStart, useRef, useState } from "@odoo/owl";

export class Scanner extends Component {
    setup() {
        this.scannerRef = useRef("scannerRef");
        this.state = useState({
            showScanOverlay: false,
        });

        onWillStart(async () => {
            await loadJS("/web_cam_scanner/static/src/lib/html5-qrcode.min.js");
        });

        onMounted(() => {
            this.scanner = new Html5Qrcode("codeReader");
        });
    }

    _onScanSuccess = async (decodedText, decodedResult) => {
        await this._onScanStop();
        this.props.onCodeScanned(decodedResult);
    }

    _onScanStop = async () => {
        this.state.showScanOverlay = false;
        await this.scanner.stop();
    }

    onScanClicked = () => {
        this.state.showScanOverlay = true;
        this.scanner.start({ facingMode: "environment" }, this.props.config, this._onScanSuccess);
    }

    onScanStopCliked = async () => {
        await this._onScanStop();
    }
}

Scanner.props = {
    buttonClass: { type: String, optional: true },
    config: { type: Object, optional: true },
    onCodeScanned: Function,
    slots: { type: Object, optional: true },
}

Scanner.defaultProps = {
    config: {
        fps: 10,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
            // Square QR Box, with size = 80% of the min edge.
            let minEdgeSizeThreshold = 250;
            let edgeSizePercentage = 0.75;
            let minEdgeSize = (viewfinderWidth > viewfinderHeight) ?
                viewfinderHeight : viewfinderWidth;
            let qrboxEdgeSize = Math.floor(minEdgeSize * edgeSizePercentage);
            if (qrboxEdgeSize < minEdgeSizeThreshold) {
                if (minEdgeSize < minEdgeSizeThreshold) {
                    return {width: minEdgeSize, height: minEdgeSize};
                } else {
                    return {
                        width: minEdgeSizeThreshold,
                        height: minEdgeSizeThreshold
                    };
                }
            }
            return {width: qrboxEdgeSize, height: qrboxEdgeSize};
        }
    },
}

Scanner.template = "web_cam_scanner.Scanner";
