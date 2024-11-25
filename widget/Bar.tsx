import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable } from "astal";

type BatteryInfo = {
  powersupply: string;
  present: string;
  rechargeable: string;
  state: string;
  warning: string;
  energy: string;
  energy_empty: string;
  energy_full: string;
  energy_full_design: string;
  energy_rate: string;
  voltage: string;
  charge_cycles: string;
  percentage: string;
  capacity: string;
};

const time = Variable("").poll(1000, "date");

const timeFormatted = time().as((value) => {
  const fullDate = value.split(" ");
  const month = fullDate[1];
  const date = fullDate[2];
  const time = `${fullDate[3]} ${fullDate[4]}`;

  return `${month} ${date} ${time}`;
});

const cpuUsageCmd = "mpstat";

const cpuUsage = Variable("").poll(1000, cpuUsageCmd);

let cpuResult = cpuUsage().as((value) => {
  const row = value.split("\n")[3];

  if (!row) {
    return;
  }

  const col = row.split(" ");

  const idle = col[col.length - 1];

  return `${(100 - +idle).toFixed(2)}%`;
});

let ramUsage = Variable("").poll(
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

const battery = Variable("").poll(
  1000,
  "upower -i /org/freedesktop/UPower/devices/battery_BAT0",
)((value) => {
  const rows = value
    .replaceAll(" ", "")
    .split("\n")
    .reduce((obj: any, item) => {
      const separator = item.split(":");

      if (separator.length < 2) {
        return obj;
      }

      obj[separator[0].replaceAll("-", "_")] = separator[1].split(",")[0];

      return obj;
    }, {}) as BatteryInfo;

  return rows;
});

export function Bar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      application={App}
    >
      <centerbox
        startWidget={
          <box>
            <button>
              <label
                label={battery.as(
                  (value) =>
                    `${value.powersupply === "yes" ? (value.energy_full ? "F" : "C") : ""} ${value.percentage}`,
                )}
              />
            </button>
            <button onClicked="echo hello" halign={Gtk.Align.START}>
              <label label={cpuResult} />
            </button>
            <button onClicked="echo hello" halign={Gtk.Align.START}>
              <label label={ramUsage} />
            </button>
          </box>
        }
        centerWidget={
          <box>
            <button onClick={() => Calendar(gdkmonitor)} halign={Gtk.Align.END}>
              <label label={timeFormatted} />
            </button>
          </box>
        }
        endWidget={
          <box>
            <button onClicked="echo hello">System Tray</button>
          </box>
        }
      ></centerbox>
    </window>
  );
}

export function Calendar(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      className="Calendar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={
        Astal.WindowAnchor.TOP | Astal.WindowAnchor.TOP | Astal.WindowAnchor.TOP
      }
      application={App}
    >
      <centerbox>
        <button onClicked="echo hello" halign={Gtk.Align.START}>
          Welcome to AGS!
        </button>
        <box />
        <button onClick={() => Calendar(gdkmonitor)} halign={Gtk.Align.END}>
          <label label={timeFormatted} />
        </button>
      </centerbox>
    </window>
  );
}
