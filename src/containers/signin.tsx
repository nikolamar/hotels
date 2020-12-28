import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from 'react-redux';
import { Link } from "../router";
import { Formik } from "formik";
import { FontAwesome5 } from "@expo/vector-icons";
import * as color from '../shared/color';
import * as actions from '../actions';
import * as schemas from "../yup-schemas";
import * as gStyles from "../global-styles";

const SignIn = ({ loading, authAuthenticateAccount }) => (
  <View style={gStyles.auth.container}>
    <Formik
      initialValues={{ username: "", password: "", general: "" }}
      validationSchema={schemas.signInSchema}
      onSubmit={(values, formikActions) => {
        authAuthenticateAccount(
          formikActions,
          {
            username: values.username,
            password: values.password
          });
      }}
    >
      {({ values, handleChange, handleSubmit, touched, errors }) => (
        <View style={gStyles.auth.form}>
          <FontAwesome5
            name="hotel"
            size={90}
            color="white"
            style={gStyles.auth.logo}
          />
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            focusable
            style={gStyles.auth.textInput}
            placeholder="Username."
            placeholderTextColor={color.secondaryTextColor}
            value={values.username}
            onChangeText={handleChange("username")}
          />
          { touched.username ? <Text style={gStyles.auth.errorStyle}>{errors.username}</Text> : null }
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={gStyles.auth.textInput}
            placeholder="Password."
            placeholderTextColor={color.secondaryTextColor}
            secureTextEntry={true}
            value={values.password}
            onChangeText={handleChange("password")}
          />
          { touched.password ? <Text style={gStyles.auth.errorStyle}>{errors.password}</Text> : null }
          <View style={{height: 40}}/>
          { touched.general ? <Text style={gStyles.auth.errorStyle}>{errors.general}</Text> : null }
          <TouchableOpacity style={gStyles.auth.button} onPress={handleSubmit as any}>
            {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={gStyles.auth.buttonText}>LOGIN</Text>}
          </TouchableOpacity>
          <Link to="/signup" style={{flex: 1, alignSelf: "center"}}>
            <Text style={gStyles.auth.link}>Sign Up</Text>
          </Link>
        </View>
      )}
    </Formik>
  </View>
);

const mapStateToProps = state => ({
  loading: state.loading.loadingAuth,
});

export default connect(
  mapStateToProps,
  { authAuthenticateAccount: actions.authAuthenticateAccount }
)(SignIn);