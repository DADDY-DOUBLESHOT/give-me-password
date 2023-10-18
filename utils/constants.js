let tempserver = "";

if (process && process.env.NODE_ENV === "development") {
  //   tempserver = "http://localhost:3001";
  tempserver = "";
}

export const server = tempserver;
