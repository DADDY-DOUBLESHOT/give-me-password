import { encodeString } from "@/utils/helpers";

export default async (req, res) => {
  const passcode = encodeString(req.body.passcode);

  res.status(200).json({ passcode });
};
