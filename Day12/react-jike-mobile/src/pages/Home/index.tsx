import './style.css'
import { Tabs } from 'antd-mobile'
import { useEffect, useState } from 'react'

import React from 'react'
import useTabs from './useTabs'
import HomeList from './HomeList/index'
const Home = () => {
  const { channels } = useTabs();

  return (
    <div>
      <div className='tabContainer'>
        <Tabs>
          {channels.map((item) => (
            <Tabs.Tab title={item.name} key={item.id}>
              <HomeList />
            </Tabs.Tab>
          ))}

        </Tabs>
      </div>
    </div>)
}

export default Home;