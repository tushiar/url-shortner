// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../middleware/mongodb";
import Url from "../../models/urls";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const urls = await Url.find({});
      return res.status(200).json({ urls });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }
  else{
    return res.status(200).json({ msg: "Method type not supported" });
  }
};

export default connectDB(handler);
