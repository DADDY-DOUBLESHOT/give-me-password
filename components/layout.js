import Encoded from "@/pages/encoded-password";
import Generate from "@/pages/generate-passcode";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default function Layout() {
  const [currentPage, setCurrentPage] = useState(null);
  const [timer, setTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(null);

  useEffect(() => {
    setCurrentPage("generate");
    setTimer(false);
    setTimerSeconds(15);
  }, []);

  const startTimer = () => {
    setTimerSeconds(15);
    setTimer(true);
  };
  return (
    <>
      {currentPage === "generate" ? (
        <Head>
          <title>Give me password</title>
          <meta name="description" content="Generate your dynamic passwords" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      ) : (
        <Head>
          <title>Encode password</title>
          <meta name="description" content="Generate your dynamic passwords" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <nav class="navbar navbar-expand-lg  navbar-dark ">
        <a class="navbar-brand" href="/">
          <img src="/images/logo.svg" className="img-fluid" style={{ width: "16rem", height: "10rem" }} />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav text-center">
            <li class="nav-item">
              <a class="nav-link active  bg-danger" aria-current="page" href="#">
                Generate
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Encode
              </a>
            </li>
          </ul>
          <span class="navbar-text mx-4">
            {timer && (
              <CountdownCircleTimer
                strokeWidth={16}
                trailColor="black"
                size={120}
                isPlaying={timer}
                duration={timerSeconds}
                colors={["#00cc00", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[15, 10, 5, 0]}
              >
                {({ remainingTime }) => {
                  if (remainingTime <= 0) {
                    setTimer(false);
                  }
                  return <h5>{remainingTime}</h5>;
                }}
              </CountdownCircleTimer>
            )}
          </span>
        </div>
      </nav>
      <div className="container">
        {currentPage === "generate" ? <Generate startTimer={startTimer} /> : <Encoded startTimer={startTimer} />}
      </div>
      <ToastContainer position="top-left" theme="dark" draggable={false} />
    </>
  );
}
