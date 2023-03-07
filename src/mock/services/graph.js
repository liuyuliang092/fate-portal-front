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
    [{
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
  )
}

const quantileData = () => {
  return builder([
    {
      name: 'hetero_lr_0',
      dataset: 'train',
      auc: '0.979322',
      ks: '0.847431',
      precision: '0.947214',
      recall: '0.904762'
    }
  ])
}

const getPlotData = () => {
  return builder({
    // xAxis: [0, 0.2, 0.4, 0.6, 0.8, 1],
    series: [{
      name: 'bad',
      type: 'line',
      smooth: true,
      itemStyle: {opacity: 0},
      data: [[0,5], [0.2,20], [0.4,36], [0.6,10], [0.8,10], [1,20]],
    },{
      name: 'good',
      type: 'line',
      smooth: true,
      itemStyle: {opacity: 0},
      data: [[0,15], [0.2,120],[0.3,120], [0.4,136], [0.6,110], [0.8,110], [1,120]],
    },{
      name: 'ks',
      type: 'line',
      smooth: true,
      itemStyle: {opacity: 0},
      data: [[0.4, 36], [0.4, 136]],
    }],
    legend: ['bad','good','ks']
  })
}

Mock.mock(/\/v1\/algorithmComponents/, 'get', components)
Mock.mock(/\/v1\/evalThreshold/, 'post', thresholdData)
Mock.mock(/\/v1\/plotData/, 'post', getPlotData)
Mock.mock(/\/v1\/evalQuantile/, 'post', quantileData)
