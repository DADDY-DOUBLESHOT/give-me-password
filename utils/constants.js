let tempserver = `http://${process.env.VERCEL_URL}/api`;

if (process && process.env.NODE_ENV === "development") {
  tempserver = "http://localhost:3000/api";
}

export const server = tempserver;
