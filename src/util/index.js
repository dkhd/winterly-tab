import axios from "axios";

export const retrieveImage = async () => {
  let image = await axios.get("https://qolqi.sse.codesandbox.io/images");
  const totalImage = image.data.length;
  const min = Math.ceil(0);
  const max = Math.floor(totalImage);
  const n = Math.floor(Math.random() * (max - min + 1)) + min;
  image = image.data[n];
  return image;
};
