/**
 *
 *  Copyright 2019 The FATE Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
import { Graph, Addon, Path, Shape } from "@antv/x6";
import "@antv/x6-vue-shape";
import { ports } from "../components/methods";
import { commonEdage } from "./config";
import { cloneDeep } from "lodash";

export default class VueGraph {
    static init(id, nodeTemplate, miniMapContainerRef) {
        this.graph = new Graph({
            container: document.getElementById(id),
            grid: true,
            weight:1200,
            height:800,
            autoResize: true,
            // scroller: true,
            panning: {
                enabled: true,
                eventTypes: ['leftMouseDown', 'mouseWheel'],
            },
            mousewheel: {
                enabled: true,
                modifiers: 'ctrl',
                factor: 1.1,
                maxScale: 1.5,
                minScale: 0.5,
            },
            highlighting: {
                magnetAdsorbed: {
                    name: 'stroke',
                    args: {
                        attrs: {
                            fill: '#fff',
                            stroke: '#31d0c6',
                            strokeWidth: 4,
                        },
                    },
                },
            },
            connecting: {
                snap: true,
                allowBlank: false,
                allowLoop: false,
                highlight: true,
                connector: 'algo-connector',
                connectionPoint: 'anchor',
                anchor: 'center',
                validateMagnet({ magnet }) {
                    return magnet.getAttribute('port-group') !== 'top';
                },
                createEdge() {
                    const newEdge = new Shape.Edge(cloneDeep(commonEdage));
                    return newEdge;
                },
            },
            selecting: {
                enabled: true,
                multiple: true,
                rubberEdge: true,
                rubberNode: true,
                modifiers: 'shift',
                rubberband: true,
            },
            minimap: {
                enabled: true,
                container: miniMapContainerRef
            },
        });
        Graph.registerVueComponent(
            'nodeTemplate',
            {
                template: '<nodeTemplate />',
                components: {
                    nodeTemplate,
                },
            },
            true
        );

        // 注册 nodeTemplate 的链接线
        Graph.registerEdge(
            'dag-edge',
            {
                inherit: 'edge',
                attrs: {
                    line: {
                        stroke: '#C2C8D5',
                        strokeWidth: 1,
                        targetMarker: null,
                    },
                },
            },
            true
        );

        // 注册 nodeTemplate 的链接之间的线样式
        Graph.registerConnector(
            'algo-connector',
            (s, e) => {
                const offset = 4;
                const deltaY = Math.abs(e.y - s.y);
                const control = Math.floor((deltaY / 3) * 2);

                const v1 = { x: s.x, y: s.y + offset + control };
                const v2 = { x: e.x, y: e.y - offset - control };

                return Path.normalize(
                    `M ${s.x} ${s.y}
             L ${s.x} ${s.y + offset}
             C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
             L ${e.x} ${e.y}
            `
                );
            },
            true
        );

        // 控制线链接时的样式
        this.graph.on('edge:connected', ({ edge }) => {
            edge.attr({
                line: {
                    strokeDasharray: '',
                },
            });
        });

        // 控制节点数据变更时线的样式
        this.graph.on('node:change:data', ({ node }) => {
            let edges = this.graph.getIncomingEdges(node);
            let { status } = node.getData();
            edges?.forEach((edge) => {
                if (status === 'running') {
                    edge.attr('line/strokeDasharray', 5);
                    edge.attr('line/style/animation', 'running-line 30s infinite linear');
                } else {
                    edge.attr('line/strokeDasharray', '');
                    edge.attr('line/style/animation', '');
                }
            });
        });

        this.graph.on('node:mouseenter', ({ node }) => {
            console.info('mouseenter')
            node.addTools({
                name: 'button-remove',
                args: {
                    x: '100%',
                    y: 0,
                    offset: { x: -10, y: 10 },
                },
            })
        });

        // 鼠标移开时删除按钮
        this.graph.on('node:mouseleave', ({ node }) => {
            node.removeTools()
        });

        this.graph.on('edge:mouseenter', ({ cell }) => {
            cell.addTools(
                [
                    { name: 'vertices' },
                    {
                        name: 'button-remove',
                        args: {
                            distance: '50%'
                        },
                    },
                ],
            )
        })

        this.graph.on('edge:mouseleave', ({ cell }) => {
            if (cell.hasTool('button-remove')) {
                cell.removeTool('button-remove')
            }
        })

        return this.graph;
    }

    static startDragToGraph(val, e) {
        const graph = this.graph;
        let node = null;
        this.showRight = false;
        //如果同一个组件被使用多次，那么通过dslNodeId进行识别，并用于后续拼接dsl和conf文件作为组件唯一标识使用
        const graphData = this.graph.toJSON();
        const repeatTimes = graphData.cells.filter((item) => (item.shape != 'edge' && item.data.nodeId === val.nodeId)).length;
        console.info('相同的nodeID个数 = ', repeatTimes);
        node = graph.createNode({
            dslNodeId: val.nodeId + '_' + repeatTimes,
            type: 'standard',
            shape: 'vue-shape',
            x: 300,
            y: 300,
            width: 180,
            height: 36,
            ports,
            data: {
                logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
                nodeName: val.nodeName,
                status: 'default',
                nodeId: val.nodeId,
                nodeModule: val.nodeModule
            },
            component: 'nodeTemplate',
            tools: [
                {
                    name: 'button-remove',
                    args: {
                        x: '100%',
                        y: 0,
                        offset: { x: -10, y: 10 },
                    },
                },
            ],
        })

        // switch (type) {
        //     case 'startNode':
        //         node = graph.createNode({
        //             type: 'startNode',
        //             shape: 'vue-shape',
        //             x: 300,
        //             y: 300,
        //             width: 180,
        //             height: 36,
        //             ports,
        //             data: {
        //                 logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
        //                 label: '样本集',
        //                 status: 'default'
        //             },
        //             component: 'nodeTemplate',

        //         })
        //         break
        //     case 'endNode':
        //         node = graph.createNode({
        //             type: 'endNode',
        //             shape: 'vue-shape',
        //             x: 300,
        //             y: 300,
        //             width: 180,
        //             height: 36,
        //             ports,
        //             data: {
        //                 logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ'
        //             },
        //             component: 'nodeTemplate',

        //         })
        //         break
        //     case 'taskNode':
        //         node = graph.createNode({
        //             type: 'taskNode',
        //             shape: 'vue-shape',
        //             x: 300,
        //             y: 300,
        //             width: 180,
        //             height: 36,
        //             ports,
        //             data: {
        //                 name: '任务节点',
        //                 desc: '节点内容',
        //                 logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ'
        //             },
        //             component: 'nodeTemplate',

        //         })
        //         break
        // }

        const dnd = new Addon.Dnd({ target: graph })
        dnd.start(node, e)
    }

    // 销毁
    static destroy() {
        this.graph.dispose();
    }
}