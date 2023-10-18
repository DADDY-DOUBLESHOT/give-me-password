import { server } from "@/utils/constants";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async () => {
    let temp = code;
    await setCode("");
    await generateCode(temp);
  };

  const generateCode = async () => {
    await axios
      .get(`${server}/api/getcode/${code}`)
      .then((res) => {
        setCode(res.data.passcode);
      })
      .catch((err) => {
        console.log("got error", err);
      });
  };

  return (
    <>
      <Head>
        <title>Give me password</title>
        <meta name="description" content="Generate your dynamic passwords" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container ">
        <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
          <div className="col-6 form-group">
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              className="form-control form-control"
              placeholder="Any favourite word ?"
            />
            <button className="form-control btn btn-primary mt-3" onClick={() => handleSubmit()}>
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
