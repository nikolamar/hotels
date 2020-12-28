import React from "react";
import { connect } from 'react-redux';
import { Redirect, Route } from "../router";

const PrivateRoute = ({ authState, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authState ? <Component {...props} /> : <Redirect to='/signin' />
    }
  />
);

const mapStateToProps = state => ({
  authState: state.auth.state,
});

export default connect(mapStateToProps)(PrivateRoute);