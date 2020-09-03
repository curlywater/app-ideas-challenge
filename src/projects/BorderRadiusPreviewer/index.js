export default {
  name: "BorderRadiusPreviewer",
  description: "圆角生成器",
  getMain () {
    return import("./App.js")
  },
  getReadme () {
    return import("./README.md")
  }
}