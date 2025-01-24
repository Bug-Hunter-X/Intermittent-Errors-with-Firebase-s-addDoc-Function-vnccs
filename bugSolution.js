const db = getFirestore();

const addDocWithRetry = async (collection, data, retries = 3) => {
  try {
    const docRef = await addDoc(collection(db, collection), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    if (retries > 0) {
      const delay = 2 ** (3 - retries) * 1000; // Exponential backoff
      console.log(`Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return addDocWithRetry(collection, data, retries - 1);
    } else {
      console.error("Error adding document after multiple retries: ", e);
      throw e; // Re-throw the error after exhausting retries
    }
  }
};