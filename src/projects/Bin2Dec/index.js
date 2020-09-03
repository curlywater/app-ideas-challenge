export default {
  name: "Bin2Dec",
  description: "二进制到十进制转换器",
  getMain: ()  => import("./App"),
  getReadme: () => import("./README.md")
}