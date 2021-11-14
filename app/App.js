import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { LogBox } from 'react-native';
import WelcomeContainer from './src/containers/WelcomeContainer';
import WelcomeContainer from './src/containers/ConnectionContainer';
import MainContainer from './src/containers/MainContainer';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

LogBox.ignoreLogs(["Remote debugger", "new NativeEventEmitter"]);

const loadWelcomePage = false;

const loadConnectionPage = true;

const AppView = () => {
  if (loadWelcomePage) {
    return (
      <WelcomeContainer />
    );
  }

  if (loadConnectionPage) {
    return (
      <ConnectionContainer />
    );
  }
  
  return (
    <MainContainer />
  );
}

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppView/>
      </ApplicationProvider>
    </>
  );
}
