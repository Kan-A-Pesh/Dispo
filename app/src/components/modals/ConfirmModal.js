
import React from 'react';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { View } from 'react-native';

export default ({visible, onRestore, onCancel}) => {
    return (
        <Modal
            visible={visible}    
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
                    <Text
                        category="h4"
                        style={{
                            textAlign: 'center',
                            paddingHorizontal: 10,
                            marginVertical: 10
                        }}
                    >
                        Modifications en cours
                    </Text>
          )}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 20,
              marginTop: 5
            }}
          >Des modifications sont en cours et n'ont pas été sauvegardées!</Text>
          <View style={{
              flexDirection: "row",
              justifyContent: "space-evenly"
          }}>
            <Button
                status="primary"
                appearance="outline"
                style={{ width: "40%" }}
                onPress={() => onRestore()}
            >
                Restaurer
            </Button>
            <Button
                status="danger"
                style={{width: "40%"}}
                onPress={() => onCancel()}
            >
                Annuler
            </Button>
          </View>
        </Card>
        </Modal>
    );
};