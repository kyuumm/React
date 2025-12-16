import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState } from 'react';
import classNames from 'classnames'
import dayjs from 'dayjs';

const Month = () => {
  const [dateVisible, setDateVisible] = useState(false);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM');
    //useState 设置初始值的意义
    //组件首次渲染时确保了组件第一次渲染时有一个合理的初始值（用户当前时间的账单），而不是 undefined
  });

  //这个 date 参数来自 DatePicker 组件。当用户在 DatePicker 中选择一个日期并点击确认时，
  // DatePicker 会将用户选择的日期作为参数传递给 onConfirm 函数。
  const onConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format('YYYY-MM');
    setCurrentDate(formatDate);
  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => { setDateVisible(true) }}>
            <span className="text">
              {currentDate + ''}月账单
            </span>
            <span className={classNames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => { setDateVisible(false) }}
            onConfirm={onConfirm}
            onClose={() => { setDateVisible(false) }}
            max={new Date()}
          />
        </div>
      </div>
    </div >
  )
}

export default Month