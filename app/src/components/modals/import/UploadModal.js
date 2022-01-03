import { Modal, Text } from "@ui-kitten/components";
import React from "react";

export default ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            backdropStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
            onBackdropPress={onClose}
        >
            <Text>Hello world!</Text>
        </Modal>
    );
};
