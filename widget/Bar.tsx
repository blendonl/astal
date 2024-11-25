import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { getCpuUsage } from "../helper/cpu-usage.util";
import { getRamUsage } from "../helper/ram-usage.util";
import { getTime } from "../helper/time.util";
import { getBatteryInfo } from "../helper/battery/battery-info.util";

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
      <centerbox>
        <box halign={Gtk.Align.START}>
          <button>
            <levelbar
              value={getBatteryInfo.as((value) => {
                if (!value.percentage) {
                  return 0;
                }
                return +value.percentage.split("%")[0];
              })}
              maxValue={100}
              minValue={0}
            ></levelbar>
          </button>
          <button onClicked="echo hello" halign={Gtk.Align.START}>
            <label label={getCpuUsage} />
          </button>
          <button onClicked="echo hello" halign={Gtk.Align.START}>
            <label label={getRamUsage} />
          </button>
        </box>
        <box halign={Gtk.Align.CENTER}>
          <button onClick={() => Calendar(gdkmonitor)} halign={Gtk.Align.END}>
            <label label={getTime} />
          </button>
        </box>
        <box halign={Gtk.Align.END}>
          <button onClicked="echo hello">System Tray</button>
        </box>
      </centerbox>
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
          <label label={getTime} />
        </button>
      </centerbox>
    </window>
  );
}
