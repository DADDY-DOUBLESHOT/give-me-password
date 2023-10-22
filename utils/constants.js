let tempserver = "http://give-me-password.vercel.app";

if (process && process.env.NODE_ENV === "development") {
  tempserver = "http://localhost:3000/api";
}

export const server = tempserver;
