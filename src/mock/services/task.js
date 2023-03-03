import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const taskInfo = () => {
  return builder(
    {
      records: [{
        name: 'abc',
        type: 0,
        uuid: '123'
      }]
    }
  )
}

const taskExeHis = () => {
  return builder([{

  },{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}])
}

Mock.mock(/\/v1\/project\/undefined\/job/, 'get', taskInfo)
Mock.mock(/\/v1\/project\/\/job/, 'get', taskInfo)
Mock.mock(/\/v1\/job\/history/, taskExeHis)
