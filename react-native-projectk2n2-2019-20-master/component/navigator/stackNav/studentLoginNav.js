import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../views/general/login';
import studentProfile from '../../views/student/profile';

const loginNav = createStackNavigator({
  Login: {
    screen: Login
  },
  Profile:{
    screen: studentProfile
  }
},{
  headerMode: 'none'
})

export default loginNav;