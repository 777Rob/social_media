import { Button } from "@mantine/core";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";

export const RichTextEditorTopic = () => {
    const initialValue = "<p>Your initial <b>html value</b> or an empty string to init editor without value</p>";
    const [input, onInputChange] = useState(initialValue);
    const handleReply = () => {
    };

    return (
        <>
            <RichTextEditor
                sx={(theme) => ({
                    marginTop: "30px",
                    minHeight: "200px",
                    backgroundColor: theme.colorScheme === "dark"
                        ? theme.colors.dark[7]
                        : theme.colors.gray[1],
                    border: `1px solid ${theme.colorScheme === "dark"
                        ? theme.colors.dark[4]
                        : theme.colors.gray[4]}`,
                    borderRadius: "10px"
                })}
                value={input}
                onChange={onInputChange} />
            <Button onClick={() => handleReply()}>
                Reply
            </Button>
        </>
    );
};
