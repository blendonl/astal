import { Variable } from "astal";

export const getTime = Variable("").poll(
  1000,
  "date",
)((value) => {
  const fullDate = value.split(" ");
  const month = fullDate[1];
  const date = fullDate[2];
  const time = `${fullDate[3]} ${fullDate[4]}`;

  return `${month} ${date} ${time}`;
});
