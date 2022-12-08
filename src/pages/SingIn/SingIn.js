import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as animatable from 'react-native-animatable'
import { Ionicons } from '@expo/vector-icons';
import { firebase } from '../../firebase/config'

export default function SingIn() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [hidePass, setHidePass] = useState(true);

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            Alert.alert(
                            'Ops',
                            'Usuário Inexistente!, verifique seu Email e Senha e tente novamente',
                            [
                              {text: 'OK', 
                              onPress: () => console.log('Ok Pressed') 
                              }
                            ],
                            { cancelable: false })

                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('TimeList', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    async function forgotPassword(){
        if(email.length == 0){
            Alert.alert(
                'Ops!',
                    'Digite seu email para que possa receber o email e criar uma nova senha',
                    [
                        {text: 'OK', 
                        onPress: () => console.log('Ok Pressed') 
                        }
                    ]
            )
        }
        await firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert(
                    'Crie sua nova senha!',
                            'Verifique seu Email para criar uma nova Senha!',
                            [
                              {text: 'OK', 
                              onPress: () => console.log('Ok Pressed') 
                              }
                            ]
                )
            })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    return (
        <View style={styles.container}>

            <animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}> Bem Vindo(a) </Text>
            </animatable.View>
            <animatable.View animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}>Email</Text>
                <TextInput
                    placeholder="Digite um Email..."
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputArea}>
                    <TextInput
                        placeholder="Sua Senha..."
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                        {hidePass
                            ?
                            <Ionicons name="eye" color="#000" size={25} />
                            :
                            <Ionicons name="eye-off" color="#000" size={25} />
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonReset}
                    onPress={() => forgotPassword()}
                    >
                    <Text style={styles.resetText}>Esqueci minha Senha</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonRegister}
                    onPress={() => navigation.navigate('SingUp')}
                >
                    <Text style={styles.registerText}>Não tem uma conta?, Crie agora!</Text>
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
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 20,
        marginTop: 28
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    inputArea: {
        flexDirection: 'row',
    },
    icon: {
        width: '8%',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    inputPassword: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        width: '92.5%'
    },
    button: {
        backgroundColor: '#59493B',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonReset: {
        marginTop: 14,
        alignSelf: 'center'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    resetText: {
        color: '#262626',
        fontSize: 14.5
    },
    registerText: {
        color: '#323232',
        fontSize: 15
    }
})