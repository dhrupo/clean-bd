import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useLocation, Link } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { UserContext } from '../../App';
import "./Login.css";

const Login = () => {

  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: ""
  });

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [user, setUser] = useContext(UserContext);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
      sessionStorage.setItem('token', idToken);
    }).catch(function (error) {

    });
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    if (email && password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const newLoggedInUser = { ...data };
          newLoggedInUser.error = "";
          newLoggedInUser.isSignedIn = true;
          setLoggedInUser(newLoggedInUser);
          setUser(newLoggedInUser);
          history.replace(from);
          setUserToken();
        })
        .catch((error) => {
          var errorMessage = error.message;
          const newLoggedInUser = { ...loggedInUser };
          newLoggedInUser.error = errorMessage;
          newLoggedInUser.isSignedIn = false;
          setLoggedInUser(newLoggedInUser);
        });
    }
  }

  const handleGoogleSignIn = () => {
    var googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newLoggedInUser = { ...result.user };
        newLoggedInUser.error = "";
        newLoggedInUser.isSignedIn = true;
        setLoggedInUser(newLoggedInUser);
        setUser(newLoggedInUser);
        history.replace(from);
        setUserToken();
      }).catch((error) => {
        var errorMessage = error.message;
        const newLoggedInUser = { ...loggedInUser };
        newLoggedInUser.error = errorMessage;
        newLoggedInUser.isSignedIn = false;
        setLoggedInUser(newLoggedInUser);
      });
  }

  return (
    <div className="container form-login">
      <h4>Login</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" className="form-control mb-2" name="email" placeholder="Enter Email" {...register("email")} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" {...register("password")} />
        <button className="btn btn-first-color" type="submit">Log in</button>
      </form>

      <p className="text-center mt-2">Don't have an account? <Link to="/registration">Create an account</Link></p>
      <hr className="hr" />

      <div>
        <button className="btn btn-outline-primary mb-2" onClick={handleGoogleSignIn}>Continue with Google</button>
      </div>

    </div>
  );
};

export default Login;