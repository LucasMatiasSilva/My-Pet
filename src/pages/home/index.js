import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Home() {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios')
        setDate(currentDate);

        let tempDate = new Date(currentDate)
        let fTime = 'Hours ' + tempDate.getHours() + ' Minutes: ' + tempDate.getMinutes();
        setText(fTime)

        console.log(fTime)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
        <View style={styles.container}>

            <animatable.View style={styles.hours}>
                <Text style={styles.hoursText}> {text} </Text>
                <TouchableOpacity style={styles.button} onPress={() => showMode('time')}>
                    <Text style={styles.buttonText}> Botão </Text>
                </TouchableOpacity>
                {show && (<DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                />
                )}
            </animatable.View>
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232',
    },
    hours:{
        flex: 2,
    },
    hoursText: {
        color: '#fff'
    }
})