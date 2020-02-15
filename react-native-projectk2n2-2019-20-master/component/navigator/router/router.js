import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Profile_student from '../views/student/profile';
import Profile_teacher from '../views/teacher/profile';
import Login from '../views/general/login';
import Result_student from '../views/student/result';
import Result_teacher from '../views/teacher/result';
import Schedule_teacher from '../views/teacher/schedule';
import Schedule_student from '../views/student/schedule';
import SchoolSchedule from '../views/schoolSchedule';

const Routes = () => (
    <Router>
       <Scene key = "root">
          <Scene key = "Profile" component = {Profile} title = "Home" initial = {true} />
          <Scene key = "Loading" component = {Loading} title = "Loading" initial = {true} />
          <Scene key = "Profile_teacher" component = {Profile_teacher} title = "About" />
          <Scene key = "Login" component = {Login} title = "Home" initial = {true} />
          <Scene key = "Result" component = {Result} title = "Result" />
          <Scene key = "Result_teacher" component = {Result_teacher} title = "Result_teacher" />
          <Scene key = "Schedule" component = {Schedule} title = "Schedule" />
          <Scene key = "Schedule_teacher" component = {Schedule_teacher} title = "Schedule_teacher"/>
          <Scene key = "schoolSchedule" component = {SchoolSchedule} title = "SchoolSchedule"/>
       </Scene>
    </Router>
 )
 export default Routes
