import { generateMemorableString } from "@/utils/helpers";

export default async (req, res) => {
  const passcode = generateMemorableString();

  res.status(200).json({ passcode });
};
