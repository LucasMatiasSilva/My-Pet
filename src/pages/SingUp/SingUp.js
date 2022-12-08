import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../../firebase/config';

export default function SingUp() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('');

    const [hidePass, setHidePass] = useState(true);
    const [hidePassRep, setHidePassRep] = useState(true);

    const onRegisterPress = () => {
        if (password !== confirmpassword) {
            Alert.alert(
                'Eitá!',
                'Suas Senhas estão diferentes, verifique e repita sua senha corretamente',
                [
                  {text: 'OK', 
                  onPress: () => console.log('Ok Pressed')
                }
                ],
                { cancelable: false })
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef    
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('SingIn', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
        Alert.alert(
        'Conta Criada!',
        'Parabéns, sua conta foi criada com sucesso!',
        [
          {text: 'OK', 
          onPress: () => console.log('Ok Pressed'), 
          onPress: () => navigation.navigate('SingIn')}
        ],
        { cancelable: false })
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTitleImg}>
                <animatable.Image
                    animation="flipInX"
                    source={require('../../assets/MyPet.png')}
                    style={{ widt: "100% " }}
                    resizeMode="contain" // Dimensione a imagem uniformemente 
                />
            </View>
            <animatable.View animation="fadeInRight" style={styles.containerTitleCad}>
                <Text style={styles.message}> Cadastre-se </Text>
            </animatable.View>
            <animatable.View animation="fadeInLeft" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite um Email..." placeholderTextColor={'#808080'}
                    style={styles.inputEmail}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Crie uma Senha..." placeholderTextColor={'#808080'}
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                        {hidePass
                            ?
                            <Ionicons name="eye" color="#fff" size={25} />
                            :
                            <Ionicons name="eye-off" color="#fff" size={25} />
                        }
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Repita sua Senha</Text>
                <View style={styles.inputArea2}>
                    <TextInput
                        placeholder="Digite novamente a Senha..." placeholderTextColor={'#808080'}
                        style={styles.inputPassword}
                        value={confirmpassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        secureTextEntry={hidePassRep}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePassRep(!hidePassRep)}>
                        {hidePassRep
                            ?
                            <Ionicons name="eye" color="#fff" size={25} />
                            :
                            <Ionicons name="eye-off" color="#fff" size={25} />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonText}>Criar!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonReturn}
                    onPress={() => navigation.navigate('SingIn')}
                >
                    <Text style={styles.returnText}> Voltar </Text>
                </TouchableOpacity>
            </animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232'
    },
    containerTitleImg: {
        flex: 1.4,
        backgroundColor: '#323232',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTitleCad: {
        flex: 0.4,
        alignSelf: 'center'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        flex: 3,
        backgroundColor: '#323232',
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginTop: 28
    },
    inputEmail: {
        borderBottomWidth: 1, // Linha abaixo do placeholder
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: '#fff',
        width: '100%',
        color: '#fff'
    },
    inputPassword: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: '#fff',
        width: '92.5%',
        color: '#fff'
    },
    inputArea: {
        flexDirection: 'row',
    },
    icon: {
        width: '8%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
    },
    inputArea2: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: '#b48c54',
        width: '60%',
        borderRadius: 10,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonReturn: {
        marginTop: 14,
        alignSelf: 'center'
    },
    returnText: {
        color: '#A9A9A9',
        fontSize: 16
    }
})