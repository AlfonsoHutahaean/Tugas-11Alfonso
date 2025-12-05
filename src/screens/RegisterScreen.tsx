import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";
import LinearGradient from "react-native-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const register = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      Alert.alert("Akun berhasil dibuat");
      navigation.goBack();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      Alert.alert("Error", message);
    }
  };

  return (
    <LinearGradient
      colors={["#021B39", "#034078"]}
      style={styles.container}
    >
      <Text style={styles.title}>Daftar Akun</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#B8C1D1"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#B8C1D1"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity style={styles.btn} onPress={register}>
        <Text style={styles.btnText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.07)",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    color: "#fff",
  },
  btn: {
    backgroundColor: "#04B2D9",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 14,
    marginTop: 10,
  },
  btnText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    color: "#81D4FA",
    marginTop: 18,
  },
});
