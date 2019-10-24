import React, {useState} from 'react';
import {View, Text, AsyncStorage, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native'

import api from '../services/api';

export default function Book({navigation}) {
    
    const[date, setDate] = useState('');

    const id = navigation.getParam('id'); //o id armazenado na variável id é o id do spot que foi clicado no SpotList

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date: date,
        }, {
            headers: {user_id}
        })

        Alert.alert('Solicitação de reserva enviada');

        navigation.navigate('List');
    };

    function handleCancel() {
        navigation.navigate('List');
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Qual data você quer reservar?"
                    placeholderTextColor = "#999"
                    autoCapitalize="words"
                    autoCorrect={false} 
                    value={date}
                    onChangeText={text => setDate(text)}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Solicitar Reserva</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 70,
    },
    
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 15,
        borderRadius: 5,
    },

    button: {
        height: 42,
        width: 353,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    cancelButton: {
        height: 42,
        width: 353,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});