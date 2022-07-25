# TypeScript React

## seState

### 目标

掌握 useState Hook 配合 TypeScript 使用。

### 内容

-   `useState` 接收一个泛型参数，<font color=e32d40>**用于指定初始值的类型**</font>。

-   `useState` 的使用。

```ts
const [name, setName] = useState<string>('张三')
const [age, setAge] = useState<number>(28)
const [isProgrammer, setIsProgrammer] = useState<boolean>(true)

// 如果你在 setName 函数中的参数不符合声明的变量类型，程序会报错
<button onClick={() => setName(100)}>按钮</button>
```

-   `useState` 的类型推断，在使用 useState 的时候，只要提供了初始值，TypeScript 会自动根据初始值进行类型推断，因此 `useState` 的泛型参数可以省略。

```ts
export default function App() {
    const [name, setName] = useState('张三')
    const [age, setAge] = useState(28)
    const [isProgrammer, setIsProgrammer] = useState(true)
    return (
        <div>
            <button onClick={() => setName(100)}>按钮</button>
        </div>
    )
}
```

## useEffect

### 目标

掌握 useEffect Hook 在 TypeScript 中的使用。

### 内容

-   `useEffect` 是用于我们管理副作用（例如 API 调用）并在组件中使用 React 生命周期的。

-   `useEffect` 函数不涉及到任何泛型参数，在 TS 中的使用和 JS 中完全一致。

```ts
// 定时器
useEffect(() => {
    let timer = setInterval(() => {
        console.log('哈哈哈')
    })
    return () => {
        clearInterval(timer)
    }
}, [])
```

```ts
// 绑定事件
useEffect(() => {
    // 给 window 绑定点击事件
    const handleClick = () => {
        console.log('哈哈哈')
    }
    window.addEventListener('click', handleClick)

    return () => {
        // 给 window 移除点击事件
        window.addEventListener('click', handleClick)
    }
}, [])
```

## 📝 请求数据

### 目标

能够使用 useEffect 发送请求并掌握 useState 的进阶用法。

### 内容

-   频道列表接口：`http://geek.itheima.net/v1_0/channels`。

-   需求：发送请求获取频道列表数据，并且渲染。

-   注意：如果 useState 没有提供具体类型的初始值，是需要使用泛型参数指定类型的。

```jsx
// 存放频道列表数据
const [list, setList] = useState([])
```

![ifer_useState](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202207202100384.jpg)

-   关于 never 类型。

```ts
// 此时 Custom 就是 never 类型，不可能实现的类型
type Custom = number & string
```

-   如果 useState 的初始值是一个复杂的数据类型，需要给 useState 指定泛型参数。

```ts
import { useEffect, useState } from 'react'
import axios from 'axios'
// 定义类型别名 Res
type Res = { id: number; name: string }[]
export default function App() {
    // 解决1：给个初始值，不推荐
    // const [list, setList] = useState([{ name: 'ifer', id: 0 }])
    // 解决2：泛型参数
    // 一般复杂的类型，需要手动进行指定初始值类型，TS 没法进行推断
    const [list, setList] = useState<Res>([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://geek.itheima.net/v1_0/channels')
            setList(res.data.data.channels)
        }
        fetchData()
    }, [])
    return (
        <ul>
            {list.map((item) => {
                return <li key={item.id}>{item.name}</li>
            })}
        </ul>
    )
}
```

## useRef

### 目标

能够使用 useRef 配合 TS 操作 DOM。

### 内容

-   `useRef` 接收一个泛型参数，<font color=e32d40>**泛型参数用于指定 current 属性的值的类型**</font>。

-   如果使用 useRef 操作 DOM，需要明确指定所操作的 DOM 的具体的类型，否则 current 属性会是 null。

-   需求：获取 input 的 value 和获取 a 标签的 href。

```ts
import { useRef } from 'react'
export default function App() {
    // 不推荐 any
    // const inputRef = useRef<any>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const aRef = useRef<HTMLAnchorElement>(null)
    const get = () => {
        // inputRef.current 可能是 null，所以用了 ?.
        console.log(inputRef.current?.value)
        console.log(aRef.current?.href)
    }
    return (
        <div>
            <input type='text' ref={inputRef} />
            <a href='https://www.baidu.com' ref={aRef}>
                百度
            </a>
            <button onClick={get}>获取</button>
        </div>
    )
}
```

