import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { storage } from "../storage/storage";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

type Mahasiswa = {
  id: string;
  nama: string;
  nim: string;
  email: string;
  jurusan: string;
  angkatan: string;
};

export default function HomeScreen({ navigation }: Props) {
  const [dataMahasiswa, setDataMahasiswa] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection("mahasiswa")
      .onSnapshot(querySnapshot => {
        const list: Mahasiswa[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          list.push({
            id: doc.id,
            nama: data.nama || "",
            nim: data.nim || "",
            email: data.email || "",
            jurusan: data.jurusan || "",
            angkatan: data.angkatan || "",
          });
        });
        setDataMahasiswa(list);
        setLoading(false);
      });

    return () => subscriber(); // unsubscribe
  }, []);

  const logout = async () => {
    try {
      await auth().signOut();
      storage.delete("userEmail");
      Alert.alert("Logout berhasil");
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Gagal logout");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Mahasiswa</Text>
      <FlatList
        data={dataMahasiswa}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nama}>{item.nama} ({item.angkatan})</Text>
            <Text style={styles.nim}>NIM: {item.nim}</Text>
            <Text style={styles.email}>Email: {item.email}</Text>
            <Text style={styles.jurusan}>Jurusan: {item.jurusan}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{color:"#fff"}}>Data mahasiswa kosong</Text>}
      />
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#021B39",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#034078",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  nama: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  nim: {
    fontSize: 14,
    color: "#B8C1D1",
  },
  email: {
    fontSize: 14,
    color: "#B8C1D1",
  },
  jurusan: {
    fontSize: 14,
    color: "#B8C1D1",
  },
  btn: {
    backgroundColor: "#04B2D9",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});