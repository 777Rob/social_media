import {Box, Text} from "@mantine/core"
import {useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import { search } from "lens/search/search";
import Post from "components/Feed/PostLens";


const SearchResults = () => {
  const {query} = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await search({
        query: query,
        limit: 20,
        type: "PUBLICATION"
      });
      setResults(response.data.search.items);
      console.log(results)
      console.log(response)
    })();
  }, []);

  return <Box>
    <Text sx={{fontSize: "30px", fontWeight: "bold"}}>Displaying search results for: {query}</Text>

    {results.map((result) => <Post post={result}/>)}
  </Box>
}

export default SearchResults;