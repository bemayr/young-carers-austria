import { PayloadHandler } from "payload/dist/config/types";

export const migrate: PayloadHandler = (req, res, next) => {

  res.json({state: "success"})

  next();
}
