import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableHighlight} from 'react-native';


const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#faebd7',
    }, header: {
        margin: 25,
        marginTop: 40,
        paddingBottom: 20,
        borderBottomWidth: 4,
        marginBottom: 20,
    }, headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    }, headerText: {
        fontSize: 18,
        margin: 10,
    }, body: {
        paddingTop: 10,
        paddingBottom: 50
    }, row: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        margin: 10,
        padding: 5,
        marginLeft: 50,
    }, text: {
        fontSize: 20,
        width: 100
    }
});


export default function Menu({navigation}) {

    /**
     * Mappt items to View
     * @returns
     */
    function mapItems() {
        return <>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => {
                    navigation.navigate('Home')
                }}>
                    <Text style={styles.text}>Home</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => {
                    navigation.navigate('CountryList')
                }}>
                    <Text style={styles.text}>Staaten</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableHighlight onPress={() => {
                    navigation.navigate('Impressum')
                }}>
                    <Text style={styles.text}>Impressum</Text>
                </TouchableHighlight>
            </View>
        </>
    }

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Menu</Text>
            </View>
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {(<>{mapItems()}</>)}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );

}

