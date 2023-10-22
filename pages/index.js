import { server } from "@/utils/constants";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoader(true);
    let temp = code;
    setCode("");
    await generateCode(temp);
  };

  const copytoClipboard = () => {
    const copy_btn = document.getElementById("copy-icon");
    copy_btn.classList.remove("fa-regular");
    copy_btn.classList.add("fa-solid");
    navigator.clipboard.writeText(code);
    setTimeout(() => {
      copy_btn.classList.remove("fa-solid");
      copy_btn.classList.add("fa-regular");
    }, 2000);

    router.push("/encoded-password");
  };

  const handleCodeShow = () => {
    setTimeout(() => {
      setShow(false);
      setCode("");
    }, 15000);
  };

  const generateCode = async (temp) => {
    await axios
      .get(`${server}/getcode/${temp}`)
      .then((res) => {
        setCode(res.data.passcode);
      })
      .catch((err) => {
        console.log("got error", err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
          setShow(true);
          handleCodeShow();
        }, 1000);
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
        <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center">
          {show ? (
            <div className="col-12 col-lg-6 form-group d-flex flex-column">
              <div className="d-flex flex-column justify-content-center align-items-center  flex-fill text-center">
                <h5 className="mb-5">Please remember this code as this will be used for generation of other password</h5>

                <div className="form-group d-inline-flex align-items-center">
                  <input value={code} disabled className="form-control" id="code" />
                  <i
                    id="copy-icon"
                    htmlFor="code"
                    className="fa-regular fa-copy text-primary btn"
                    onClick={() => {
                      copytoClipboard();
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="col-12 col-lg-6 form-group d-flex flex-column">
              <div className="d-flex flex-column justify-content-center align-items-center  flex-fill text-center">
                <h5>Enter any favourite keyword and click generate</h5>
                <img src="/images/or.svg" />

                <h5>Directly click on generate</h5>
              </div>

              <div className="d-flex flex-column align-items-center flex-fill">
                {loader ? (
                  <span class="loader"></span>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
