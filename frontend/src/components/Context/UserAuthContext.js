import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  confirmPasswordReset,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";
const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    const retuid = signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
        return ret1;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return retuid;
  }
  function signUp(email, password) {
    const ret2 = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        let ret1 = userCredential.user.uid;
        return ret1;
      })
      .catch((error) => {
        console.log(error.message);
      });
    return ret2;
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    const ret2 = signInWithPopup(auth, googleAuthProvider)
      .then((userCredential) => {
        // let crede = googleAuthProvider.credentialFormResult(userCredential);
        // console.log("crede");
        // console.log(crede);
        let user = userCredential.user.displayName;
        console.log("user");
        console.log(user);
        let ret1 = userCredential.user.uid;
        let ret5 = userCredential.user.email;
        return [ret1, ret5, user];
      })
      .catch((error) => {
        console.log(error.message);
      });
    return ret2;
  }

  
  function passwordUpdate(email) {
    if(email === user.email)
    {
      return sendPasswordResetEmail(auth, email). then(() =>
      { 
          // signOut(auth);
          Swal.fire({ icon: "success", title: "Email Sent!" });
      }).catch((error)=> {
        const errorCode = error.code;
      const errorMessage = error.message;
      })
    }
    else{
      Swal.fire({ icon: "error", title: "Wrong Email" });
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, passwordUpdate }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
