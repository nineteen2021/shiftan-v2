import * as React from 'react';
import '../App.css'
import Paper from '@mui/material/Paper';
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
  DragDropProvider,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import {
  teal, indigo,
} from '@mui/material/colors';

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
  text: '山田',
  id: 1,
  color: indigo,
}, {
  text: '吉田',
  id: 2,
  color: teal,
}, {
  text: '太郎',
  id: 3,
  color: teal,
}, {
  text: '田村',
  id: 4,
  color: teal,
}, {
  text: '山口',
  id: 5,
  color: teal,
}, {
  text: '小林',
  id: 6,
  color: teal,
}, {
  text: '田村',
  id: 7,
  color: teal,
}];

const localization = {
  allDayLabel: '終日',
  detailsLabel: '概要',
  titleLabel: 'タイトル',
  commitCommand: '保存',
  moreInformationLabel: '追加の情報',
  notesLabel: 'メモ',
  today: '今日',
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      resources: [{
        fieldName: 'members',
        title: 'Members',
        instances: owners,
        allowMultiple: true,
      }, ],
      grouping: [{
        resourceName: 'members',
      }],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources, grouping } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
        >
          <ViewState
            defaultCurrentDate="2017-05-28"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
          />
          <DayView
            startDayHour={0}
            endDayHour={24}
            intervalCount={1}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton messages={localization}/>
          <Appointments />
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
