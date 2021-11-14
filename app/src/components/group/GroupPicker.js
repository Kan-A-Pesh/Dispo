import React from 'react';
import { Avatar, Button, Icon, Text } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

module.exports = () => {
    return (
        <>
            <View style={{
                flexDirection: "row"
            }}>
                <Avatar style={styles.avatar} source={require('./../../../assets/avatar.png')}/>
                <Avatar style={styles.avatar} source={require('./../../../assets/avatar.png')}/>
                <Avatar style={styles.avatar} source={require('./../../../assets/avatar.png')}/>
                <Avatar style={styles.avatar} source={require('./../../../assets/avatar.png')}/>
                <Avatar style={styles.avatar} source={require('./../../../assets/avatar.png')}/>
                <Button
                    style={styles.avatar}
                    appearance="filled"
                    accessoryLeft={(props) => (
                        <Icon {...props} 
                            name="plus-circle-outline"
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    )}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    avatar: {
        margin: 4,
        height: 45,
        width: 45,
        padding: 0
    },
  });