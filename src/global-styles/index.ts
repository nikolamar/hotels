import { Platform, StyleSheet } from "react-native";
import config from "../config";
import * as color from "../shared/color";

const isWeb = Platform.OS === "web";

export const page = StyleSheet.create({
  container: {
    top: isWeb ? config.appBarHeight : undefined,
    bottom: isWeb ? 0 : undefined,
    position: isWeb ? "absolute" : undefined,
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
  },
});

export const auth = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  form: {
    width: "100%",
    maxWidth: 300,
  },
  logo: {
    alignSelf: "center",
    maxWidth: 250,
    height: 250,
    marginVertical: 20,
    backgroundColor: color.primaryColor,
    padding: 75,
    borderRadius: 125,
    overflow: "hidden",
  },
  textInput: {
    width: "100%",
    height: 45,
    paddingHorizontal: 20,
    backgroundColor: color.secondaryColor,
    marginTop: 5,
    borderRadius: 30,
  },
  errorStyle: {
    color: color.secondaryColor3,
    fontWeight: "600",
    fontSize: 14,
    alignSelf: "center",
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: color.primaryColor,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
}) as any;
