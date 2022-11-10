import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
export default function Home() {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    (async () => {
      await getUrls();
    })();
  }, []);

  const ref = useRef(null);

  const getUrls = async () => {
    const response = await axios.get("/api/getUrls");
    if (response.data) setUrls(response.data.urls);
  };
  
  const onUrlGenerate = async () => {
    const longUrl = ref.current.value;
    console.log(longUrl)
    if (!longUrl) return setError("Please enter a valid url");
    const response = await axios.post("/api/generateUrl", { longUrl });
    console.log(response.status,"STATUS")
    if (!response.data.errorCode) {
      await getUrls();
    } else {
      setError(response.data.msg);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  return (
    <div>
      <h1 className={styles.heading}>My Url Shortner</h1>
      <div className={styles.urlContainer}>
        <input
          type="text"
          placeholder="Enter your url here..."
          className={styles.urlInput}
          ref={ref}

        />
        <button className={styles.buttonSubmit} onClick={onUrlGenerate}>
          Generate
        </button>
      </div>
      {error ? (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      ) : null}
      <table className={styles.url}>
        <thead>
          <tr>
            <th>Long Url</th>
            <th>Short Url</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td>
                <a href={url.longUrl} target="_blank">
                  {url.longUrl}
                </a>
              </td>
              <td>
                <a
                  href={`http://localhost:3000/SH-${url.shortUrl}`}
                  target="_blank"
                >{`http://localhost:3000/SH-${url.shortUrl}`}</a>
              </td>
              <td>{url.clickCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
