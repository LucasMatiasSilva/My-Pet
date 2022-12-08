import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome/Welcome'
import SingIn from '../pages/SingIn/SingIn';
import SingUp from '../pages/SingUp/SingUp';
import TimeList from '../pages/TimeList/TimeList';
import AddTime from '../pages/NewTime/NewTime';

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="SingIn"
            component={SingIn}
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="SingUp"
            component={SingUp}
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="TimeList"
            component={TimeList}
            options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="NewTime"
            component={AddTime}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}