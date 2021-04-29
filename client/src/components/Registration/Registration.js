import React, { useContext, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import "./Registration.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const Registration = () => {
  const [regUser, setRegUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: '',
    suceess: false
  });

  const [loggedInUser, setLoggedInUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
    isSignedIn: false,
    error: ""
  });

  const [user, setUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const { register, errors, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    if (email && password) {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // var user = userCredential.user;
          const newRegUser = { ...regUser };
          newRegUser.error = "";
          newRegUser.suceess = true;
          setRegUser(newRegUser);
          if (newRegUser.suceess) {
            alert("you have successfully registered");
          }
        })
        .catch((error) => {
          var errorMessage = error.message;
          const newRegUser = { ...regUser };
          newRegUser.error = errorMessage;
          newRegUser.suceess = false;
          setRegUser(newRegUser);
          if (!newRegUser.suceess) {
            alert(newRegUser.error);
          }
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
      }).catch((error) => {
        var errorMessage = error.message;
        const newLoggedInUser = { ...loggedInUser };
        newLoggedInUser.error = errorMessage;
        newLoggedInUser.isSignedIn = false;
        setLoggedInUser(newLoggedInUser);
      });
  }

  return (
    <div className="container form-register">
      <h4>Create an account</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" className="form-control mb-2" name="email" placeholder="Enter Email" {...register("email")} />
        <input className="form-control mb-2" name="password" type="password" placeholder="Password" {...register("password")} />
        <button className="btn btn-first-color" type="submit">Create an Account</button>
      </form>
      <p className="text-center mt-2">Already have an account? <Link to="/login">Login</Link></p>
      <hr className="hr" />
      <div>
        <button className="btn btn-outline-primary mb-2" onClick={handleGoogleSignIn}>Continue with Google</button>
      </div>
    </div>
  );
};

export default Registration;