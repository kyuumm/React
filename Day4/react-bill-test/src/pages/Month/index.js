import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import _, { now } from 'lodash'
import DailyBill from './components/DayBill';

const Month = () => {
  const billList = useSelector(state => state.bill.billList)
  const [dateVisible, setDateVisible] = useState(false);

  //每月的数据数组对象
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'));
  }, [billList])

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format('YYYY-MM');
    //useState 设置初始值的意义
    //组件首次渲染时确保了组件第一次渲染时有一个合理的初始值（用户当前时间的账单），而不是 undefined
  });

  //初始化
  useEffect(() => {
    const nowDate = dayjs(new Date()).format('YYYY-MM');
    //边界值控制
    if (monthGroup && monthGroup[nowDate]) {
      setMonthList(monthGroup[nowDate]);
    } else {
      setMonthList([]);
    }
  }, [monthGroup])
  //当前渲染的账单时间


  //这个 date 参数来自 DatePicker 组件。当用户在 DatePicker 中选择一个日期并点击确认时，
  // DatePicker 会将用户选择的日期作为参数传递给 onConfirm 函数。
  const onConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format('YYYY-MM');
    setCurrentDate(formatDate);
    //访问monthGroup的formaDate数据
    setMonthList(monthGroup[formatDate] || []);
    // console.log(currentMonthList);
  }

  const [currentMonthList, setMonthList] = useState([]);

  const monthResult = useMemo(() => {
    //pay  / income /
    const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0);
    const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0);
    // 参数 a (accumulator) 是累加器，保存上一次计算的累计值
    // 参数 c (current) 是当前正在处理的数组元素
    // a + c.money 表示将累计值加上当前账单的金额
    // 0 是初始值，表示从 0 开始累加
    return {
      pay,
      income,
      total: pay + income
    }
  }, [currentMonthList])
  //useMemo 是 React 的一个 Hook，用于性能优化：它会缓存计算结果，只有当依赖项发生变化时才重新计算
  //避免在每次渲染时都进行昂贵的计算 基本语法：useMemo(() => 计算函数, [依赖项数组])


  //billList → monthGroup → (useEffect 初始化或 onConfirm 手动选择)
  //  → currentMonthList → monthResult → UI 展示。


  //当月所有日账单
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format('MM-DD'));
    const keys = Object.keys(groupData);
    //返回账单日期的数组
    return {
      groupData,
      keys
    }
  }, [currentMonthList])

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
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
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


        {/* 单日账单统计 */}
        {
          dayGroup.keys.map(key => {
            return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
          })
        }
      </div>
    </div >
  )
}

export default Month
