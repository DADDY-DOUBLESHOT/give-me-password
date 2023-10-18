import { generateMemorableString } from "@/utils/helpers";

export default async (req, res) => {
  console.log(req.query);
  const passcode = generateMemorableString(req.query.code);

  res.status(200).json({ passcode });
};
