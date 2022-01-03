
import React from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { createSession } from '../../../api/classes/Sessions';

export default ({onLogin}) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
  
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );

    React.useEffect(() => {
        setMessage("");
    }, [username, password]);

    let errorText = <></>;
    if (message)
    {
        errorText = <Text status="danger" style={{
            position: "absolute",
            bottom: 10
        }}>{message}</Text>;
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF"
        }}>
            <Input
                value={username}
                label="Nom d'utilisateur"
                placeholder="Entres ton nom d'utilisateur"
                onChangeText={newUsername => setUsername(newUsername)}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                }}
            />
            <Input
                value={password}
                label='Mot de passe:'
                placeholder="Entres ton mot de passe secret"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={newPassword => setPassword(newPassword)}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                }}
            />
            {errorText}
            <Button
                onPress={() => {
                    setPassword("");

                    if (!message && username && password) {
                        createSession(username, password).then((result) => {
                            if (result.status === 401) {
                                setMessage("Identifiants incorrects");
                            }
                            if (result.status === 500) {
                                setMessage("Une erreur inconnue s'est produite");
                            }
                            if (result.status === 201) {
                                onLogin(result.data.authToken);
                            }
                        })
                    }
                }}
                style={{
                    marginTop: 20,
                    paddingHorizontal: 30,
                    marginBottom: 50,
                }}
                disabled={(!message && username && password)?false:true}
            >
                Se Connecter
            </Button>
        </View>
    );
};