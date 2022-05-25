import { useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (<Box sx={{ display: "flex", alignItems: "center" }}>
    <TextInput value={input} onChange={(event) => setInput(event.currentTarget.value)} sx={{ flex: 1 }}
               placeholder="What are you looking for?" icon={<FaSearch />} />
    <Button onClick={() => navigate(`/Search/${input}`)}>
      Find
    </Button>
  </Box>);
};

export default SearchInput;