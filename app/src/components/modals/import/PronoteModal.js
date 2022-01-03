
import { Button, Card, Input, Modal, Select, SelectItem, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { uploadCalendar } from './../../../../api/classes/Calendars';
import Toast from 'react-native-toast-message';

export default ({ visible, onClose }) => {

    const [school, setSchool] = React.useState(0);
    const [pronoteUsername, setPronoteUsername] = React.useState("");
    const [pronotePassword, setPronotePassword] = React.useState("");
    const [message, setMessage] = React.useState("");

    React.useEffect(() => {
        setMessage("");
    }, [school, pronoteUsername, pronotePassword])

    return (
        <Modal
            visible={visible}
            backdropStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onBackdropPress={onClose}
        >
            <Card
                header={(props) => (
                    <View {...props}>
                        <Text category="h5">Importer depuis Pronote</Text>
                    </View>
                )}
                footer={(props) => (
                    <View {...props}>
                        <Button
                            onPress={(event) => {
                                event.persist();
                                const data = {
                                    "action": "pronote",
                                    "schoolid": "0",
                                    "username": pronoteUsername,
                                    "password": pronotePassword
                                }

                                uploadCalendar(data).then(result => {
                                    if (result.status == 500)
                                    {
                                        setMessage("Un erreur inconnue s'est produite, veuillez réessayer plus tard!")
                                    }
                                    else if (result.status == 401)
                                    {
                                        setMessage("Nom d'utilisateur ou mot de passe invalide");
                                    }
                                    else if (result.status == 201)
                                    {
                                        onClose();
                                        Toast.show({
                                            type: 'success',
                                            text1: 'Emploi du temps',
                                            text2: 'En cours d\'envoi ✉',
                                            position: 'bottom'
                                        });
                                    }
                                })
                            }}
                            style={{
                                marginBottom: 10
                            }}
                        >
                            Importer!
                        </Button>
                        <Button
                            appearance="outline"
                            onPress={onClose}
                        >
                            Retour
                        </Button>
                    </View>
                )}
            >
                {/* <Select
                    label="Établissement"
                    selectedIndex={school}
                    onSelect={(school) => {
                        setSchool(school)
                    }}
                >
                    <SelectItem title="Charles Poncet - CLUSES" />
                    <SelectItem title="Ravagax Lycée - QQLQ PART" />
                </Select> */}
                <Input
                    style={{
                        marginVertical: 15
                    }}
                    label="Nom d'utilisateur Pronote"
                    placeholder="Entres ton nom d'utilisateur Pronote"
                    value={pronoteUsername}
                    onChangeText={(value) => setPronoteUsername(value)}
                />
                <Input
                    label="Mot de passe Pronote"
                    placeholder="Entres ton mot de passe"
                    value={pronotePassword}
                    onChangeText={(value) => setPronotePassword(value)}
                />
                {(message)?
                (<Text
                    status="danger"
                    style={{
                        marginTop: 10,
                    }}
                >{message}</Text>):
                    <></>}
            </Card>
        </Modal>
    );
};
