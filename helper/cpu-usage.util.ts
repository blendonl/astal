import { Variable } from "astal";

const cpuUsage = Variable("").poll(1000, "mpstat");

export const getCpuUsage = cpuUsage().as((value) => {
  const row = value.split("\n")[3];

  if (!row) {
    return;
  }

  const col = row.split(" ");

  const idle = col[col.length - 1];

  return `${(100 - +idle).toFixed(2)}%`;
});
