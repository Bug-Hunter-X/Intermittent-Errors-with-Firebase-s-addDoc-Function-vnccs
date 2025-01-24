const db = getFirestore();

const addDoc = async(collection, data) => {
  try {
    const docRef = await addDoc(collection(db, collection), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};