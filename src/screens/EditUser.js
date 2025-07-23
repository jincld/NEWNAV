import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    SafeAreaView,
} from "react-native";

const EditUser = ({ route, navigation }) => {
    const { user } = route.params;

    const [nombre, setNombre] = useState(user.nombre);
    const [edad, setEdad] = useState(String(user.edad));
    const [correo, setCorreo] = useState(user.correo);

    const handleActualizar = async () => {
        if (!nombre || !edad || !correo) {
            Alert.alert("Error", "Por favor completa todos los campos");
            return;
        }

        try {
            const response = await fetch(
                `https://retoolapi.dev/zZhXYF/movil/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre,
                        edad: parseInt(edad),
                        correo,
                    }),
                }
            );

            if (response.ok) {
                Alert.alert("Éxito", "Usuario actualizado correctamente", [
                    {
                        text: "OK",
                        onPress: () => navigation.goBack(),
                    },
                ]);
            } else {
                Alert.alert("Error", "No se pudo actualizar el usuario");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Ocurrió un error al actualizar");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Editar Usuario</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />

            <Button title="Actualizar" onPress={handleActualizar} color="#5C3D2E" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EAD8C0",
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#5C3D2E",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#CCC",
    },
});

export default EditUser;
