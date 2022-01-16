import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View,} from "react-native";
import {CheckBox} from "react-native-web";

const styles = StyleSheet.create({
    bg: {
        backgroundColor: "#faebd7",
    },
    header: {
        margin: 25,
        marginTop: 40,
        paddingBottom: 20,
        borderBottomWidth: 4,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    },
    headerText: {
        fontSize: 18,
        margin: 10,
    },
    label: {
        fontSize: 18,
        margin: 10,
        marginLeft: 0,
    },
    body: {
        paddingTop: 10,
        paddingBottom: 50,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        margin: 10,
        padding: 5,
    },
    rowText: {
        marginLeft: 35,
    },
    container: {
        flexDirection: "row",
    },
    alarmActivator: {
        height: 30,
        width: 90,
        margin: 9,
        borderWidth: 1,
        padding: 3,
    },
    checkbox: {
        margin: 15,
    },
});

export default function CountryDetail(props) {
    const [obj, setObject] = useState({loading: false, data: {}, error: false});
    const [details, setDetails] = useState({loading: false, data: {}, error: false,});
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {
        getFollowedCountry()
            .then(() => {
                getData();
                loadDetails();
            });
    }, []);

    const getFollowedCountry = async () => {
        let url = "http://localhost:8080/v1/country/"
            + props.route.params.country;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json())
            .then((data) => {
                if (data) {
                    setSelection(data.follow);
                }
            }).catch((err) => {
                console.log('error: ' + err);
            });
    }

    /**
     * Hollt die Corona-Zahlen für das übergeben Land vom Api
     */
    const getData = async () => {
        setObject({loading: true});
        var url =
            "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" +
            props.route.params.country;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                "x-rapidapi-key": "ea7e89ffcemsh175e1a7bd1a65e7p19b7cdjsn2bda6f624d2d",
            },
        }).catch((err) => setObject({error: err}));
        const data = await response.json();
        setObject({error: data.error, data: data.data});
        console.log(JSON.stringify(obj));
    };

    /**
     * Details (vom Bundesländer und Städte) von Api aufrufen
     */
    const loadDetails = async () => {
        if (props.route.params.country) {
            setDetails({loading: true});
            var url =
                "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" +
                props.route.params.country;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                    "x-rapidapi-key":
                        "ea7e89ffcemsh175e1a7bd1a65e7p19b7cdjsn2bda6f624d2d",
                },
            }).catch((err) => setDetails({error: err}));
            const data = await response.json();
            setDetails({error: data.error, data: data.data});
            console.log("details: " + JSON.stringify(details));
        }
    };

    const followCountry = async (checked) => {
        setSelection(checked);
        let url = "http://localhost:8080/v1/country";
        const country = {
            name: props.route.params.country,
            follow: checked
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(country)
        }).catch((err) => setSelection(false));
        const data = await response.json();
        console.log(JSON.stringify(data));
    }

    /**
     * zeigt Daten vom Bundesländer und Städte falls vorhanden
     * @returns
     */
    function mapDetails() {
        if (details.loading) {
            return <ActivityIndicator size="large"/>;
        } else if (
            !details.loading &&
            details.data &&
            details.data.covid19Stats &&
            details.data.covid19Stats.length <= 0
        ) {
            return <Text style={styles.rowText}>No Details !</Text>;
        }
        if (
            details.data &&
            details.data.covid19Stats &&
            details.data.covid19Stats.length > 0
        ) {
            if (details.data.covid19Stats.length == 1 &&
                details.data.covid19Stats[0].keyId ==
                details.data.covid19Stats[0].country) {
                return;
            }
            console.log(
                "details.data.covid19Stats.length >> " +
                details.data.covid19Stats.length
            );
            return details.data.covid19Stats.map((o) => {
                return (
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Bundesland: {o.province}</Text>
                        {o.city && <Text>Stadt: {o.city}</Text>}
                        <Text style={styles.rowText}>Aktiv: {o.confirmed}</Text>
                        <Text style={styles.rowText}>Tote: {o.deaths}</Text>
                        {o.recovered && <Text>Genesen: {o.recovered}</Text>}
                    </View>
                );
            });
        }
    }

    return (
        <View style={styles.bg}>
            <View style={styles.header}>
                {obj.data && (
                    <>
                        <Text style={styles.headerTitle}>{props.route.params.country}</Text>
                        <View style={styles.container}>
                            {obj.data.recovered && (
                                <Text style={styles.headerText}>
                                    Genesen: {obj.data.recovered}
                                </Text>
                            )}
                            <Text style={styles.headerText}>Tote: {obj.data.deaths}</Text>
                            <Text style={styles.headerText}>Aktiv: {obj.data.confirmed}</Text>
                            <CheckBox
                                value={isSelected}
                                onValueChange={followCountry}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Verfolgen</Text>
                        </View>
                    </>
                )}
            </View>
            <View style={styles.body}>
                <SafeAreaView style={styles.container}>
                    <ScrollView style={styles.scrollView}>
                        {<>{mapDetails()}</>}
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    );
}
