import { defineClientConfig, usePageData } from "@vuepress/client"

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    console.log(app, router, siteData)
    const pageData = usePageData()
    console.log(pageData)
  },
  setup() {},
  rootComponents: [],
})
