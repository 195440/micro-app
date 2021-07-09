/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState, useEffect } from 'react'
import { Button } from 'antd'
import config from '../../config'
import './multiple.less'

function Vue3 () {
  const [data, changeData] = useState({from: '来自基座的初始化数据'})
  const [reactname, changename] = useState('react162')
  useEffect(() => {
    console.time('react16')
  }, [])
  return (
    <div>
      <div className='btn-con'>
        <Button
          type='primary'
          onClick={() => changeData({from: '来自基座的数据' + (+new Date())})}
          style={{width: '120px'}}
        >
          发送数据
        </Button>
        <Button onClick={() => changename('react163')}>改变react16的name</Button>
      </div>
      <div className='multiple-con'>
        <micro-app
          class='multiple-micro-app'
          name={reactname}
          url={`${config.react16}micro-app/react16`}
          data={data}
          baseurl='/micro-app/demo/multiple'
          // destory
          // inline
          // scopecss='false'
        ></micro-app>
        <micro-app
          class='multiple-micro-app'
          name='vue22'
          url={`${config.vue2}micro-app/vue2`}
          data={data}
          // destory
          // inline
          // scopecss='false'
        >
        </micro-app>
      </div>
    </div>
  )
}

export default Vue3