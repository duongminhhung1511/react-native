import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../../views/login';
import teacherProfile from '../../views/teacher/Profile';

const scheduleNav = createStackNavigator({
    Login: {
      screen: Login
    },
    Profile:{
      screen: teacherProfile
    }
  },{
    headerMode: 'none'
})

export default scheduleNav;