import {
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../db/firebase-config";
import { UserContext } from "./UserContext";
export const EnvelopesContext = createContext({
  envelopes: {},
  // setAllEnvelopes: () => {},
});
function EnvelopesProvider({ children }) {
  const [envelopes, setEnvelopes] = useState();
  const { user } = useContext(UserContext);
  useEffect(() => {
    try {
      if (user.userId) {
        const q = query(
          collection(db, "envelopes"),
          where("userId", "==", user.userId)
        );

        onSnapshot(q, async (querySnapshot) => {
          const data = await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              console.log("Doc Data", doc.data());
              const expenses = await Promise.all(
                doc.data().expenses?.map(async (docRef) => {
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                    const data = docSnap.data();
                    console.log(data);
                    return data;
                  }
                })
              );
              const { title, budget, userId } = doc.data();
              return {
                title,
                budget,
                userId,
                envelopeId: doc.id,
                expenses: expenses || [],
              };
            })
          );
          console.log("envelopes", data);
          const newAllEnvelopes = data.reduce(
            (accum, curr) => ({ ...accum, [curr.envelopeId]: curr }),
            {}
          );
          setEnvelopes(newAllEnvelopes);
          // setAllEnvelopes(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  return (
    <EnvelopesContext.Provider value={{ envelopes }}>
      {children}
    </EnvelopesContext.Provider>
  );
}

export default EnvelopesProvider;
