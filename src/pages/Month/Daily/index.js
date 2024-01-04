import classNames from 'classnames'
import './index.scss'
import dayjs from 'dayjs'
import {useMemo, useState} from 'react'
import { billTypeToName } from '@/contants'
import Icon from '@/components/Icon/Icon'

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
    //控制详细的展开
    const [dailyItem,setDailyItem] = useState(false)
  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon" onClick={()=>setDailyItem(!dailyItem)}>
          <span className="date">{dailyDate[0]+'月'+dailyDate[1]+'日'}</span>
          <span className={classNames('arrow',dailyItem && 'expand')}></span>
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
      {dailyItem && 
      <div className="billList">
      {dailyList.map(item => {
        return (
          <div className="bill" key={item.id}>
            <Icon type={item.type}></Icon>
            <div className="detail">
              
              <div className="billType">{billTypeToName[item.useFor] }</div>
            </div>
            <div className={classNames('money', item.type)}>
              {item.money.toFixed(2)}
            </div>
          </div>
        )
      })}
      </div>
      }
      
    </div>
  )
}
export default DailyBill