-   技巧：如何获取一个 DOM 对象的类型，鼠标直接移动到该元素上，就会显示出来该元素的类型。

![ifer_useRef2](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202207202101329.png)

## 可选链操作符

### 目标

掌握 JS 中提供的可选链操作符语法。

### 内容

可选链操作符（`?.`）允许读取位于连接对象链深处的属性值，而不必明确验证链中的每个引用是否有效，[参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)。

```ts
// 能在保证有 obj.first 的情况下采取获取 second 属性，没有的话也不至于报错（会返回 undefined）
let nestedProp = obj.first?.second
// 等价于
let nestedProp = obj.first === null || obj.first === undefined ? undefined : obj.first.second
```

## 非空断言

### 目标

掌握 TS 中的非空断言的使用语法。

### 内容

-   如果我们明确的知道对象的属性一定不会为空，那么可以使用非空断言 `!`。

-   注意：非空断言一定要确保有该属性才能使用，不然使用非空断言会导致 Bug。

```ts
// 告诉 TS，明确的指定 obj 不可能为空
let nestedProp = obj!.second
```

```ts
import { useRef } from 'react'
export default function App() {
    const inputRef = useRef<HTMLInputElement>(null)
    const get = () => {
        // 断言 inputRef.current 不可能为空
        /* const current = inputRef.current!
        console.log(current.value) */
        console.log(inputRef.current!.value)
    }
    return (
        <div>
            <input type='text' ref={inputRef} />
            <button onClick={get}>获取</button>
        </div>
    )
}
```

## React 路由

### 目标

能够在 TypeScript 中使用 React 路由。

### 内容

-   安装：`yarn add react-router-dom@5.3.0 @types/react-router-dom`。

-   在 `src/pages` 目录，新建组件 `Home.tsx` 和 `Login.tsx`，在 `App.tsx` 中配置如下。

```jsx
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <Link to='/login'>登录</Link>
                    <Link to='/home'>首页</Link>
                </nav>
                {/* 有了 TS 的支持后，代码提示变得非常的精确 */}
                <Route path='/login' component={Login} />
                <Route path='/home' component={Home} />
            </div>
        </Router>
    )
}
```

## useHistory

### 目标

掌握 useHistory 在 TypeScript 中的使用。

### 内容

-   useHistory 可以实现路由之间的跳转，并且在跳转时可以指定跳转参数 state 的类型。

-   useHistory 如果仅仅实现跳转功能，和 JS 中使用语法一致，例如期望从`首页`跳转到`登录页`。

```jsx
// /pages/Home.tsx
import { useHistory } from 'react-router-dom'

export default function Home() {
    const history = useHistory()
    const login = () => {
        history.push('/login')
    }
    return (
        <div>
            <h2>Home</h2>
            <button onClick={login}>登录</button>
        </div>
    )
}
```

-   useHistory 可以通过泛型参数来指定 state 的类型。

```ts
const history = useHistory<{ from: string }>()
const login = () => {
    history.push({
        pathname: '/login',
        state: {
            from: 'ifer',
        },
    })
}
```

<font color=909090>🧐 分析如下，先了解即可。</font>

```ts
// 点击 useHistory 可以发现类型定义的源码
// 参数：HistoryLocationState
// 返回：H.History<HistoryLocationState>

// 点击 H：import * as H from 'history';

// 点进去 history

// 看到 HistoryLocationState 给了 LocationDescriptor<HistoryLocationState>，通过观察可以发现，也可以通过第二个参数进行 state 的参数传递，如下：
// push(location: Path | LocationDescriptor<HistoryLocationState>, state?: HistoryLocationState): void;

// 点击 LocationDescriptor，如下：
// export type LocationDescriptor<S = LocationState> = History.LocationDescriptor<S>;

// 点击 LocationDescriptor，如下：
// export type LocationDescriptor<S = LocationState> = Path | LocationDescriptorObject<S>;

// 点击 LocationDescriptorObject，如下：
/* export interface LocationDescriptorObject<S = LocationState> {
    pathname?: Pathname | undefined;
    search?: Search | undefined;
    state?: S | undefined;
    hash?: Hash | undefined;
    key?: LocationKey | undefined;
} */

// 发现泛型 S 确定对应了 state
export function useHistory<HistoryLocationState = H.LocationState>(): H.History<HistoryLocationState>
```

