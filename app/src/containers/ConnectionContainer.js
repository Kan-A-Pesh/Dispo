
import { Button, Text } from '@ui-kitten/components';
import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './../screens/connections/LoginScreen';
import SignupScreen from './../screens/connections/SignupScreen';

const Stack = createNativeStackNavigator();

const MainScreen = ({ navigation, route }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF"
        }}>
            <Image
                style={{
                    height: 175,
                    width: 175,
                    marginBottom: 30,
                }}
                source={require("./../../assets/icon.png")}
            />
            <Button 
                appearance='filled'
                size="giant"
                style={{
                    marginHorizontal: 30,
                    marginVertical: 10,
                    minWidth: "65%",
                    borderRadius: 30
                }}
                onPress={() => {
                    navigation.navigate("Inscription")
                }}
            >
                Créer un compte
            </Button>
            <Button
                appearance='outline'
                size="giant"
                style={{
                    marginHorizontal: 30,
                    marginVertical: 10,
                    minWidth: "65%",
                    borderRadius: 30
                }}
                onPress={() => {
                    navigation.navigate("Connection")
                }}
            >
                Se connecter
            </Button>
        </View>
    );
}


export default ({ onLogin }) => {

    const navOptions = {
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: "#FFF"
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name=" " component={MainScreen} options={navOptions} />
                <Stack.Screen name="Connection" options={navOptions}>
                    {(props) => (<LoginScreen {...props} onLogin={onLogin} />)}
                </Stack.Screen>
                <Stack.Screen name="Inscription" options={navOptions}>
                    {(props) => (<SignupScreen {...props} onLogin={onLogin} />)}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};