import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { useState ,useMemo,useEffect} from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './Daily'

const Month = () => {
  const [visible,setVisible]=useState(false)
  const [currentDate,setCurrentDate]=useState(()=>{
        return dayjs(new Date()).format('YYYY-M').split('-')
  })
    //获取当月的数据list
    const [monthListGroup,setMonthListGroup]=useState([])
   //按月份对数据进行排序
   const billList=useSelector(state=>state.bill.billList)
   const ListGroup=useMemo(()=>{
    return _.groupBy(billList,(item)=>{return dayjs(item.date).format('YYYY-M')})
  },[billList])
    //按日对数据进行排序
  
   const dayListGroup= useMemo(()=>{
      let dayList=_.groupBy(monthListGroup,(item)=>{return dayjs(item.date).format('MM-DD')})
      let dayKey=Object.keys(dayList)
      return {
        dayList,
        dayKey
      }
    },[monthListGroup])
  //选择时间确认
  const pickDate=(date)=>{
      setVisible(false)
      let pickDate=dayjs(date).format('YYYY-M').split('-')
      let checkDate=dayjs(date).format('YYYY-M')
      setCurrentDate(pickDate)
      setMonthListGroup(ListGroup[checkDate])
  }

  //获取当月 支出 收入 结余 useMemo
  const monthResult= useMemo(()=>{
    if(monthListGroup===undefined){
      return {
        income:0,
        pay:0,
        result:0
      }
    }
    let income=monthListGroup.filter(item=>item.type==='income').reduce((pre,cur)=>{return pre+cur.money},0)
    let pay=monthListGroup.filter(item=>item.type==='pay').reduce((pre,cur)=>{return pre+cur.money},0)
    let result=income+pay
    return {
      income,
      pay,
      result
    }
  },[monthListGroup])
  //页面一渲染，就显示数据
  useEffect(()=>{
    let nowDate=dayjs(new Date()).format('YYYY-M')
    if(ListGroup[nowDate]){
      setMonthListGroup(ListGroup[nowDate])
    }
  },[ListGroup])
  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={()=>setVisible(true)}>
            <span className="text">
              {currentDate[0]} | {currentDate[1]}月账单
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.result}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={visible}
            onConfirm={pickDate}
            onClose={()=>setVisible(false)}
            closeOnMaskClick={true}
            max={new Date()}
          />
       
        </div>
        {/* 单日列表 */}
        {(dayListGroup.dayKey.length>0)? dayListGroup.dayKey.map(item=>{
          return (
            <DailyBill key={item} dailyList={dayListGroup.dayList[item]}></DailyBill>
          )
        }):<div>本月暂无记录</div>}
        
      </div>
    </div >
  )
}

export default Month