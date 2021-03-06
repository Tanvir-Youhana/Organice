import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { useUserAuth } from "../Context/UserAuthContext";
// import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import Navbar from "../NavbarPage/Navbar";

function SignUp() {
  const { user } = useUserAuth();
  const paperStyle = {
    padding: 20,
    height: "65vh",
    width: 280,
    margin: "100px auto",
  };
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };

  const [error, setError] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { signUp } = useUserAuth();
  const newUser = auth.currentUser;

  let history = useHistory();
  // new sign up method:
  const register = async (e) => {
    e.preventDefault();
    setError("");

    
    try {
      const useruiid = await signUp(registerEmail, registerPassword);
      var data = {
        firstName: registerFirstName,
        lastName: registerLastName,
      };
      await setDoc(doc(db, "user", useruiid), data);
      history.push("/home");
    } catch (error) {
      // setError(err.message);
      switch (error.code) {
        case "auth/email-already-in-use":
          // console.log(error.message);
          return Swal.fire({ icon: "error", title: "Email already exists" });
        case "auth/invalid-email":
          return Swal.fire({ icon: "error", title: "Invalid email" });
        case "auth/weak-password":
          return Swal.fire({
            icon: "error",
            title: "Password should be at least 6 characters",
          });
        default:
          return Swal.fire({ icon: "error", title: "Something went wrong" });
      }
    }
  };

  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );
  //     Swal.fire({ icon: "success", title: "Registration Successful" });
  //   } catch (error) {
  //     console.log(error.code);
  //     switch (error.code) {
  //       case "auth/email-already-in-use":
  //         console.log(error.message);
  //         return Swal.fire({ icon: "error", title: "Email already exists" });
  //       case "auth/invalid-email":
  //         return Swal.fire({ icon: "error", title: "Invalid email" });
  //       case "auth/weak-password":
  //         return Swal.fire({
  //           icon: "error",
  //           title: "Password should be at least 6 characters",
  //         });

  //       default:
  //         return Swal.fire({ icon: "error", title: "Something went wrong" });
  //     }
  //   }
  // };

  return (
    <div>
      
      <Navbar />
      <Grid className="login__container">
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>{/* <LockOutlinedIcon /> */}</Avatar>
            <h2>Create an Account </h2>
          </Grid>
          <TextField
            label="First Name"
            placeholder="Enter first name..."
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setRegisterFirstName(event.target.value);
            }}
          />
          <TextField
            label="Last Name"
            placeholder="Enter last name..."
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setRegisterLastName(event.target.value);
            }}
          />
          <TextField
            label="Email"
            placeholder="Enter email..."
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <TextField
            label="Password"
            placeholder="Enter password..."
            type="password"
            fullWidth
            required
            style={stylField}
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <Button
            type="submit"
            color="success"
            variant="contained"
            halfWidth
            style={stylButn}
            onClick={register}
          >
            Sign Up
          </Button>
          <Typography>
            {" "}
            Already have an account?
            <Link href="./login" underline="hover">
              {"Sign In"}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}

export default SignUp;