## useLocation

### 目标

掌握 useLocation 在 TypeScript 中的使用。

### 内容

-   useLocation 接收一个泛型参数，用于指定接收的 state 类型，与 useHistory 的泛型参数对应。

```jsx
import { useLocation } from 'react-router-dom'

export default function Login() {
    const location = useLocation<{ from: string }>()
    // 直接点击登录页，没有传参会报错，所以这里用了可选链操作符 ?.
    return <div>Login: {location.state?.from}</div>
}
```

-   注意：因为 useLocation 和 useHistory 都需要指定 Location 类型，因此可以将类型存放到通用的类型声明文件中，`src/types.d.ts`。

```ts
// Tip: 这里明确或了一个 null，当后面再书写 location.state.from 的时候，.from 的前面会自动加上 ? 号
export type LocationState = {
    from: string
} | null
```

-   `Home.tsx` 或 `Login.tsx` 中的类型定义直接换成 LocationState 即可。

```ts
import { useLocation } from 'react-router-dom'
import { LocationState } from '../types'

export default function Login() {
    const location = useLocation<LocationState>()
    return <div>Login: {location.state?.from}</div>
}
```

<font color=909090>🧐 分析如下，了解即可</font>。

```ts
// 点击 useLocation，把传递过来的泛型参数 S 给了返回值 H.Location<S>
// export function useLocation<S = H.LocationState>(): H.Location<S>;

// 点击 Location，发现 S 给了 state，由此推断，泛型参数是用来约束 state 参数的，如下：
/* export interface Location<S = LocationState> {
    pathname: Pathname;
    search: Search;
    state: S;
    hash: Hash;
    key?: LocationKey | undefined;
} */
```

## useParams

### 目标

能够掌握 useParams 在 TypeScript 中的使用。

### 内容

useParams 接收一个泛型参数，用于指定 params 对象的类型。

`App.tsx`

```ts
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import Article from './Article'

function App() {
    return (
        <div>
            <Router>
                <nav>
                    <Link to='/article/1'>文章1</Link>
                    <Link to='/article/2'>文章2</Link>
                </nav>
                <Route path='/article/:id' component={Article} />
            </Router>
        </div>
    )
}

export default App
```

`pages/article.tsx`

```ts
import { useParams } from 'react-router'
export default function Article() {
    const params = useParams<{ id: string }>()
    return <div>Article: {params.id}</div>
}
```

## unknow

-   never: 不可能实现的类型，例如下面的 Test 就是 never。

```ts
type Test = number & string
```

-   any: 任意类型，不对类型进行校验。

```ts
let num: any
num = 88
num = 'abc'
num() // 没有错误提示
console.log(num.length) // 没有错误提示
```

-   unknown: 任意类型，更安全的 any 类型。

```ts
let num: unknown
num = 88
num = 'abc'
console.log(num)
num() // error: 不能调用方法
console.log(num.length) // error: 不能访问属性
```

-   unknown 类型可以配合断言使用。

```ts
let len = (num as string).length
console.log(len)
```

-   或者类型收窄来处理 unknown 类型。

```ts
if (typeof num === 'string') {
    num.toUpperCase()
} else if (typeof num === 'function') {
    num()
}
```

## Redux

### 目标

掌握在 TS 项目中如何初始化 Redux。

### 内容

-   安装依赖包，`yarn add redux react-redux redux-devtools-extension`。

-   `store/reducers/todo.ts`

```ts
const initValue = [
    {
        id: 1,
        name: '吃饭',
        done: false,
    },
    {
        id: 2,
        name: '睡觉',
        done: true,
    },
    {
        id: 3,
        name: '打豆豆',
        done: false,
    },
]
// action 暂时给了 any
export default function todo(state = initValue, action: any) {
    return state
}
```

