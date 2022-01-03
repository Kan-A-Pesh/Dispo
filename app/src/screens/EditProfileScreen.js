import React from 'react';
import { Button, Input, Modal, Spinner, Text, Toggle } from '@ui-kitten/components';
import { View } from 'react-native';
import { getUser } from "../../api/classes/Users";
import { getAvatar } from "../../api/classes/Avatars";

import ProfileAvatar from "../components/profile/ProfileAvatar";
import ConfirmModal from "../components/modals/ConfirmModal";
import { ScrollView } from 'react-native-gesture-handler';

const ProfileView = ({ navigation, route }) => {
            
    const [staticStats, setStats] = React.useState(undefined);
    const [displayName, setDisplayName] = React.useState(undefined);
    const [bio, setBio] = React.useState(undefined);
    const [email, setEmail] = React.useState(undefined);
    const [modalVisible, setModalVisible] = React.useState(false);

    if (!staticStats)
    {
        getUser().then(result => {
            let d = result.data.result;

            setDisplayName(d.displayName);
            setBio(d.bio);
            setEmail(d.email);
            setStats(d);
        });
        return <View style={{
            flexGrow: 1,
            borderTopWidth: 1,
            borderTopColor: "#0001",
            justifyContent: "center",
            alignItems: "center",
        }}><Spinner/></View>;
    }

    return (
        <>
        <View style={{
            paddingBottom: 70,
            backgroundColor: "white",
            flexGrow: 1,
            borderTopWidth: 1,
            borderTopColor: "#0001",
        }}>
            <ScrollView>
                <View style={{
                    margin: 10,
                    flexDirection: "row",
                    height: 100, 
                }}>
                    <ProfileAvatar url={getAvatar(staticStats.id)}/>
                    <View style={{
                        flex: 1,
                        height: "100%",
                        justifyContent: "space-evenly"
                    }}>
                        <Button size="small">
                            Modifier la photo de profil
                        </Button>
                        <Button
                            size="small"
                            appearance="outline"
                            status="danger"
                        >
                            Supprimer la photo de profil
                        </Button>
                    </View>
                </View>
                <Input
                    value={staticStats.name}
                    label="Nom d'utilisateur:"
                    placeholder="Tu ne peux pas le changer ..."
                    disabled={true}
                    style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                    }}
                />
                <Input
                    value={displayName}
                    label="Nom:"
                    placeholder="Le nom affiché sur ton profil"
                    onChangeText={(text) => {
                        setDisplayName(text);
                    }}
                    style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                    }}
                />
                <Input
                    value={email}
                    label="Email:"
                    placeholder="L'email de ton compte"
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                    }}
                />
                <Input
                    numberOfLines={3}
                    multiline={true}
                    value={bio}
                    label="Biographie:"
                    placeholder="Quelques mots à propos de vous!"
                    onChangeText={(text) => {
                        setBio(text);
                    }}
                    style={{
                        paddingHorizontal: 30,
                        paddingVertical: 10,
                        maxHeight: 100
                    }}
                />
            </ScrollView>
        </View>
        <View style={{
            position: "absolute",
            bottom:0,
            left: 0,
            width: "100%",
            height: 70,
            backgroundColor: "white",
            justifyContent: "space-evenly",
            alignItems: "center",
            borderTopWidth: 1,
            borderTopColor: "#0001",
            flexDirection: "row",
        }}>
            <Button status="primary" style={{
                width: "40%"
            }}>
                Confirmer
            </Button>
            <Button status="danger" appearance="outline" style={{width: "40%"}} onPress={() => {
                if (staticStats.bio != bio || staticStats.displayName != displayName || staticStats.email != email) {
                    setModalVisible(true);
                }
                else
                    navigation.goBack();
            }}>
                Annuler
            </Button>
        </View>
        <ConfirmModal
            visible={modalVisible}
            onCancel={() => {
                navigation.goBack();
            }}
            onRestore={() => {
                setModalVisible(false);
            }}
        />
        </>
    );
}

export default (Screen) => (
    <Screen name='EditProfile' options={{
        title: "Modifier le profil",
        headerShadowVisible: false,
        headerLeft: () => <></>,
    }}>
    {(props) => <ProfileView {...props} />}
    </Screen>
);