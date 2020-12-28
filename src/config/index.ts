import { Platform } from "react-native";

const host = process.env.EXPO_HOST;
const isWeb = Platform.OS === "web";

const config = {
  appBarHeight: isWeb ? 90 : 65,
  initialNumToRender: 30,
  storageKey: "d7J45RlIvV",
  baseURL: host ? host : "http://localhost:8000",
};

export default config;
