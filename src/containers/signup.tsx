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

const SignUp = ({ loading, authCreateAccount }) => (
  <View style={gStyles.auth.container}>
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        first_name: "",
        last_name: "",
        general: ""
      }}
      validationSchema={schemas.signUpSchema}
      onSubmit={(values, formikActions) => {
        authCreateAccount(
          formikActions,
          {
            username: values.username,
            password: values.password,
            confirm_password: values.confirm_password,
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name
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
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={gStyles.auth.textInput}
            placeholder="Confirm Password."
            placeholderTextColor={color.secondaryTextColor}
            secureTextEntry={true}
            value={values.confirm_password}
            onChangeText={handleChange("confirm_password")}
          />
          { touched.confirm_password ? <Text style={gStyles.auth.errorStyle}>{errors.confirm_password}</Text> : null }
          <TextInput
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            style={gStyles.auth.textInput}
            placeholder="Email."
            placeholderTextColor={color.secondaryTextColor}
            value={values.email}
            onChangeText={handleChange("email")}
          />
          { touched.email ? <Text style={gStyles.auth.errorStyle}>{errors.email}</Text> : null }
          <TextInput
            underlineColorAndroid="transparent"
            style={gStyles.auth.textInput}
            placeholder="First Name."
            placeholderTextColor={color.secondaryTextColor}
            value={values.first_name}
            onChangeText={handleChange("first_name")}
          />
          { touched.first_name ? <Text style={gStyles.auth.errorStyle}>{errors.first_name}</Text> : null }
          <TextInput
            underlineColorAndroid="transparent"
            style={gStyles.auth.textInput}
            placeholder="Last Name."
            placeholderTextColor={color.secondaryTextColor}
            value={values.last_name}
            onChangeText={handleChange("last_name")}
          />
          { touched.last_name ? <Text style={gStyles.auth.errorStyle}>{errors.last_name}</Text> : null }
          <View style={{height: 40}}/>
          { touched.general ? <Text style={gStyles.auth.errorStyle}>{errors.general}</Text> : null }
          <TouchableOpacity
            style={gStyles.auth.button}
            onPress={handleSubmit as any}
          >
            {loading ? <ActivityIndicator size="small" color="white" /> : <Text style={gStyles.auth.buttonText}>SIGN UP</Text>}
          </TouchableOpacity>
          <Link to="/signin" style={{flex: 1, alignSelf: "center"}}>
            <Text style={gStyles.auth.link}>Sign In</Text>
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
  { authCreateAccount: actions.authCreateAccount }
)(SignUp);