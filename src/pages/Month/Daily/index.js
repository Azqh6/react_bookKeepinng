import classNames from 'classnames'
import './index.scss'
import dayjs from 'dayjs'
import {useMemo} from 'react'

const DailyBill = ({dailyList}) => {
    const dailyDate=dayjs(dailyList[0].date).format('MM-DD').split('-')
    const dailyResult=useMemo(()=>{
        let pay=dailyList.filter(item=>item.type==='pay').reduce((pre,cur)=>{return pre+cur.money},0)
        let income=dailyList.filter(item=>item.type==='income').reduce((pre,cur)=>{return pre+cur.money},0)
        let result= pay + income
        return {
            pay,
            income,
            result
        }
    },[dailyList])
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{dailyDate[0]+'月'+dailyDate[1]+'日'}</span>
          <span className={classNames('arrow')}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">支出</span>
            <span className="money">{dailyResult.pay.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">收入</span>
            <span className="money">{dailyResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{dailyResult.result.toFixed(2)}</span>
            <span className="type">结余</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DailyBill