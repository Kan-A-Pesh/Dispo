import React from 'react';
import { Avatar, Button, Icon, Modal, Spinner, Text, Tooltip } from '@ui-kitten/components';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import ProfileAvatar from '../profile/ProfileAvatar';
import { getAvatar } from '../../../api/classes/Avatars';

export default ({onGroupChange, initialGroup}) => {

    const [ttVisible, setTtVisible] = React.useState(false);

    let profilesViews = [];

    for (const profile of initialGroup) {
        profilesViews.push(
            <TouchableOpacity
                style={styles.avatarContainer}
                key={"prop.group.element."+profile}
                onPress={() => {
                    let index = initialGroup.indexOf(profile);
                    if (index > -1) {
                        initialGroup.splice(index, 1);
                    }
                    onGroupChange(initialGroup);
                }}    
            >
                <ProfileAvatar size={60} url={getAvatar(profile)} />
            </TouchableOpacity>
        );
    }

    return (
        <>
            <ScrollView
                horizontal={true}
                style={{
                    flexDirection: "row",
                    flexGrow: 0,
                    padding: 7
                }}
            >
                {profilesViews}
                <Tooltip
                    anchor={() => (<Button
                        style={styles.avatarButton}
                        appearance="outline"
                        status="basic"
                        accessoryLeft={(props) => (
                            <Icon {...props} 
                                name="plus"
                            />
                        )}
                        onPress={() => {
                            setTtVisible(true);
                        }}
                    />)}
                    visible={ttVisible}
                    placement={"right end"}
                    style={{
                        top: 20,
                        paddingHorizontal: 10
                    }}
                    onBackdropPress={() => setTtVisible(false)}
                >
                    Appuyez sur + pour ajouter{"\n"}et touchez un avatar pour le supprimer
                </Tooltip>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        height: 60,
        width: 60,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarButton: {
        height: 60,
        width: 60,
        margin: 4,
        padding: 0,
        borderRadius: 30
    }
  });