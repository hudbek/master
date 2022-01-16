import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#faebd7',
    }, body: {
        paddingTop: 10,
        paddingBottom: 50
    }, header: {
        margin: 25,
        marginTop: 40,
        borderBottomWidth: 4,
        marginBottom: 20,
    }, headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }, headerRight: {
        textAlign: 'right',
        flex: 1
    }, container: {
        flexGrow: 1,
        backgroundColor: '#faebd7',
        alignItems: 'center',
        //justifyContent: 'center',
    }, input: {
        backgroundColor: 'white',
        borderColor: `#dcdcdc`,
        borderWidth: 2,
        height: 40
    }, text: {
        fontSize: 16
    }, appText: {
        fontSize: 42,
        fontWeight: "bold"
    }, rowText: {
        padding: 10,
        fontSize: 24,
        color: 'black',
        borderColor: 'black',
        borderWidth: 1,

    }, row: {
        paddingTop: 1,
        borderColor: 'black',
        borderBottomWidth: 6,
        borderLeftWidth: 3,
        margin: 10,
    }, footer: {
        height: 200
    }
});

export default function CountryList({navigation}) {

    const [obj, setObject] = useState({loading: false, data: {}, error: false});
    const [text, onChangeText] = useState("");

    // get data from API
    useEffect(() => {
        getData();
    }, []);

    /**
     * Aufruf die Daten vom Api
     */
    const getData = async () => {
        setObject({loading: true});
        const response = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                    "x-rapidapi-key": "ea7e89ffcemsh175e1a7bd1a65e7p19b7cdjsn2bda6f624d2d"
                }
            }
        ).then((data) => data.json())
            .then((data) => {
                setObject({error: data.error, data: data.data});
            }).catch((err) => {
                console.log('error: ' + err);
                setObject({error: err})
            });
    };

    /**
     * Filtert die Einträge. Mehrfach getauchte Ländern aufgrund Bundesland werden ausgefiltert.
     * Weil die Details des Landes werden in eigene Seite angezeigt.
     * @param {*} countryList
     * @returns
     */
    function filterCountries(countryList) {
        if (countryList && countryList.length > 0) {
            const uniqueCountries = [];
            for (var i = 0; i < countryList.length; i++) {
                var found = false;
                for (var j = 0; j < uniqueCountries.length; j++) {
                    if (countryList[i].country === uniqueCountries[j].country) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    uniqueCountries.push(countryList[i]);
                }
            }
            return uniqueCountries;
        }
    }

    /**
     * Anzahl der angezeigte Länder
     * @param {*} countryList
     * @returns
     */
    function count(countryList) {
        if (countryList) {
            return filterCountries(countryList).length;
        }
    }

    /**
     * Navigiert zu Country Seite zur Anzeige Daten des Landes
     * @param {*} country
     */
    function countryClicked(country) {
        navigation.navigate('Country', {country: country});
    }

    /**
     * Mappt die Länder zu Anzeige-Elemente
     * @param {*} countryList
     * @returns
     */
    function mapCountries(countryList) {
        const uniqueCountries = filterCountries(countryList);
        if (uniqueCountries) {
            return uniqueCountries.map((o) => {
                return <View style={styles.row}>
                    <TouchableHighlight onPress={() => {
                        countryClicked(o.country)
                    }}>
                        <Text style={styles.rowText}>- {o.country}</Text>
                    </TouchableHighlight>
                </View>
            });
        }
    }

    /**
     * Filtert die Einträge nach der Suchtext
     * @param {*} countryList
     * @returns
     */
    function filterCountriesForSearch(countryList) {
        const uniqueCountries = filterCountries(countryList);
        const searchedCountries = [];
        if (uniqueCountries) {
            uniqueCountries.map((o) => {
                if (o.country.toLowerCase().includes(text.toLowerCase())) {
                    searchedCountries.push(o);
                }
            });
        }
        return searchedCountries;
    }


    function formatDate(date) {
        return String(date).substring(0, 10) + ' ' + String(date).substring(11, 19);
    }

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                {obj.data && obj.data.covid19Stats &&
                (<>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.headerText}>Alle Länder({count(obj.data.covid19Stats)})</Text>
                        <TouchableHighlight style={[styles.headerRight]} onPress={() => {
                            navigation.navigate('Menu')
                        }}>
                            <Text style={[styles.headerText, styles.headerRight]}>Menu</Text>
                        </TouchableHighlight>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                    />
                    {obj.data && obj.data.lastChecked && (
                        <Text>Stand der Daten: {formatDate(obj.data.lastChecked)}</Text>)}
                </>)}
            </View>
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        <>{obj.loading && (<ActivityIndicator size="large"/>)}</>
                        <>
                            {obj.data && obj.data.covid19Stats && (!text || text.length <= 0) &&
                            (<>
                                <>{mapCountries(obj.data.covid19Stats)}</>
                            </>)}
                            {obj.data && obj.data.covid19Stats && text.length > 0 &&
                            (<>{mapCountries(filterCountriesForSearch(obj.data.covid19Stats))}</>)}
                        </>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );

}
