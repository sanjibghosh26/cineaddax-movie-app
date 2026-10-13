
import { useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendEmailVerification,
  reload,
} from "firebase/auth";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../Services/firebase";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Save user profile in Firestore
  const saveUserProfile = async (currentUser) => {
    if (!currentUser) return;

    await setDoc(
      doc(db, "users", currentUser.uid),
      {
        uid: currentUser.uid,
        displayName: currentUser.displayName || "",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "",
        emailVerified: currentUser.emailVerified,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        try {
          await saveUserProfile(currentUser);
        } catch (error) {
          console.error("Failed to save user profile:", error);
        }
      }
    });

    return unsubscribe;
  }, []);

  // Email and password signup
  const signup = async (fullName, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (fullName.trim()) {
      await updateProfile(result.user, {
        displayName: fullName.trim(),
      });
    }

    await sendEmailVerification(result.user);
    await saveUserProfile(result.user);
    await signOut(auth);

    return {
      ...result,
      verificationEmailSent: true,
    };
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

  // Email and password login
  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await reload(result.user);

    if (!result.user.emailVerified) {
      await signOut(auth);

      const error = new Error("Please verify your email before logging in.");
      error.code = "auth/email-not-verified";
      throw error;
    }

    await saveUserProfile(result.user);

    return result;
  };

  // Google login
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    await saveUserProfile(result.user);

    return result;
  };

  // Update display name and profile photo
  const updateUserProfile = async (profileData) => {
    if (!auth.currentUser) return;

    await updateProfile(auth.currentUser, profileData);
    await saveUserProfile(auth.currentUser);

    setUser({ ...auth.currentUser });
  };

  // Logout
  const logout = () => signOut(auth);

  const value = {
    user,
    authLoading,
    signup,
    login,
    googleLogin,
    logout,
    saveUserProfile,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
