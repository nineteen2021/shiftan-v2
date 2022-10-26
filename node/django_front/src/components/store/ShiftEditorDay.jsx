import * as React from 'react';
import '../../App.css'
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
  ViewState, GroupingState, IntegratedGrouping, IntegratedEditing, EditingState,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  Appointments,
  AppointmentTooltip,
  GroupingPanel,
  DayView,
  WeekView,
  ViewSwitcher,
  DragDropProvider,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  teal, indigo, red, purple,
} from '@mui/material/colors';
import NoMatch from '../function/NoMatch';

const getUsersF = () => {
  axios
  .get('http://localhost:8000/api-auth/users/',{
      headers: {
          'Authorization': `JWT ${window.localStorage.getItem('access')}`, // ここを追加
      }
  })
  .then(res=>{
    console.log("ユーザーの情報を取得しました")
    let userArr = new Array();
    for(let i = 0; res.data.length > i; i++){
      let tmp = {
        text: res.data[i].last_name + res.data[i].first_name,
        id: res.data[i].id,
        color: teal,
      }
      userArr.push(tmp);
    }
    console.log(userArr);
    console.log(owners);
    return userArr;
  })
  .catch(err=>{
    console.log(err);
    return err;
  });
}

const appointments = [{
  id: 0,
  title: 'Watercolor Landscape',
  members: [3],
  roomId: 1,
  startDate: new Date(2017, 4, 28, 9, 30),
  endDate: new Date(2017, 4, 28, 12, 0),
}, {
  id: 1,
  title: 'Oil Painting for Beginners',
  members: [5],
  roomId: 1,
  startDate: new Date(2017, 4, 28, 12, 30),
  endDate: new Date(2017, 4, 28, 14, 30),
}, {
  id: 2,
  title: 'Testing',
  members: [1],
  roomId: 1,
  startDate: new Date(2017, 4, 28, 12, 30),
  endDate: new Date(2017, 4, 28, 14, 30),
}, {
  id: 3,
  title: 'Final exams',
  members: [1],
  roomId: 1,
  startDate: new Date(2017, 4, 28, 9, 30),
  endDate: new Date(2017, 4, 28, 12, 0),
}];

const owners = [{
  text: '読み込み中',
  id: -1,
}];

const locations = [
  { id: 1, text: 'Room 1'  },
  { id: 2, text: 'Room 2' },
];

const localization = {
  allDayLabel: '終日',
  detailsLabel: '概要',
  titleLabel: 'タイトル',
  commitCommand: '保存',
  moreInformationLabel: '追加の情報',
  notesLabel: 'メモ',
  today: '今日',
};

const shift_range_FK = 1;

