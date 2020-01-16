import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, Text, TextInput } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
function Main({navigation}){
    const [currentRegion, setCurrentRegion] = useState(null);
    useEffect(() => {
        async function loadPosition(){
            const {granted} = await requestPermissionsAsync();
            if(granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitude, longitude} = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                })
            }
        }
        loadPosition();
    }, []);
    if(!currentRegion){
        return null;
    }
    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: -18.171815, longitude: -47.9627898}}>
                <Image style={styles.avatar} source={{uri: 'https://avatars2.githubusercontent.com/u/23236871?s=460&v=4'}} />
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_user: "gumg90" })
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Gustavo Adolpho</Text>
                        <Text style={styles.devBio}>Isso é um teste de localização</Text>
                        <Text style={styles.devTechs}>Teste, Teste</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex:1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#ffffff'
    },
    callout:{
        width: 260,
        borderRadius: 4,
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16,

    },
    devBio:{
        color: '#666',
        marginTop: 5,
    },
    devTechs:{
        marginTop: 5,
    }
})

export default Main;