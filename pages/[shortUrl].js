import axios from "axios";
import React, { useEffect } from "react";

const index = (props) => {
  return <div></div>;
};

index.getInitialProps = async (ctx) => {
  const hashKey = ctx.query.shortUrl;
  const response = await axios.get("http://localhost:3000/api/" + hashKey);
  ctx.res.writeHead(307, {
    Location: response.data.url.longUrl,
  });
  ctx.res.end();
  return {};
};
export default index;
