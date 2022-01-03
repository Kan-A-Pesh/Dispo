import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem('@'+key, value);
      return true;
    } catch (e) {
        console.log("Error while trying to save cookie: " + e);
    }
}

const getCookie = async (key, defaultValue = undefined) => {
    try {
      const value = await AsyncStorage.getItem('@'+key);
      if(value !== null) {
        return value;
      }
      return defaultValue;
    } catch(e) {
        console.log("Error while trying to get cookie: " + e);
    }
}

const clearCookie = async (key) => {
  try {
    await AsyncStorage.removeItem('@'+key);
    return true;
  } catch (e) {
    console.log("Error while trying to clear cookie: " + e);
  }
}

export { saveCookie, getCookie, clearCookie };