// importing required modules
import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


const response = await client.files.upload({
  file: fs.createReadStream('path/to/file'),
  fileName: 'file-name.jpg',
});



export default imageKit;