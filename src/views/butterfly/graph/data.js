export const VueGraphData = {
    nodeData: [
        {
            id: '1',
            shape: 'vue-shape',
            x: 290,
            y: 110,
            data: {
                nodeName: '读数据',
                status: 'success',
                nodeId: 'reader'
            },
            ports: [
                {
                    id: '1-1',
                    group: 'bottom',
                },
            ],
        },
        {
            id: '2',
            shape: 'vue-shape',
            x: 290,
            y: 225,
            data: {
                nodeName: '逻辑回归',
                status: 'running',
                nodeId: 'logistic'
            },
            ports: [
                {
                    id: '2-1',
                    group: 'top',
                },
                {
                    id: '2-2',
                    group: 'bottom',
                },
                {
                    id: '2-3',
                    group: 'bottom',
                },
            ],
        },
        {
            id: '3',
            shape: 'vue-shape',
            x: 170,
            y: 350,
            data: {
                nodeName: '模型预测',
                status: 'success',
                nodeId: 'modelpredict'
            },
            ports: [
                {
                    id: '3-1',
                    group: 'top',
                },
                {
                    id: '3-2',
                    group: 'bottom',
                },
            ],
        },
        {
            id: '4',
            shape: 'vue-shape',
            x: 450,
            y: 350,
            data: {
                nodeName: '读取参数',
                status: 'success',
                nodeId: 'dataio'
            },
            ports: [
                {
                    id: '4-1',
                    group: 'top',
                },
                {
                    id: '4-2',
                    group: 'bottom',
                },
            ],
        },
        {
            id: '5',
            shape: 'edge',
            source: {
                cell: '1',
                port: '1-1',
            },
            target: {
                cell: '2',
                port: '2-1',
            },
            zIndex: 0,
            connector: {
                name: 'algo-connector',
                args: {},
            },
        },
        {
            id: '6',
            shape: 'edge',
            source: {
                cell: '2',
                port: '2-2',
            },
            target: {
                cell: '3',
                port: '3-1',
            },
            zIndex: 0,
            connector: {
                name: 'algo-connector',
                args: {},
            },
        },
        {
            id: '7',
            shape: 'edge',
            source: {
                cell: '2',
                port: '2-3',
            },
            target: {
                cell: '4',
                port: '4-1',
            },
            zIndex: 0,
            connector: {
                name: 'algo-connector',
                args: {},
            },

        },
    ],
    nodeImage: {
        logo: 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*evDjT5vjkX0AAAAAAAAAAAAAARQnAQ',
        success:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ',
        failed:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ',
        running:
            'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ',
    },
    nodeStatusList: [
        [
            {
                id: 'f57aa256-9262-402d-9557-ab61944cc894',
                status: 'running',
            },
            {
                id: '654ab51b-86a5-4286-a4e5-bd613f045364',
                status: 'default',
            }
        ],
        [
            {
                id: 'f57aa256-9262-402d-9557-ab61944cc894',
                status: 'success',
            },
            {
                id: '654ab51b-86a5-4286-a4e5-bd613f045364',
                status: 'running',
            }
        ],
        [
            {
                id: 'f57aa256-9262-402d-9557-ab61944cc894',
                status: 'success',
            },
            {
                id: '654ab51b-86a5-4286-a4e5-bd613f045364',
                status: 'success',
            }
        ]
    ],
    nodeList: [{
        id: 1,
        groupName: '样本集组件',
        nodeNum: 2,
        children: [{
            nodeId: 'dataio',
            nodeName: '样本集加载器v1.0',
            nodeImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521191038714&di=117b8f1d83605767e8a7faf01cb9be9b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F8435e5dde71190efc4376916c41b9d16fcfa602f.jpg',
            nodeModule: 'DataIo'
        }]
    }, {
        id: 2,
        groupName: '机器学习',
        nodeNum: 3,
        children: [{
            nodeId: 'logistic',
            nodeName: '纵向逻辑回归',
            nodeImage: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3679981803,1758706610&fm=27&gp=0.jpg',
            nodeModule: 'logistic'
        }, {
            nodeId: 'mpc_npz',
            nodeName: 'MPC_NPZ',
            nodeImage: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2406805917,4090912031&fm=27&gp=0.jpg',
            nodeModule: 'mpc_npz'
        }, {
            nodeId: 'mpc_ls',
            nodeName: '评分卡',
            nodeImage: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2406805917,4090912031&fm=27&gp=0.jpg',
            nodeModule: 'mpc_ls'
        }]
    }]
}
