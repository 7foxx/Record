# 课程介绍

```ts
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    console.log(app, router, siteData)
    const pageData = usePageData()
    console.log(pageData)
  },
  setup() {},
  rootComponents: []
})
```

## 222
