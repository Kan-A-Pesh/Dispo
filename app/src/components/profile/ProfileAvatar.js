import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { Image, View } from 'react-native';

export default ({size = 100, url}) => {

	const [loaded, setLoaded] = React.useState(0);

    return (
        <View style={{
            position: "relative",
            height: size,
            width: size,
            alignItems: "center",
            justifyContent: "center"
        }}>
            {
                (loaded==2)
                ?
                <Image
                    style={{
                        position: "absolute",
                        height: size,
                        width: size,
                        borderRadius: 50,
                    }}
                    source={require("../../../assets/gradient.png")}
                />
                :
                <Image
                    style={{
                        position: "absolute",
                        height: size,
                        width: size,
                        borderRadius: 50,
                    }}
                    source={{uri: url}}
                    onLoadStart={() => {setLoaded(0);}}
                    onLoadEnd={() => {setLoaded(1);}}
                    onError={() => {setLoaded(2);}}
                />
            }
            {(loaded==0)?<Spinner/>:<></>}
        </View>
    );
};