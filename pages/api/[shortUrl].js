// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/mongodb";
import Url from "../../models/urls";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const hashKey = req.query.shortUrl;

    try {
      if (hashKey) {
        const hash = hashKey.split("-")[1];
        const url = await Url.findOne({ shortUrl: hash });
        if (url) {
          const clickCount = url.clickCount;
          await Url.updateOne(
            { shortUrl: hash },
            { $set: { clickCount: clickCount + 1 } }
          );

          return res.status(200).json({ url });
        }
      }
      return res.status(200).json({ msg: "Long url not found" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  } else {
    return res.status(200).json({ msg: "Method type not supported" });
  }
};

export default connectDB(handler);
