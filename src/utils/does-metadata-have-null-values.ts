import { Metadata } from "../../types";

export const doesMetadataHaveNull = (metadata: Metadata): boolean => {
  return Object.values(metadata).some(
    (value) =>
      value === null ||
      (typeof value === "object" &&
        Object.values(value).some((v) => v === null))
  );
};
