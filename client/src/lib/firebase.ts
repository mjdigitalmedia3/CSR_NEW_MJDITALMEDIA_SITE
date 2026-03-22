import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

export async function createJunkCollection() {
  const junkData = [
    {
      name: "Test Item 1",
      description: "This is a test document for the junk collection",
      value: 42,
      isActive: true,
      tags: ["test", "junk", "sample"],
      metadata: {
        createdBy: "admin",
        version: "1.0"
      },
      createdAt: Timestamp.now()
    },
    {
      name: "Test Item 2",
      description: "Another test document",
      value: 100,
      isActive: false,
      tags: ["test", "archive"],
      metadata: {
        createdBy: "system",
        version: "1.0"
      },
      createdAt: Timestamp.now()
    },
    {
      name: "Test Item 3",
      description: "Third test document with different data",
      value: 999,
      isActive: true,
      tags: ["junk", "important"],
      metadata: {
        createdBy: "admin",
        version: "2.0"
      },
      createdAt: Timestamp.now()
    }
  ];

  const junkCollection = collection(db, "junk");
  const results = [];

  for (const data of junkData) {
    const docRef = await addDoc(junkCollection, data);
    results.push({ id: docRef.id, ...data });
  }

  console.log(`Created ${results.length} documents in the junk collection`);
  return results;
}

export default app;
