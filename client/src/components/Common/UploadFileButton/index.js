import {
	Modal,
	Button,
	Group,
	Text,
	useMantineTheme,
	MantineTheme,
} from "@mantine/core";
import { Upload, Photo, X, Icon as TablerIcon } from "tabler-icons-react";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useMoralis } from "react-moralis";

const getIconColor = (status, theme) => {
	return status.accepted
		? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
		: status.rejected
		? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
		: theme.colorScheme === "dark"
		? theme.colors.dark[0]
		: theme.colors.gray[7];
};

const ImageUploadIcon = ({ status, ...props }) => {
	if (status.accepted) {
		return <Upload {...props} />;
	}

	if (status.rejected) {
		return <X {...props} />;
	}

	return <Photo {...props} />;
};

const dropzoneChildren = (status, theme) => (
	<Group
		position="center"
		spacing="xl"
		style={{ minHeight: 220, pointerEvents: "none" }}
	>
		<ImageUploadIcon
			status={status}
			style={{ color: getIconColor(status, theme) }}
			size={80}
		/>

		<div>
			<Text size="xl" inline>
				Drag images here or click to select files
			</Text>
			<Text size="sm" color="dimmed" inline mt={7}>
				Attach as many files as you like, each file should not exceed 5mb
			</Text>
		</div>
	</Group>
);

const Popup = ({ fileAction }) => {
	// Poppup that let's user upload image

	// Snack bar to show an error in case of rejected file
	const { enqueSnackbar } = useSnackbar();
	// Moralis to use save ipfs function
	const { Moralis } = useMoralis();
	const theme = useMantineTheme();

	// Function that takes in the file and saves it to ipfs
	const saveFile = async fileInput => {
		const data = fileInput[0];
		const file = new Moralis.File(data.name, data);
		await file.saveIPFS();
		fileAction(await file.ipfs());
	};

	return (
		// Place to drop file in to be saved
		<Dropzone
			onDrop={files => saveFile(files)}
			onReject={files =>
				enqueSnackbar(`rejected files: ${files}`, { variant: "error" })
			}
			maxSize={3 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
		>
			{status => dropzoneChildren(status, theme)}
		</Dropzone>
	);
};

// Button that creates a pop up to upload an image
const UploadButton = ({ fileAction, props }) => {
	// @param fileAction: Function that returns file link that is saved in ipfs to perform an action with the file

	// State to track if pop up is opened or not
	const [opened, setOpened] = useState(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Introduce yourself!"
			>
				<Popup fileAction={fileAction} />
			</Modal>

			<Group>
				<Button {...props} onClick={() => setOpened(true)}>
					Upload new image
				</Button>
			</Group>
		</>
	);
};

export default UploadButton;
