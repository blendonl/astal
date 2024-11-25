import { Variable } from "astal";

export const getRamUsage = Variable("").poll(
  1000,
  "free -L --mega",
)((value) => {
  const row = value.split(" ").filter((item) => item !== "");

  if (!row) {
    return "";
  }

  const memFree = +row[row.length - 1];
  const memUse = +row[row.length - 3];

  const totalMem = memFree + memUse;

  return `${(100 * (memFree / totalMem)).toFixed(2)}%`;
});
