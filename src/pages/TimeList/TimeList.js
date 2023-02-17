import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as animatable from 'react-native-animatable';
import { database } from '../../firebase/config';
import { Ionicons } from '@expo/vector-icons';


export default function TimeList({ navigation }) {
    const [time, setTime] = useState([])

    function deleteTime(id) {
        database
            .collection('time')
            .doc(id)
            .delete();

        Alert.alert(
            'Excluído!',
            'Seu horário foi excluido com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('Ok Pressed')
                }
            ])
    }

    useEffect(() => {
        database
            .collection('time')
            .onSnapshot((response) => {
                const list = []
                response.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id })
                });
                setTime(list)
            })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <animatable.Image
                    animation="flipInY"
                    source={require('../../assets/TimeList.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </View>
            <animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Adicione, Visualize e Exclua seus Horários</Text>
            </animatable.View>
            <animatable.View style={styles.hours} animation="pulse" delay={100}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={time}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.time}>
                                <TouchableOpacity
                                    style={styles.deleteTime}
                                    onPress={() => {
                                        deleteTime(item.id)
                                    }}
                                >
                                    <Ionicons
                                        name='trash-bin-outline'
                                        size={30}
                                        color='#fff'
                                    >
                                    </Ionicons>

                                </TouchableOpacity>
                                <Text
                                    style={styles.descriptionTime}
                                >
                                    Definido para: {item.description}
                                </Text>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />
                <TouchableOpacity
                    style={styles.buttonNewTime}
                    onPress={() => navigation.navigate('NewTime')}
                >
                    <Text style={styles.iconButton}> + </Text>
                </TouchableOpacity>

            </animatable.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232',
    },
    containerLogo: {
        top: 10,
        flex: 0.6,
        backgroundColor: '#323232',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    message: {
        margin: 12,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    time: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    deleteTime: {
        justifyContent: "center",
        paddingLeft: 15,
    },
    descriptionTime: {
        width: "75%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "#323232",
        fontSize: 16,
    },
    hours: {
        flex: 1
    },
    buttonNewTime: {
        position: 'absolute',
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        left: 20,
        backgroundColor: "#a47444",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        fontSize: 30,
        color: '#fff'
    },
    hoursText: {
        color: '#fff',
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 16
    }
})