import axios from "axios";

async function run() {
  const url1 = "https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.development.js";
  const url2 = "https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.production.min.js";
  
  try {
    const res1 = await axios.head(url1);
    console.log("URL 1 (Dev) Status:", res1.status);
  } catch (err: any) {
    console.log("URL 1 (Dev) Error:", err.response?.status || err.message);
  }

  try {
    const res2 = await axios.head(url2);
    console.log("URL 2 (Prod) Status:", res2.status);
  } catch (err: any) {
    console.log("URL 2 (Prod) Error:", err.response?.status || err.message);
  }
}

run();
