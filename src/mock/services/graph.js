import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const components = () => {
  return builder(
      [{
        groupName: '1',
        nodeNum: '1',
        children: [{
          nodeName: '读数据',
          status: 'success',
          nodeId: 'modelEval',
          nodeModule:'abc',
        }],

      }]
  )
}

const thresholdData = () => {
  return builder(
    {
      columns: [
        {
          title: '',
          dataIndex: 'name',
          key: 'name',
          merge: true
        },{
          title: 'dataset',
          dataIndex: 'dataset',
          key: 'dataset',
          merge: true
        },{
          title: 'F1-score',
          dataIndex: 'f1',
          key: 'f1',
          merge: true
        },{
          title: 'true label \\ predict label',
          dataIndex: 'label',
          key: 'label',
          merge: false
        },{
          title: '0',
          dataIndex: '0',
          key: '0',
          merge: false
        },{
          title: '1',
          dataIndex: '1',
          key: '1',
          merge: false
        },
      ],
      data: [{
        name: 'hetero_lr_0',
        dataset: 'train',
        f1: '0.944904',
        label: '0',
        '0': '186(32.6889%)',
        '1': '26(4.5697%)'
      },{
        name: 'hetero_lr_0',
        dataset: 'train',
        f1: '0.944904',
        label: '1',
        '0': '14(2.4605%)',
        '1': '343(60.2812%)'
      }]
    }
  )
}
Mock.mock(/\/v1\/algorithmComponents/, 'get', components)
Mock.mock(/\/v1\/evalThreshold/, 'post', thresholdData)
