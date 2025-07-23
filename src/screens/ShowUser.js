import React, { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";

import CardUser from "../components/CardUser";
import useFetchUser from "../hooks/useFetchUser";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const ShowUser = () => {
  const { usuarios, loading, fetchUsuarios } = useFetchUser();

  const navigation = useNavigation();

  // Eliminar usuario
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Eliminado", "Usuario eliminado correctamente");
        fetchUsuarios();
      } else {
        Alert.alert("Error", "No se pudo eliminar el usuario");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Editar usuario 
  const handleEdit = (user) => {
    navigation.navigate("EditUser", { user });
  };

  useFocusEffect(
    useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Usuarios</Text>
      <Text style={styles.subtitle}>
        Consulta los usuarios registrados desde la API
      </Text>

      {!loading && (
        <Text style={styles.counterText}>
          Total de usuarios: {usuarios.length}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5C3D2E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <CardUser
              user={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8C0",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  listContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C3D2E",
    textAlign: "center",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B2C24",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ShowUser;
