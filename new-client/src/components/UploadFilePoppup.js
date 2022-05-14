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

const Popup = () => {
  const { enqueSnackbar } = useSnackbar();
  const theme = useMantineTheme();
  const {Moralis} = useMoralis();

  const saveFile = async (file) => {
    console.log(file)
  };

  return (
    <Dropzone
      onDrop={(files) => saveFile(files)}
      onReject={(files) =>
        enqueSnackbar(`rejected files: ${files}`, { variant: "error" })
      }
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Popup />
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Upload new image</Button>
      </Group>
    </>
  );
};

export default UploadButton;
