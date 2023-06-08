import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "@firebase/firestore";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { db } from "../db/firebase-config";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import TextInputSecodary from "../components/TextInputSecodary";
import { EnvelopesContext } from "../context/EnvelopesContext";
const createEnvelopValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  budget: yup.number().required("Enter the budget"),
});
function Home() {
  const [envelopesArray, setEnvelopesArray] = useState([]);
  const { user } = useContext(UserContext);
  const { envelopes } = useContext(EnvelopesContext);
  
  useEffect(() => {
    if (envelopes) {
      setEnvelopesArray(Object.values(envelopes));
    }
  }, [envelopes]);
  const navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/login");
    }
  }, []);

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  const deleteEnvelope = async (deleteId) => {
    const docRef = doc(db, "envelopes", deleteId);
    const envelope = await getDoc(docRef);
    try {
      envelope.data().expenses.forEach(async (expense) => {
        await deleteDoc(doc(db, "expenses", expense.id));
      });
    } catch (error) {
      console.log(error);
    }
    await deleteDoc(docRef);
  };
  return (
    <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create an envelop
                        </Dialog.Title>
                        <div className="mt-2">
                          <Formik
                            initialValues={{ title: "", budget: 2000 }}
                            onSubmit={async (val) => {
                              // collection("envelopes")
                              try {
                                const docRef = collection(db, "envelopes");
                                await addDoc(docRef, {
                                  title: val.title,
                                  budget: val.budget,
                                  userId: user.userId,
                                  expenses: [],
                                });
                              } catch (error) {
                                console.log(error);
                              }
                              setOpen(false);
                            }}
                            validationSchema={createEnvelopValidationSchema}
                          >
                            {() => (
                              <Form>
                                <Field
                                  label="Title"
                                  name="title"
                                  type="text"
                                  component={TextInputSecodary}
                                  containerStyles="col-span-2"
                                  idValue="title"
                                  // autoComplete=""
                                  placeholder="eg. Food, Travel, Rent"
                                  required
                                />
                                <Field
                                  label="Budget"
                                  name="budget"
                                  type="number"
                                  component={TextInputSecodary}
                                  containerStyles="col-span-2"
                                  idValue="budget"
                                  // autoComplete=""
                                  // placeholder=""
                                  required
                                />
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  >
                                    Add
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h1 className="font-semibold text-center text-green-500">Envelopes</h1>
        <div className="w-full flex justify-end">
          <button
            className="p-2 bg-blue-500 rounded-md text-white"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
        <div className="py-5 divide-y">
          {envelopesArray?.length > 0 ? (
            envelopesArray.map((envelope) => (
              <div className="w-full py-2">
                <Link
                  className="w-full flex flex-col pb-2"
                  to={`/envelope/${envelope.envelopeId}`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{envelope.title}</span>
                    <span>
                      {" "}
                      <span className="font-semibold">Budget:</span>{" "}
                      {envelope.budget}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-semibold">Expense:</span>{" "}
                    <span
                      className={`font-semibold ${
                        envelope.expenses.length > 0 &&
                        envelope?.expenses?.reduce(
                          (accum, data) => accum + data.amount,
                          0
                        ) > envelope.budget
                          ? "text-red-800"
                          : "text-green-800"
                      }`}
                    >
                      -
                      {envelope.expenses.length > 0 &&
                        envelope?.expenses?.reduce(
                          (accum, data) => accum + data.amount,
                          0
                        )}
                    </span>
                  </div>
                </Link>
                <div className="flex-1 flex justify-between">
                  <button className="bg-green-400 text-white rounded-md px-2 py-1">
                    Edit
                  </button>
                  <button
                    className="bg-red-400 text-white rounded-md px-2 py-1"
                    onClick={() => deleteEnvelope(envelope.envelopeId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Create an envelope</p>
          )}
        </div>
        <div className="text-center">
          <Link to="/analysis">
            <button className="p-2 bg-black rounded-md text-white">
              Analyse
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
