import { Variable } from "astal";

export const getBatteryInfo = Variable("").poll(
  1000,
  "upower -i /org/freedesktop/UPower/devices/battery_BAT0",
)((value) => {
  const status = value
    .replaceAll(" ", "")
    .split("\n")
    .reduce((obj: any, item) => {
      const separator = item.split(":");

      if (separator.length < 2) {
        return obj;
      }

      obj[separator[0].replaceAll("-", "_")] = separator[1].split(",")[0];

      return obj;
    }, {}) as BatteryInfoData;

  return status;
});
