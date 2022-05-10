import { useMoralis } from "react-moralis";
// TODO Finish this function that loads publicatiosn from Moralis
const loadPublications = async (Moralis, account) => {
  const loading = true;
  const publications = undefined;
  const error = undefined;
  try {
    const Publications = Moralis.Object.extend("Publications");
    const query = new Moralis.Query(Publications);

    const results = await query.find();

    setTweetArr(results);
    console.log(results);

    return { loading, publications, error };
  } catch (error) {
    console.error(error);
    return { loading, publications, error };
  }
};

export default loadPublications;

