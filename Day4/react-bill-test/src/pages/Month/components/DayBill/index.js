import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'
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

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow')}></span>
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
    </div>
  )
}
export default DailyBill
