import { Button } from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

const ReplyForm = () => {
	const initialValue = "<p>Write your reply</p>";
	const [input, onInputChange] = useState(initialValue);
	const handleReply = () => {};

	return (
		<>
			<RichTextEditor
				sx={theme => ({
					marginTop: "30px",
					minHeight: "200px",
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[7]
							: theme.colors.gray[1],
					border: `1px solid ${
						theme.colorScheme === "dark"
							? theme.colors.dark[4]
							: theme.colors.gray[4]
					}`,
					borderRadius: "10px",
				})}
				value={input}
				onChange={onInputChange}
			/>
			<Button onClick={() => handleReply()}>Reply</Button>
		</>
	);
};

export default ReplyForm;
