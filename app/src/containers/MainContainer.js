import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Text, Button } from '@ui-kitten/components';
import CompareScreen from './../screens/CompareScreen';
import DiscoverScreen from './../screens/DiscoverScreen';
import ProfileScreen from './../screens/ProfileScreen';
import { View } from 'react-native';

const { Navigator, Screen } = createBottomTabNavigator();

const ScreenOptions = {
  headerStyle: {
    backgroundColor: '#FFFFFF33',
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

const TabNavigator = () => (
  <Navigator
    initialRouteName="Comparer"
    tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Découvrir' component={DiscoverScreen} options={ScreenOptions}/>
    <Screen name='Comparer' component={CompareScreen} options={ScreenOptions}/>
    <Screen name='Profil' component={ProfileScreen} options={ScreenOptions}/>
  </Navigator>
);

module.exports = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);