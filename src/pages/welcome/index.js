import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    TouchableOpacity /* Botão */
} from 'react-native';
import * as animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Welcome(){
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            
            <View style={styles.containerLogo}>
                <animatable.Image
                animation="flipInY"
                source={require('../../assets/MyPetLogo.png')} /* Onde está localizada a imagem */
                style={{ width: '100%' }}
                resizeMode="contain"
                />
            </View>
            <animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.title}> Seu Bichinho merece o melhor! </Text>
                <Text style={styles.text}>Faça Login para continuar</Text>

                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('SingIn')} // Quando clicar, func anônima, chamar tela SingIn
                >
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 2,
        backgroundColor:'#323232'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#323232',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        alignSelf: 'center'
    },
    text:{
        color: '#8C756C',
        alignSelf: 'center'
    },
    button: {
        position: 'absolute',
        backgroundColor: '#59493B',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center' 
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }
})