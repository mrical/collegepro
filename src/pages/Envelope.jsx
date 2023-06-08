import React, { Fragment, useContext, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EnvelopesContext } from "../context/EnvelopesContext";
import { Dialog, Transition } from "@headlessui/react";
import { Field, Form, Formik } from "formik";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import * as yup from "yup";
import { db } from "../db/firebase-config";
import TextInputSecodary from "../components/TextInputSecodary";
const createExpenseValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  amount: yup.number().required("Enter the amount"),
});
function Envelope() {
  const params = useParams();
  console.log(params);
  const { envelopes } = useContext(EnvelopesContext);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const deleteExpense = (deleteId) => {
    console.log("deleteId", deleteId);
    const docRef = doc(db, "expenses", deleteId);
    updateDoc(doc(db, "envelopes", params.id), {
      expenses: arrayRemove(docRef),
    });
    deleteDoc(docRef);
  };

  // console.log("expenses", envelopes[params.id]?.expenses);
  return (
    <div className="my-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Transition.Root.Root show={open} as={Fragment}>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="w-6 h-6"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create an expense
                        </Dialog.Title>
                        <div className="mt-2">
                          <Formik
                            initialValues={{ title: "", amount: 200 }}
                            onSubmit={async (val) => {
                              console.log("Value", val);
                              try {
                                const collectionRef = collection(
                                  db,
                                  "expenses"
                                );
                                console.log(collectionRef);
                                // const newDocRef = doc(collectionRef);

                                const docData = await addDoc(collectionRef, {
                                  title: val.title,
                                  amount: val.amount,
                                  timestamp: serverTimestamp(),
                                });
                                await updateDoc(docData, { id: docData.id });
                                console.log("docData", docData);
                                updateDoc(doc(db, "envelopes", params.id), {
                                  expenses: arrayUnion(docData),
                                });
                              } catch (error) {
                                console.log(error);
                              }
                              setOpen(false);
                            }}
                            validationSchema={createExpenseValidationSchema}
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
                                  label="Amount"
                                  name="amount"
                                  type="number"
                                  component={TextInputSecodary}
                                  containerStyles="col-span-2"
                                  idValue="amount"
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
      </Transition.Root.Root>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h1 className="font-semibold text-center text-green-500">Expenses</h1>

        <div className="w-full flex justify-between items-center">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
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
        {envelopes && (
          <div className="flex justify-between text-blue-800 text-xl pt-2 font-semibold ">
            {" "}
            <span>{envelopes[params.id]?.title}</span>{" "}
            <span>{envelopes[params.id]?.budget}</span>{" "}
          </div>
        )}
        <div className="py-5 divide-y">
          {envelopes && envelopes[params.id]?.expenses.length > 0 ? (
            envelopes[params.id]?.expenses.map((e) => (
              <div className="flex justify-between py-2">
                <span className="font-semibold">{e.title}</span>
                <span>{e.amount}</span>
                <span
                  className="text-red-500"
                  onClick={() => {
                    deleteExpense(e.id);
                  }}
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </span>
              </div>
            ))
          ) : (
            <p>No expanses</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Envelope;
