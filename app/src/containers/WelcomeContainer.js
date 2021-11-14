import React from 'react';
import PaperOnboarding, {PaperOnboardingItemType} from "@gorhom/paper-onboarding";
import { Button, Text } from '@ui-kitten/components';
import { View } from 'react-native';

const data = [
    {
      title: 'Dispo!',
      description: 'All hotels and hostels are sorted by hospitality rating',
      backgroundColor: '#698FB8',
      //image: /* IMAGE COMPONENT */,
      //icon: /* ICON COMPONENT */,
      //content: /* CUSTOM COMPONENT */,
    },
    {
      title: 'Banks',
      description: 'We carefully verify all banks before add them into the app',
      backgroundColor: '#6CB2B8',
      //image: /* IMAGE COMPONENT */,
      //icon: /* ICON COMPONENT */,
      //content: /* CUSTOM COMPONENT */,
    },
    {
      title: 'Stores',
      description: 'All local stores are categorized for your convenience',
      backgroundColor: '#9D8FBF',
      //image: /* IMAGE COMPONENT */,
      //icon: /* ICON COMPONENT */,
      content: CloseButton,
      showCloseButton: false,
    },
  ];

const CloseButton = () => {
    return (
        <Button>
            <Text>Text</Text>
        </Button>
    );
}

module.exports = () => {
    return (
        <PaperOnboarding
            data={data}
            closeButtonTextStyle={{opacity:0}}
        />
    );
}