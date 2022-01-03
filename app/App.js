import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Card, Icon, IconRegistry, Modal, Text } from '@ui-kitten/components';
import { LogBox, View } from 'react-native';
import WelcomeContainer from './src/containers/WelcomeContainer';
import ConnectionContainer from './src/containers/ConnectionContainer';
import MainContainer from './src/containers/MainContainer';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { saveCookie, getCookie, clearCookie } from './api/Cookies';
import { deleteSession, checkSession } from './api/classes/Sessions';

LogBox.ignoreLogs(["Remote debugger", "new NativeEventEmitter"]);

const AppView = () => {

  const [authToken, setAuthToken] = React.useState(null);

  const saveAuthToken = (value) => {setAuthToken(value);}

  const checkStatus = ((closeModal) => checkSession().then((result) => {
    getCookie("authToken", "empty").then((value) => {
      if (result.status == 401)
      {
        if (authToken != "empty")
        {
          saveCookie("authToken", "empty").then(() => {
            setAuthToken((closeModal)?"empty":"N/A");
          });
        }
      }
      else if (result.status != 204)
      {
        saveCookie("authToken", "N/A");
        saveAuthToken("N/A");
      }
    })
  }));

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      checkStatus(false);
    }, 15000);

    return () =>
    {
      clearInterval(intervalId)
    };
  }, [authToken]);

  // <WelcomeContainer />

  let result = <></>;
  if (authToken === null) {
    result = <></>;
  
    getCookie("authToken", "empty").then((value) => {
      setAuthToken(value);
    })
  }
  else if (authToken == "N/A")
  {
    result = <View style={{ flex: 1 }}>
      <Modal
        visible={true}
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}
      >
        <Card
          disabled={true}
          header={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon    
                style={{
                  height: 50,
                  width: 50,
                  margin: 10,
                  marginBottom: 5
                }}
                fill='red'
                name='alert-circle-outline'
              />
              <Text
                category="h4"
                style={{
                  textAlign: 'center',
                  paddingHorizontal: 10,
                  marginBottom: 10
                }}
              >Problème de connexion :/</Text>
            </View>
          )}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 20,
              marginTop: 5

            }}
          >Veuillez réessayer de nous connecter, si le problème persiste, contactez nous!</Text>
          <Button onPress={() => checkStatus(true)}>
            Actualiser
          </Button>
        </Card>
      </Modal>
    </View>;
  }
  else if (authToken == "empty") {
    result = <ConnectionContainer
      onLogin={(newAuthToken) => {
          saveCookie("authToken", newAuthToken);
          setAuthToken(newAuthToken);
        }
      }
      />;
  }
  else
  {
    result = <MainContainer onLogout={() => {
      deleteSession().then(() => {
        clearCookie("authToken").then(() => {
          setAuthToken("empty");
        })
      });
    }}/>;
  }
  
  return result;
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
