import { App } from "astal/gtk3";
import style from "./style.scss";
import { Bar, Calendar } from "./widget/Bar";

App.start({
  css: style,
  main() {
    App.get_monitors().map(Bar);
  },
});
