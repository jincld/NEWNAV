import { StyleSheet, Text, View, Button, Alert } from "react-native";

const CardUser = ({ user, onDelete, onEdit }) => {
  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Eliminar", onPress: () => onDelete(user.id), style: "destructive" },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{user.nombre}</Text>
      <Text style={styles.cardText}>Edad: {user.edad}</Text>
      <Text style={styles.cardText}>Correo: {user.correo}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Editar" onPress={() => onEdit(user)} color="#5C3D2E" />
        <Button title="Eliminar" onPress={handleDelete} color="#B22222" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default CardUser;
