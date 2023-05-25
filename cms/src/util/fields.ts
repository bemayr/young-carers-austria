import { Field } from "payload/types";
import { serialize } from "../api/plain";

export const virtualPlainRichtextField = (field: string) => ({
  name: `${field}Plain`,
  type: "text",
  admin: {
    hidden: true, // hides the field from the admin panel
  },
  hooks: {
    beforeChange: [
      ({ siblingData }) => {
        // ensures data is not stored in DB
        delete siblingData[`${field}Plain`];
      },
    ],
    afterRead: [
      ({ siblingData }) => {
        return serialize(siblingData[field]).trim();
      },
    ],
  },
}) as Field;