-   `store/reducers/index.ts`。

```ts
import { combineReducers } from 'redux'
import todo from './todo'
export default combineReducers({ todo })
```

-   `store/index.ts`。

```jsx
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
export default createStore(rootReducer, composeWithDevTools())
```

-   `src/index.tsx`。

```jsx
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
```

## useSelector

### 目标

掌握 useSelector 在 TS 中的使用。

### 内容

-   useSelector 的基本使用，接收两个泛型参数。

```jsx
// 泛型参数1: 指定 state 的类型，默认是 {}
// 泛型参数2: 指定函数的返回值类型
const name = useSelector<{ name: string }, string>((state) => state.name)
```

-   也可以不使用泛型，通过指定 state 函数参数的类型，[参考文档](https://react-redux.js.org/using-react-redux/usage-with-typescript#typing-the-useselector-hook)。

```jsx
const name = useSelector((state: { name: string }) => state.name)
```

-   <font color=e32d40>**问题：如何准确的获取到 store 中 todo 的类型呢？**</font>[参考文档](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types)。

-   方法 1：手动指定，`pages/Home/index.tsx`。

```ts
import { useSelector } from 'react-redux'
type RootState = {
    todo: {
        id: number
        name: string
        done: boolean
    }[]
}
export default function Home() {
    const todo = useSelector((state: RootState) => state.todo)
    console.log(todo)
    return <div>Home</div>
}
```

-   方法 2：`typeof` 配合 `ReturnType`。

`typeof` 可以获取某个数据的类型，`ReturnType` 是一个泛型工具类型，可以获取一个函数类型的返回值类型。

```ts
function fn(n1: number, n2: number): number {
    return n1 + n2
}
// 获取 fn 函数的类型
type Fn = typeof fn
// 获取 Fn 函数的返回值类型
type Res = ReturnType<Fn>
```

-   获取 RootState 的操作 `store/index.tx`。

```ts
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
const store = createStore(rootReducer, composeWithDevTools())
// mark
export type RootState = ReturnType<typeof store.getState>
export default store
```

-   `pages/Home/index.tsx` 中的写法如下。

```jsx
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
export default function Home() {
    const todos = useSelector((state: RootState) => state.todo)
    return (
        <ul>
            {todos.map((item) => (
                <li className={item.done ? 'completed' : ''} key={item.id}>
                    <span>{item.name}</span>
                    <button>X</button>
                </li>
            ))}
        </ul>
    )
}
```

-   `pages/Home/index.css`。

```css
.completed {
    color: lightgray;
    text-decoration: line-through;
}
```

## useDispatch

```ts
import { Dispatch } from 'react'
import { useDispatch } from 'react-redux'
export default function Home() {
    // useDispatch 的泛型参数是 Dispatch<参数>，“参数” 表示 Action 的类型
    // 一般写的时候只需要和普通的 JS 写法一样即可，因为不会在组件中直接 dispatch 一个 action
    // 而是：dispatch 的是通过 actionCreator 生成的 action
    const dispatch = useDispatch<Dispatch<{ type: 'TODO_DEL'; id: number }>>()
    dispatch({ type: 'TODO_DEL', id: 1 })
    return null
}
```

## Action 和 Reducer

### 目标

掌握 Action 和 Reducer 在 TS 中的使用。

### 内容

-   `store/actions/todo.ts`。

```ts
export const todoAdd = (name: string) => ({
    type: 'TODO_ADD',
    name,
    id: Date.now(),
    done: false,
})

export const todoDel = (id: number) => ({
    type: 'TODO_DEL',
    id,
})
```

-   `store/reducers/todo.ts`。

```ts
type TodoType = {
    id: number
    name: string
    done: boolean
}[]
const initValue: TodoType = []
// action 暂时给了 any
export default function todo(state = initValue, action: any): TodoType {
    return state
}
```

<font color=e32d40>**问题：如何给 Action 定义类型？**</font>

-   `store/reducers/todo.ts`。

```ts
type TodoType = {
    id: number
    name: string
    done: boolean
}[]

// #1 想法
type TodoAction = {
    type: string
    [key: string]: any
}

const initValue: TodoType = []
export default function todo(state = initValue, action: TodoAction): TodoType {
    // #2 问题
    console.log(action.name) // 没有提示
    return state
}
```

-   解决：应该在 `store/actions/todo.ts` 中进行明确指定。

```ts
// #1
export type TodoAction =
    | {
          type: 'TODO_ADD' // #2 '就是 ADD_TODO' 类型
          name: string
          id: number
          done: boolean
      }
    | {
          type: 'TODO_DEL'
          id: number
      }

// #3 指定返回值
export const todoAdd = (name: string): TodoAction => ({
    type: 'TODO_ADD', // #4 这里写的时候会有提示
    name,
    id: Date.now(),
    done: false,
})

export const todoDel = (id: number): TodoAction => ({
    type: 'TODO_DEL',
    id,
})
```

-   `store/reducers/todo.ts` 中的 action 类型也可以指定为 TodoAction 啦。

```ts
import { TodoAction } from '../actions/todo'

type TodoType = {
    id: number
    name: string
    done: boolean
}[]

const initValue: TodoType = []
// #5 指定 action 的类型为 TodoAction
export default function todo(state = initValue, action: TodoAction): TodoType {
    switch (action.type) {
        case 'TODO_ADD':
            const { type, ...rest } = action
            return [rest, ...state]
        case 'TODO_DEL':
            return state.filter((item) => item.id !== action.id)
        default:
            return state
    }
}
```

## redux-thunk

### 目标

掌握 redux-thunk 在 TypeScript 中的使用。

### 内容

📝 需求：期望点击删除按钮时，等待 2s 后删除。

-   `store/index.ts` 中配置 `redux-thunk`。

```ts
// #2
import { createStore, applyMiddleware } from 'redux'
// #1
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
const store = createStore(
    rootReducer,
    // #3
    composeWithDevTools(applyMiddleware(thunk))
)
export type RootState = ReturnType<typeof store.getState>
export default store
```

-   `actions/todo.ts`。

```ts
export const todoDelAsync = (id: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(todoDel(id))
        }, 2000)
    }
}
```

-   `pages/Home/index.tsx`。

```ts
const handleDel = (id: number) => {
    dispatch(todoDelAsync(id))
}
```

### ThunkAction

问题：<font color=e32d40>**如何处理 todoDelAsync 返回值的类型？**</font>

-   ThunkAction 类型的使用，[参考文档](https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks)。

```ts
// 泛型参数
// 1: 指定内部函数的返回值类型，一般是 void
// 2: 指定 RootState 的类型
// 3: 指定额外的参数类型，这里用不到，一般为 unknown 或 any
// 4: 指定 dispatch 的 action 的类型
export const todoDelAsync = (id: number): ThunkAction<void, RootState, unknown, TodoAction> => {
    return (dispatch, getState, extraData) => {
        // getState().todo // 因为，指定了 RootState 类型，这儿自动具有提示
        setTimeout(() => {
            dispatch(todoDel(id))
        }, 2000)
    }
}
```

可以把 RootThunkAction 抽取到 `store/index.ts` 文件中。

```ts
import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
// #mark1
import { TodoAction } from './actions/todo'
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
export type RootState = ReturnType<typeof store.getState>
// #mark2
export type RootThunkAction = ThunkAction<void, RootState, unknown, TodoAction>
export default store
```

### 一个 Bug

```ts
export const todoDelAsync = (id: number): RootThunkAction => {
    return (dispatch) => {
        setTimeout(() => {
            // dispatch(todoDel(id))
            // !下面写法并没有提示（虽然写错了会报出来）
            dispatch({
                type: 'TODO_DEL',
                id,
            })
        }, 2000)
    }
}
```

-   问题说明：在 redux-thunk@2.4.0 新版中，使用 dispatch 的时候，会丢失提示，需要降级到 2.3.0 版本，[issues](https://github.com/reduxjs/redux-thunk/issues/326)。

-   解决办法：`yarn add redux-thunk@2.3.0`。

