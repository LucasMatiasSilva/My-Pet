import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { database, firebase } from '../../firebase/config'
import * as animatable from 'react-native-animatable';

export default function NewTime({ navigation }) {
    const [description, setDescription] = useState(null)

    function addtime() {
        if (!description || description.length == 0) {
            Alert.alert(
                'Ops!',
                'Digite seu horário de maneira correta!',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Ok Pressed')
                    }
                ],
                { cancelable: false })

            return;
        }
        database.collection('time').add({
            description: description,
            status: false
        })
        Alert.alert(
            'UHUUUUL!',
            'Seu novo horário foi cadastrado com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => console.log('Ok Pressed')
                }
            ])
        navigation.navigate('TimeList');
    }

    return (
        <View style={styles.container}>
            <animatable.View animation="fadeInUp" style={styles.containerHeader}>
                <Text style={styles.label}>Digite seu Horário!</Text>
                <Text style={styles.subLabel}>Coloque o horário desejado para liberar a ração, ou libere agora! </Text>
            </animatable.View>
            <animatable.View animation="fadeInLeft" style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Exemplo: 21:00 ou 09:00'
                    placeholderTextColor={'#a8a8a8'}
                    onChangeText={setDescription}
                    value={description}
                    maxLength={5}
                />
            </animatable.View>
            <animatable.Image
                animation="flipInX"
                delay={500}
                source={require('../../assets/NewTime.png')}
                style={styles.containerImage}
                resizeMode="contain"
            />
            <TouchableOpacity
                    style={styles.buttonNewTask}
                    onPress={() => {
                        addtime()
                        
                    }}
                >
                    <Text style={styles.textButton}>Salvar</Text>

                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    label: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    subLabel: {
        color: '#f5f5f5',
        marginTop: 4
    },
    input: {
        width: "90%",
        padding: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#9ecb93",
        marginLeft: "auto",
        marginRight: "auto",
        fontSize: 16,
        color: '#fff'
    },
    containerImage: {
        width: '100%',
        marginTop: 60,
        top: 25
    },
    buttonNewTask: {
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: 30,
        left: 20,
        backgroundColor: "#9ecb93",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textButton: {
        color: "#0a0a0a",
        fontSize: 16,
        fontWeight: "bold",
    },
});
