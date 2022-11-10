// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/mongodb";
import Url from "../../models/urls";
import { urlgenerate } from "../../utils/helper";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { longUrl } = req.body;
    if (longUrl) {
      const hashKey = urlgenerate();
      const shortUrl = "http://localhost:3000/SH-" + hashKey;
      try {
        const fetchedUrl = await Url.findOne({ longUrl });
        if (fetchedUrl) {
          return res
            .status(200)
            .json({ msg: "Short url already Present", shortUrl: "http://localhost:3000/SH-"+fetchedUrl.shortUrl, longUrl, errorCode:1 });
        }
        else{
          const url = new Url({
            longUrl,
            shortUrl: hashKey,
          });
          const urlCreated = await url.save();
          return res.status(200).json(urlCreated);
        }
        

      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
      }
    } else {
      return res.status(400).json({ msg: "Please provide long url" });
    }
  }
  else{
    return res.status(200).json({ msg: "Method type not supported" });
  }
};

export default connectDB(handler);
