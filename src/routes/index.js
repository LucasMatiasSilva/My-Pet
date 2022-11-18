import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/welcome'
import SingIn from '../pages/singIn';
import SingUp from '../pages/singUp';
import Home from '../pages/home'

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
            name="Home"
            component={Home}
            options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}