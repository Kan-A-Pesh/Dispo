import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import GroupPicker from './../components/group/GroupPicker';

module.exports = () => {
    return (
		<Layout style={{ flex: 1 }}>
            <GroupPicker/>
        </Layout>
    );
};