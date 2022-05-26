import { useState } from "react";
import { Box, Button, TextInput } from "@mantine/core";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = () => {
	// State for the search input to empty string
	const [input, setInput] = useState("");

	// navigate function from react-router-dom used to navigate to the search page
	const navigate = useNavigate();

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<TextInput
				value={input}
				onChange={event => setInput(event.currentTarget.value)}
				sx={{ flex: 1 }}
				placeholder="What are you looking for?"
				icon={<FaSearch />}
			/>
			<Button onClick={() => navigate(`/Search/${input}`)}>Find</Button>
		</Box>
	);
};

export default Search;
