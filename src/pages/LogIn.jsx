import { doc, getDoc } from "@firebase/firestore";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import TextInputSecodary from "../components/TextInputSecodary";
import { UserContext } from "../context/UserContext";
import { db } from "../db/firebase-config";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});
function LogIn() {
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }
  }, []);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const { data: userInfo } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      console.log(userInfo.email);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const { setAuthentication } = useContext(UserContext);
  async function onFormSubmit(values, formikHelpers) {
    const authentication = getAuth();
    try {
      console.log("Mrical", values);
      const res = await signInWithEmailAndPassword(
        authentication,
        values.email,
        values.password
      );
      const docRef = doc(db, "users", res.user.uid);
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
        console.log("Mrical", userDetails);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        toast.error("Please check the Password");
      }
      if (error.code === "auth/user-not-found") {
        toast.error("Please check the Email");
      }
    }
  }
  function onSuccess(res) {
    console.log(res);
  }
  function onFailure(res) {
    console.log(res);
  }
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <Formik
          initialValues={initialValues}
          onSubmit={onFormSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="space-y-6">
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
                type="password"
                component={TextInputSecodary}
                containerStyles="col-span-2"
                idValue="password"
                placeholder="**********"
                required
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-2">
          <div className="font-bold">Or</div>
          <button className="mx-auto" onClick={() => googleLogin()}>
            {" "}
            <img
              src="/btn_google_signin_dark_normal_web.png"
              alt="signin with google"
            />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