const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Day';
export default class ShiftEditorDay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: new Array(),
      mainResourceName: 'locations',
      resources: [{
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      },{
        fieldName: 'roomId',
        title: 'Location',
        instances: locations,
      }, ],
      grouping: [{
        resourceName: 'members',
      }],
      groupByDate: isWeekOrMonthView,
      isGroupByDate: true,
      users: null,
      success: false,
      moveTmp: false,
      outOfStoreRange: false,
      shift_rangeStart_date: '',
      shift_rangeStop_date: '',
      shift_rangeName: "読み込み中",
      bad_store_id: false,
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  

  async getShiftData() {
    //シフトデータを持ってくる
    await axios
    .get('http://localhost:8000/api/tmp_work_schedule/',{
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      console.log("シフト取得")
      console.log(res.data)
      let workScheduleArr = new Array();
      for(let i = 0; res.data.length > i; i++){
        let tmp = {
          id: res.data[i].id,
          title: 'シフト希望',
          members: [-1],
          roomId: 2,
          startDate: res.data[i].start_time,
          endDate: res.data[i].stop_time,
        }
        workScheduleArr.push(tmp);
      }
      console.log(workScheduleArr);
      this.setState({data: workScheduleArr})
      return workScheduleArr;
    })
    .catch(err=>{
      console.log(err);
      return null;
    });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        console.log("以下が追加")
        console.log(added) 
        console.log(added.endDate) 
        console.log(new Date(this.state.shift_rangeStop_date + " 00:00:00")) 
        //もし、追加したシフトがstorerangeを超えたら
        if(added.startDate<=new Date(this.state.shift_rangeStart_date + " 00:00:00") || added.endDate>=new Date(this.state.shift_rangeStop_date + " 24:00:00")){ 
          this.setState({
            outOfStoreRange:true
          })
          const toRef = setTimeout(() => {
            this.setState({
              outOfStoreRange: false
            })
            clearTimeout(toRef);
          }, 5000)
        }else{
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        }
      }
      if (changed) {
        console.log("以下が更新")
        console.log(changed)
        console.log(Object.entries(changed)[0][1])
        //もし、変更したシフトがシフト希望だったら
        if(Object.keys(changed)[0].endsWith('t')){
          this.setState({
            moveTmp:true
          })
          const toRef = setTimeout(() => {
            this.setState({
              moveTmp: false
            })
            clearTimeout(toRef);
          }, 5000)
        //もし、変更したシフトがstorerangeを超えたら
        }else if(Object.entries(changed)[0][1].startDate<=new Date(this.state.shift_rangeStart_date + " 00:00:00") || Object.entries(changed)[0][1].endDate>=new Date(this.state.shift_rangeStop_date + " 24:00:00")){
          this.setState({
            outOfStoreRange:true
          })
          const toRef = setTimeout(() => {
            this.setState({
              outOfStoreRange: false
            })
            clearTimeout(toRef);
          }, 5000)
        }else{
          data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            console.log(Object.keys(changed)[0]);
        }
      }
      if (deleted !== undefined && !String(deleted).endsWith('t')) {
        console.log("以下を削除")
        console.log(deleted)
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  async componentDidMount() { //コンポーネントが読み込まれた際の処理
    const windowUrl = window.location.search;
    const query2 = new URLSearchParams(windowUrl);
    let ownerAccount; //店長のユーザーデータが入る関数
    await axios
    .get('http://localhost:8000/api-auth/users/me/',{
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      console.log("店長のユーザーの情報を取得しました")
      ownerAccount = res.data
      console.log(ownerAccount)
    })
    .catch(err=>{
      console.log(err);
    });

  //   if (!ownerAccount){  //遷移がうまくいかない
  //     console.log("usersがないよ");
  //     return null;
  // } else if (ownerAccount.is_manager === false) {
  //   console.log("はじき出すよ")
  //     return (
  //       <Navigate to="/*"/>
  //     );
  // }

    await axios //店に所属しているすべてのユーザーの情報をとってくる
    .get('http://127.0.0.1:8000/api/user/?store_FK=' + ownerAccount.store_FK,{ //TODO:storeFKで絞り込めないので、絞り込めるようにする
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{ //とってきた情報からカレンダーのライブラリに合わせた形式にする
      console.log("ユーザーの情報を取得しました")
      let userArr = new Array();
      for(let i = 0; res.data.length > i; i++){
        let tmp = {
          text: res.data[i].last_name + res.data[i].first_name,
          id: res.data[i].id,
          color: teal,
        }
        userArr.push(tmp);
      }
      console.log(userArr);
      this.setState({resources: [{ //カレンダー表示のためのstateにsetする
        fieldName: 'members',
        title: 'Members',
        instances: userArr,
        allowMultiple: true,
      },{
        fieldName: 'tmp',
        title: 'Location',
        instances: locations,
      }, ]})
      this.setState({users: res.data}) //users stateにsetする
    })
    .catch(err=>{
      console.log('再試行します');
    axios //店に所属しているすべてのユーザーの情報をとってくる
    .get('http://127.0.0.1:8000/api/user/?store_FK=' + ownerAccount.store_FK,{ //TODO:storeFKで絞り込めないので、絞り込めるようにする
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{ //とってきた情報からカレンダーのライブラリに合わせた形式にする
      console.log("ユーザーの情報を取得しました")
      let userArr = new Array();
      for(let i = 0; res.data.length > i; i++){
        let tmp = {
          text: res.data[i].last_name + res.data[i].first_name,
          id: res.data[i].id,
          color: teal,
        }
        userArr.push(tmp);
      }
      console.log(userArr);
      this.setState({resources: [{ //カレンダー表示のためのstateにsetする
        fieldName: 'members',
        title: 'Members',
        instances: userArr,
        allowMultiple: true,
      },{
        fieldName: 'tmp',
        title: 'Location',
        instances: locations,
      }, ]})
      this.setState({users: res.data}) //users stateにsetする
    })
    .catch(err=>{
      console.log(err);
    });
    });

    //シフト希望のデータを持ってくる
    await axios
    .get('http://localhost:8000/api/tmp_work_schedule/?shift_range_FK=' + query2.get('id'),{
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      console.log("シフト希望取得")
      console.log(res.data)
      let tmpWorkScheduleArr = new Array();
      for(let i = 0; res.data.length > i; i++){
        let tmp = {
          id: res.data[i].id + 't',
          title: 'シフト希望',
          members: [res.data[i].user_FK],
          roomId: 2,
          startDate: res.data[i].start_time,
          endDate: res.data[i].stop_time,
        }
        tmpWorkScheduleArr.push(tmp);
      }
      this.setState({data: tmpWorkScheduleArr})
    })
    .catch(err=>{
      console.log(err);
    });

    //シフトデータを持ってくる
    await axios
    .get('http://localhost:8000/api/work_schedule/?shift_range_FK=' + query2.get('id'),{
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      console.log("work_scheduleシフト取得")
      console.log(res.data)
      let workScheduleArr = new Array();
      for(let i = 0; res.data.length > i; i++){
        let tmp = {
          id: res.data[i].id,
          title: undefined,
          members: [res.data[i].user_FK],
          roomId: 1,
          startDate: res.data[i].start_time,
          endDate: res.data[i].stop_time,
        }
        workScheduleArr.push(tmp);
      }
      //console.log(workScheduleArr);
      //this.setState({data: workScheduleArr})
      this.setState({ data: [...this.state.data, ...workScheduleArr] })
      console.log(this.state.data)
    })
    .catch(err=>{
      console.log(err);
    });
    
    //shift_rangeを持ってくる
    await axios
    .get('http://localhost:8000/api/shift_range/'+ query2.get('id') + '/',{
        headers: {
            'Authorization': `JWT ${window.localStorage.getItem('access')}`,
        }
    })
    .then(res=>{
      console.log("shift_range取得")
      console.log(res.data)
      if(res.data.store_FK != ownerAccount.store_FK) {
        console.log("誤った店舗");
        this.setState({bad_store_id: true}); //自分が所属していない店舗IDだった場合bad_store_idフラグをtrueに
      }
      this.setState({
        shift_rangeStart_date: res.data.start_date,
        shift_rangeStop_date: res.data.stop_date,
        shift_rangeName: res.data.shift_name
      })
    })
    .catch(err=>{
      console.log(err);
    });

}

  

  render() {
    // const checkOwner = () => { //renderの後でNavigateを頑張ってみたがうまくいかず
    //   const isManager = ownerAccount.is_manager
    //   return(
    //     {isManager ? <Navigate to="/*" />}
    //   );
    // }
    const { data, resources, grouping, groupByDate, isGroupByDate, success, moveTmp, outOfStoreRange , shift_rangeName, shift_rangeStart_date, shift_rangeStop_date, bad_store_id } = this.state;
    console.log('現在のシフトデータ');
    console.log(this.state.data)

    const updateData = () => {
      const windowUrl = window.location.search;
      const query2 = new URLSearchParams(windowUrl);
      let onlyShift = this.state.data.filter(function(data){
        return !String(data.title).match(/シフト希望/)
      });
      console.log(onlyShift);
      let resurtBase = new Array();
      for (let i = 0; i < onlyShift.length; i++){
        let tmp = {
          id: onlyShift[i].id,
          user_FK: onlyShift[i].members[0],
          shift_range_FK: query2.get('id'),
          start_time:onlyShift[i].startDate,
          stop_time:onlyShift[i].endDate,
        }
        resurtBase.push(tmp);
      }
      console.log("以下をpushします")
      console.log(resurtBase)

      axios //まずは消す
      .delete('http://localhost:8000/api/work_schedule/?fk=' + query2.get('id') ,
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${window.localStorage.getItem('access')}`,
          }
      })
      .then(
        res=>{console.log(res.data);
        console.log('削除しました')
        axios //ユーザー情報を送信
        .post('http://localhost:8000/api/work_schedule/',
            
          resurtBase
            
        ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${window.localStorage.getItem('access')}`,
            }
        })
        .then(
          res=>{console.log(res.data);
          console.log('書き込みが完了しました')
          this.setState({
            success: true
          })
          const toRef = setTimeout(() => {
            this.setState({
              success: false
            })
            clearTimeout(toRef);
            // it is good practice to clear the timeout (but I am not sure why)
          }, 5000)
        })
        .catch(err=>{console.log(err);});
        })
      .catch(err=>{console.log(err);});

      
    }
    //shift_rangeStart_dateに値が入るまでnullを返し続ける
    if(!shift_rangeStart_date) return( null );
    //クエリパラメーターに不正なIDが入った場合に「このページは存在しません」とエラー
    if(bad_store_id) return(<NoMatch/>);
    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate={String(shift_rangeStart_date)}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
            groupByDate={groupByDate}
          />
          <DayView
            displayName="日表示"
            startDayHour={0}
            endDayHour={24}
            intervalCount={1}
          />
          <WeekView
            displayName="週表示"
            startDayHour={10}
            endDayHour={19}
          />
          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton messages={localization}/>
          <Collapse in={success}>
            <Alert severity="success">
            <AlertTitle>成功</AlertTitle>
              保存に成功しました
            </Alert>
          </Collapse>
          <Collapse in={moveTmp} className='moveTmp'>
            <Alert severity="error">
            <AlertTitle>エラー</AlertTitle>
              シフト希望は操作できません
            </Alert>
          </Collapse>
          <Collapse in={outOfStoreRange} className='moveTmp'>
            <Alert severity="error">
            <AlertTitle>エラー</AlertTitle>
              以下のシフト範囲内で指定してください<br/>
              {this.state.shift_rangeStart_date + ' ～ ' + this.state.shift_rangeStop_date}
            </Alert>
          </Collapse>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={0}>
            <Typography variant="h5" gutterBottom sx={{ml:3, mt:1}}>
              {'「' + this.state.shift_rangeName +'」' + ' ' + this.state.shift_rangeStart_date + ' ～ ' + this.state.shift_rangeStop_date}
            </Typography>
            </Grid>
            <Grid item xs={0}>
              <Button 
                variant="contained" 
                sx={{mr:3, mt:1}}
                onClick={() => {
                  updateData()
                }}
              >
                保存
              </Button>
            </Grid>
          </Grid>
          <Appointments  />
          <Resources
            data={resources}
            mainResourceName="members"
          />
          <IntegratedGrouping />
          <IntegratedEditing />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm messages={localization}/>
          <GroupingPanel />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
