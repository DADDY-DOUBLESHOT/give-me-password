import { server } from "@/utils/constants";
import axios from "axios";
import Head from "next/head";
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Encoded({ startTimer }) {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const [code, setCode] = useState("");

  const copytoClipboard = () => {
    const copy_btn = document.getElementById("copy-icon");
    navigator.clipboard.writeText(code);
    toast.success("Code copied successfully");
  };

  const handleCodeShow = () => {
    startTimer();
    setTimeout(() => {
      setShow(false);
      setCode("");
    }, 15000);
  };

  const generateCode = async (temp) => {
    await axios
      .post(`${server}/getpass`, { passcode: temp })
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

  const generateSchema = Yup.object({
    passkey: Yup.string().required("Generated passkey required"),
    website: Yup.string().required("Website address required"),
  });

  const formik = useFormik({
    initialValues: {
      passkey: "",
      website: "",
    },
    validationSchema: generateSchema,

    onSubmit: async (values) => {
      console.log(values);
      setLoader(true);
      await generateCode(values.passkey + values.website);
    },
  });

  const { getFieldProps, values, errors, touched, handleSubmit } = formik;

  return (
    <div className="d-flex justify-content-center">
      {show ? (
        <div className="col-12 col-lg-6 form-group d-flex flex-column">
          <div className="d-flex flex-column justify-content-center align-items-center  flex-fill text-center">
            <h5 className="mb-5">Encoded password generated successfully</h5>
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
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
          {loader ? (
            <span class="loader"></span>
          ) : (
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit} className="w-100">
                <div className="form-group text-start mb-4">
                  <label className="form-label">Generated Passkey</label>
                  <input placeholder="XXXXXX-XXX" className="form-control" {...getFieldProps("passkey")} />
                  {
                    <p
                      className="invalid-feedback"
                      style={{
                        display: Boolean(touched.passkey && errors.passkey) ? "block" : "none",
                      }}
                    >
                      {errors.passkey}
                    </p>
                  }
                </div>
                <div className="form-group text-start mb-4">
                  <label className="form-label">Website Address</label>
                  <input placeholder="www.example.com" className="form-control" {...getFieldProps("website")} />
                  {
                    <p
                      className="invalid-feedback"
                      style={{
                        display: Boolean(touched.website && errors.website) ? "block" : "none",
                      }}
                    >
                      {errors.website}
                    </p>
                  }
                </div>
                <div className="form-group d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary">
                    Generate Password
                  </button>
                </div>
              </Form>
            </FormikProvider>
          )}
        </div>
      )}
    </div>
  );
}
