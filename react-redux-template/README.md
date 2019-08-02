# react redux template

## lib

- react
- react-router
- immer
- redux
- react-redux
- redux-actions
- redux-observable

## folder structure

### src/api

存放所有的 api methods，url 可以用 `{key}` 這樣包裝起來，執行時會用 body 對應的 key 替換，如果要用 query 可以放在第三個參數裡面
ex. url `/users/{user}`, body `{user: 'facebook'}` 會將 url 替換成 `/users/facebook`

### src/components

存放所有 components

### src/constants

存放 constant 變數，例如 api root url 或是 enum

### src/page

存放 container 元件，可以是各個頁面實作

### src/store

整個網站儲存資料的部分這邊使用 context 跟 redux 兩種，當要新增資料時要同時加上以下部分

- context
  - `initStore`
  - `reducer`
  - `WrapContext` 的 `Provider`

- redux
  - src/store/modules 裡面新增檔案，並且個別時做 type, epic, reducer
  - 增加到 src/store/modules/index.js 內

### src/style

- `GlobalStyles.js` 存放 global css 設定
- `theme.js` 存放 styled-components 的變數，可以存放色碼之類的東西

### src/utils

存放共用工具

- `useFetch` 呼叫 api 的 hook，傳入 `src/api` 內定義的 methods，使用方法如下
  - `immediately` 可以設定是否一開始就執行
  - `doStart` 無論 `immediately` 設定成什麼，執行 `doStart` 就會打 api 出去，也可以用來重新打 api
  - `setPayloadAndFetch` 設定 api payload 並且會再次 `doStart`
- `wrapRequest` 包裝 api 處理

## note

- `src` 內還會再放 `src` 的原因是為了要絕對路徑 import 會是 `src/` 開頭
- 環境變數設定在 `.env-rc.js` 如要新增變數一定要是 `REACT_APP_` 開頭 ref: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
- `prettier.config.js` 內設定 prettier style
- eslint 除了原本的 `react-app` rule 還新增了，`eslint-plugin-import` 跟 `eslint-plugin-sort-imports-es6-autofix` 用來排版 import 順序以及禁止 `../` 只能用 absolute imports
  - 目前在 import 習慣上會分成三部分並用空行分開，順序為 `套件`, `absolute imports`, `'./' 同一層`
