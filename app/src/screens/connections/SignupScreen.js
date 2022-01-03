
import React from 'react';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { TouchableWithoutFeedback, View } from 'react-native';
import { createUser } from '../../../api/classes/Users';

export default ({ onLogin }) => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repassword, setRepassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    React.useEffect(() => {
        if (username && !username.match(/^[a-z0-9_]+$/)) { setMessage("Le nom d'utilisateur ne peut que contenir des lettres minuscules et des tirets du bas."); }

        else if (password)
        {
            if (password.length < 8)        { setMessage("Le mot de passe doit contenir au moins 8 caractères."); }
            else if (!password.match(/\d/g))     { setMessage("Le mot de passe doit contenir au moins un nombre."); }
            else if (!password.match(/[a-z]/g))  { setMessage("Le mot de passe doit contenir au moins une lettre minuscule."); }
            else if (!password.match(/[A-Z]/g))  { setMessage("Le mot de passe doit contenir au moins une lettre majuscule."); }
            else if (!password.match(/[_+-.!@#$%^&*();/|<>"']/g)) { setMessage("Le mot de passe doit contenir au moins un caractère spécial."); }
            else if (password != repassword) { setMessage("Les mots de passe de correspondent pas"); }
            else { setMessage(""); }
        }
        else { setMessage(""); }
    }, [username, password, repassword]);

    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
  
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );

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
                placeholder="Crée ton mot de passe"
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={newPassword => setPassword(newPassword)}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                }}
            />
            <Input
                value={repassword}
                label='Confirmation:'
                placeholder="Confirme ton mot de passe"
                secureTextEntry={true}
                onChangeText={newRepassword => setRepassword(newRepassword)}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                }}
            />
            <Button
                onPress={() => {
                    setPassword("");
                    setRepassword("");

                    if (!message && username && password) {
                        createUser(username, password).then((result) => {
                            if (result.status === 500) {
                                setMessage("Ce nom d'utilisateur existe déja")
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
                    marginBottom: 50
                }}
                disabled={(!message && username && password)?false:true}
            >
                Créer un compte
            </Button>
            {errorText}
        </View>
    );
};