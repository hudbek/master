import React, { useState, useEffect, Component } from 'react';
import { BackHandler, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
    }, text:{
        fontSize: 20
    }
});

export default function Impressum() {

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Impressum</Text>
            </View>
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                    <Text style={styles.text}>  Dieser App wurde im Rahmen eines Modul in Bachelorstudiums implementiert.
                    {'\n'}  Fachhochschule: Hochschule Ruhrwest
                    {'\n'}  Programmierer: Ulugbek Hudaybergenov und Christian Richter
                    {'\n'}  Adresse: Lützowstraße 5, 46236 Bottrop

                        </Text>    
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );

}

