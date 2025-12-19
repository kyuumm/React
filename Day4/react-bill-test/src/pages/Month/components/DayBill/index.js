import classNames from 'classnames'
import './index.scss'
import { useMemo, useState } from 'react'
import { billTypeToName } from '@/contents'
import Icon from '@/components/icon'
const DailyBill = ({ date, billList = [] }) => {

  const dayResult = useMemo(() => {
    //pay  / income /
    const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0);
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0);
    // 参数 a (accumulator) 是累加器，保存上一次计算的累计值
    // 参数 c (current) 是当前正在处理的数组元素
    // a + c.money 表示将累计值加上当前账单的金额
    // 0 是初始值，表示从 0 开始累加
    return {
      pay,
      income,
      total: pay + income
    }
  }, [billList])

  //fold /unfold
  const [visible, setVisible] = useState(false);

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', visible && 'expand')} onClick={() => { setVisible(!visible) }}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dayResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dayResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dayResult.total.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>

      {/* 单日列表 */}
      <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              {/* icon */}
              <Icon type={item.useFor} />
              <div className="detail">
                <div className="billType">{billTypeToName[item.useFor]}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div >
  )
}
export default DailyBill
