const { MMKV } = require('react-native-mmkv');

export const storage = new MMKV();

// Simpan value
export const setItem = (key: string, value: string) => {
  storage.set(key, value);
};

// Ambil value
export const getItem = (key: string) => {
  return storage.getString(key);
};

// Hapus value
export const removeItem = (key: string) => {
  storage.delete(key);
};
