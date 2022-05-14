import { Moralis } from "react-moralis";

export const uploadToIpfsAndSave = async (fileInput, objectName, columnName) => {
  // Save file input to IPFS
  const data = fileInput.files[0];
  const file = new Moralis.File(data.name, data);
  await file.saveIPFS();

  //console.log(file.ipfs(), file.hash())

  // Save file reference to Moralis
  const fileReference = new Moralis.Object(objectName);
  fileReference.set(columnName, file);
  await fileReference.save();
};

