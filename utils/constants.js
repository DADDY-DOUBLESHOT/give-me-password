let tempserver = process.env.VERCEL_URL;

if (process && process.env.NODE_ENV === "development") {
  tempserver = "http://localhost:3000/api";
}

export const server = tempserver;
