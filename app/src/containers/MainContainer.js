import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Button } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CompareScreen from './../screens/CompareScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import ProfileScreen from './../screens/ProfileScreen';

import ProfileNav from '../screens/EditProfileScreen';

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
  },
  headerRight: () => {

    const pulseIconRef = React.useRef();

    return (
      <View style={{
        flexDirection: "row",
      }}>
        <Button
          style={{ height: '100%',
          paddingHorizontal: 5}}
          appearance='ghost'
          status='basic'
          onPress={() => pulseIconRef.current.startAnimation()}
          accessoryLeft={(props) => (
            <Icon {...props}
              name='people-outline'
              ref={pulseIconRef}
              animation='pulse'
              size="giant"
            />
          )}
        />
        <Button
          style={{ height: '100%',
          paddingHorizontal: 5,
          marginRight: 5 }}
          appearance='ghost'
          status='basic'
          onPress={() => pulseIconRef.current.startAnimation()}
          accessoryLeft={(props) => (
            <Icon {...props}
              name='paper-plane-outline'
              ref={pulseIconRef}
              animation='pulse'
              size="giant"
            />
          )}
        />
      </View>
    );
  }
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={(props) => <Icon {...props} name="calendar-outline"/>} />
    <BottomNavigationTab icon={(props) => <Icon {...props} name="compass-outline"/>} />
    <BottomNavigationTab icon={(props) => <Icon {...props} name="person-outline"/>} />
  </BottomNavigation>
);

const TabNavigator = ({navigation, onLogout}) => (
  <Navigator
    initialRouteName="Comparer"
    tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Découvrir' component={DiscoverScreen} options={ScreenOptions}/>
    <Screen name='Comparer' component={CompareScreen} options={ScreenOptions}/>
    <Screen name='Profil' options={ScreenOptions}>
      {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
    </Screen>
  </Navigator>
);

export default ({onLogout}) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Main' options={{
        headerShown: false,
      }}>
        {(props) => <TabNavigator {...props} onLogout={onLogout} />}
      </Stack.Screen>

      { ProfileNav(Stack.Screen) }
    </Stack.Navigator>
  </NavigationContainer>
);