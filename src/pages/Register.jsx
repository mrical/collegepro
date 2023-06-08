import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import TextInputSecodary from "../components/TextInputSecodary";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "@firebase/firestore";
import { db } from "../db/firebase-config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const provider = new GoogleAuthProvider();

const validationSchema = yup.object({
  firstName: yup.string().trim().required("Name is required"),
  lastName: yup.string().trim(),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
function Register() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  let navigate = useNavigate();
  const { setAuthentication } = useContext(UserContext);
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }
  }, []);

  const onFormSubmit = async (values, formikHelpers) => {
    const authentication = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(
        authentication,
        values.email,
        values.password
      );
      const docRef = doc(db, "users", res.user.uid);
      await setDoc(docRef, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        createdAt: Timestamp.now(),
      });
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userDetails = {
          userId: docSnap.id,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        };
        setAuthentication(userDetails, res._tokenResponse.refreshToken);
      }
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email Already in Use");
      }
      console.log(error);
    }
  };
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="grid grid-cols-2 gap-4 p-5">
              <Field
                label="First Name"
                name="firstName"
                component={TextInputSecodary}
                containerStyles="col-span-1"
                placeholder="Jane"
                idValue="first-name"
                required
              />
              <Field
                label="Last Name"
                name="lastName"
                component={TextInputSecodary}
                containerStyles="col-span-1"
                placeholder="Doe"
                idValue="last-name"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                component={TextInputSecodary}
                containerStyles="col-span-2"
                idValue="email"
                autoComplete="email"
                placeholder="example@example.com"
                required
              />
              <Field
                label="Password"
                name="password"
                component={TextInputSecodary}
                type="password"
                containerStyles="col-span-2"
                idValue="password"
                placeholder="**********"
                required
              />
              <Field
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                component={TextInputSecodary}
                containerStyles="col-span-2"
                idValue="confirm-password"
                placeholder="**********"
                required
              />

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
