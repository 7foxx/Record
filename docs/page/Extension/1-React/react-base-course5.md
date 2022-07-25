# Hooks 基础
## 今日目标

✔ 了解 React Hooks。

✔ 掌握 useState hook。

✔ 掌握 useEffect hook。

<!-- more -->

## Hooks 是什么

### 目标

能够说出 React Hooks 是什么？

### 内容

-   `Hooks`：钩子、钩住，是 `React@16.8` 提供的新功能。

-   作用：为函数组件提供状态、生命周期等原本 class 组件中才有的功能，可以理解为通过 Hooks 为函数式组件钩入了 class 组件的特性。

-   `React@16.8` 以前，class 组件（提供状态和生命周期） + 函数组件（展示内容）。

-   `React@16.8` 以后，class 组件（提供状态和生命周期） + 函数组件（展示内容），Hooks（提供状态和生命周期） + 函数组件（展示内容），也可以混用这两种方式，即部分功能用 class 组件，部分功能用 Hooks + 函数组件。

-   注意：<font color=e32d40>**Hooks 只能在函数组件中使用**</font>，虽然有了 Hooks，但 [React 官方](https://zh-hans.reactjs.org/docs/hooks-intro.html)并没有计划从 React 库中移除 class。

### 总结

-   Hooks 的作用是什么？

-   有了 Hooks 以后，还能再把函数式组件称为无状态组件吗，为什么？

## 为什么要有 Hooks

### 目标

能够说出 Hooks 解决什么问题？

### 内容

-   组件的状态逻辑复用问题

    a，在 Hooks 之前，组件的状态逻辑复用经历了：mixins（混入）、HOC（高阶组件）、render props 等模式。

    b，（早已废弃）mixins 的问题：数据来源不清晰；命名冲突。

    c，HOC、render props 的问题：重构组件结构，导致组件形成 JSX 嵌套地狱问题。

-   class 组件自身的问题

    a，选择：函数组件和 class 组件之间的区别以及使用哪种组件更合适。

    b，需要理解 class 中的 this 是如何工作的。

    c，同一业务的状态和业务逻辑被拆分到不同位置。

```jsx
{
    state = {
        count: 0
    },
    fn = () => {
        this.setState({ count: this.state.count + 1 })
    },
    componentDidMount() {
        window.addEventListener('resize', this.fn)
    },
    componentWillUnmount(){
        window.addEventListener('resize', this.fn)
    }
}
```

![hook](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202207210934332.gif)

-   相比于函数组件来说，类组件不利于代码压缩和优化，也不利于 TS 的类型推导。

```bash
# 例如不能把 componentDidMount 压缩成 c
# 例如写 this 的时候没有提示，因为 this 只有在调用的时候才能确定指向，编写代码期间 TS 是不知道的
```

### 总结

Hooks 解决了什么问题？

## Hooks 渐进策略

### 目标

能够了解 Hooks 和之前 class 的写法是可以共存的。

### 内容

-   [官方](https://zh-hans.reactjs.org/docs/hooks-intro.html)没有计划从 React 中移除 class 组件。

-   Hooks 和现有代码可以同时工作，建议渐进式地使用它们。

    a，不推荐：大规模使用 Hooks 直接重构现有组件。

    b，推荐：新功能用 Hooks，Hooks 实现不了的复杂功能，也可以继续用 class。

    c，具体操作，从一些功能简单、非核心功能的组件开始使用 Hooks。

-   不能在 Hooks 组件中，使用 class 组件相关的 API。

    a，state 与 setState。

    b，钩子函数，`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`。

    c，`this` 相关的用法。

-   原来学习的绝大部分知识点还是要用的。

    a，JSX：`{}`、`onClick={handleClick}`、条件渲染、列表渲染、样式处理等。

    b，组件：函数组件、组件通讯。

    c，React 开发理念：`单向数据流`、`状态提升` 等。

    d，解决问题的思路、技巧、常见错误的分析等。

### 小结

项目中 class 组件和函数配合 Hooks 的写法可以共存吗？

## useState 基本使用（1）

### 目标

能够掌握 `useState` 的基本使用。

### 内容

**<font color=e32d40>作用：为函数组件提供状态和修改状态的方法。</font>**

### 需求

![ifer_calc](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202207210935056.gif)

1. 导入 `useState` 函数。

2. 调用 `useState` 函数，并传入状态的初始值。

3. 从 `useState` 函数的返回值中，拿到状态和修改状态的函数。

核心代码

```jsx
import React, { useState } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    return (
        <div style={{ textAlign: 'center' }}>
            <h3>计数器：{count}</h3>
            <div>
                <button onClick={() => setCount(count + 1)}>+1</button>
            </div>
        </div>
    )
}

export default App
```

### 细节

-   参数：初始状态，比如传入 0 就表示该状态的初始值为 0。

-   注意：此处的状态可以是任意值（比如，数值、字符串、对象等），注意 class 组件中的 state 必须是对象。

-   返回值：数组，数组里面包含两个值，状态和修改该状态的方法。

-   约定：修改状态的方法以 set 开头，后面跟上状态的名称。

### 小结

-   useState 的作用是什么？

-   useState 的返回值是什么数据类型？

## useState 基本使用（2）

### 目标

-   能够说出 useState 能写在哪里？

-   了解 React 中状态的不可变性。

### 内容

-   读取状态

    目前，<font color=e32d40>**useState 只能在函数组件内部调用**</font>（或者后续学习的自定义 Hook 内部也可以使用），所以返回的状态也是函数内部的局部变量。

-   修改状态

    a，`setCount(newValue)` 是一个函数调用，参数表示新的状态值。

    b，调用该函数后，将使用新的状态值直接替换旧状态。

    c，修改状态后，组件会自动重新渲染。

-   状态的不可变性（修改状态的时候，要使用新的状态替换掉旧的状态，而不要直接修改原状态）。

```jsx
import React, { useState } from 'react'

const App = () => {
    const [obj, setObj] = useState({
        count: 0,
    })
    const handleClick = () => {
        // Error
        obj.count++
        setObj(obj)
        // Right
        /* setObj({
            count: obj.count + 1,
        }) */
    }
    return (
        <div>
            <p>{obj.count}</p>
            <button onClick={handleClick}>click</button>
        </div>
    )
}

export default App
```

### 小结

-   目前，useState 只能写在哪里？

-   状态的不可变性是什么意思？

## useState 与组件更新过程

### 目标

能够说出使用功能 `useState()` 之后，组件的更新过程。

### 内容

-   组件第 1 次渲染

    1.  调用函数式组件，从头开始执行组件中的代码逻辑。

    2.  调用 `useState(0)` 将传入的参数作为初始状态值，即：0。

    3.  开始渲染组件，此时得到的状态 count 值为：0。

-   组件第 2 次渲染

    1. 点击按钮，调用 `setCount(count + 1)` 来修改状态，因为状态发生改变，所以，该组件会重新渲染。

    2. 组件重新渲染时，会再次执行该组件中的代码逻辑。

    3. 再次调用 `useState(0)`，此时 <font color=d32e40>**React 内部会拿到最新的状态值而非初始值**</font>，比如该案例中的最新状态值为 1。

    4. 再次渲染组件，此时，获取到的状态 count 值为：1。

-   **<font color=e32d40>强调：useState 的初始值(参数)只会在组件第一次渲染时生效</font>**，也就是说，以后的每次渲染，useState 获取到都是最新的状态值，React 组件内部会记住每次更新后的最新状态值!

## useState 另一种写法

### 目标

掌握 `useState(回调函数)` 的写法。

### 内容

-   `useState(回调函数)`，回调函数的返回值就是状态的初始值，<font color=e32d40>**该回调函数只会触发一次**</font>。

```jsx
useState(() => {
    return 初始值
})
```

-   该使用哪种形式？

    a，如果状态就是需要一个普通数据（没有逻辑、无需计算），那么推荐 `useState(普通的数据)`。

    b，如果状态是经过一些计算得到的，此时，推荐使用 useState(回调函数)。

### 案例

📝 需求：对下面的代码进行性能优化。

```jsx
import React, { useState } from 'react'

export default function App() {
    let defaultCount = 0
    for (let i = 0; i < 100; i++) {
        defaultCount += i
    }
    const [count, setCount] = useState(defaultCount)
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

### 小结

-   `useState(回调函数)`，回调函数的返回值表示什么？

-   什么情况下使用回调函数的形式？

## useState 使用细则

### 目标

掌握如何为函数组件提供多个状态以及注意点。

### 内容

-   如何为函数组件提供多个状态？

    多次调用 useState 即可，每一次调用返回的 `[state, setState]` 之间，互不影响。

-   useState 的使用细则。

    a，<font color=e32d40>**不能嵌套在 if/for/其他函数 中！**</font>（if 的条件判断、for 循环的次数、函数的调用与否都可能会影响 hook 的顺序）。

    b，React 是按照 Hooks 的调用顺序来识别每一个 Hook，如果每次调用的顺序不同，导致 React 无法知道是哪一个状态和修改状态的方法。

    c，可以通过开发者工具进行查看 React 对 Hook 的管理。

```jsx
import React, { useState } from 'react'

export default function App() {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(3)
    const [num3, setNum3] = useState(6)
    return (
        <div>
            <div>
                num1: {num1}
                <button onClick={() => setNum1(num1 + 1)}>修改 num1</button>
            </div>
            <div>
                num2: {num2}
                <button onClick={() => setNum2(num2 + 1)}>修改 num1</button>
            </div>
            <div>
                num3: {num3}
                <button onClick={() => setNum3(num3 + 1)}>修改 num1</button>
            </div>
        </div>
    )
}
```

## useEffect 副作用介绍

### 目标

能够说出什么是副作用（side effect）。

### 内容

-   类比，对于 999 感冒灵来说。

    a，主作用：用于治疗感冒引起的头痛，发热，鼻塞，流涕，咽痛等。

    b，副作用：可见困倦、嗜睡、口渴、虚弱感。

-   那组件或一般函数的副作用是什么呢？

    a，组件的副作用：对于 React 组件来说，主作用就是根据数据（state/props）<font color=e32d40>**渲染 UI**</font>，除此之外都是副作用，比如手动修改 DOM、数据（AJAX）请求、localStorage 操作等。

    b，函数的副作用：如果一个函数修改了其局部环境之外的数据，那么它就被称为有副作用。

-   关于 useEffect。

    作用：当你想要在函数组件中处理副作用（side effect），就要使用 useEffect 了。

### 总结

-   对于 React 组件来说，“主作用”是什么？

-   常见的有哪些“副作用”？

## useEffect 基本使用

### 目标

能够在函数组件中操作 DOM（处理副作用）。

### 内容

-   执行时机：初始化时和数据变化的时候执行。

-   相当于 class 中的 componentDidMount + componentDidUpdate。

```jsx
useEffect(() => {})
```

### 需求

在实际开发中，副作用是不可避免的。

📝 需求：点击按钮，让数字加 1，并把变化后的数字展示在网页标题上。

### 步骤

1. 初始化时渲染数据到网页标题上。

2. 当数据变化的时候把变化后的数据渲染到网页标题上。

### 代码

```jsx
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(() => 0)
    useEffect(() => {
        // 1. 初始化时执行
        // 2. 数据变化的时候执行
        document.title = count
    })
    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}

export default App
```

### 小结

上面 useEffect 的写法相当于 class 组件中哪两个钩子？

## useEffect 依赖说明

### 目标

能够设置 useEffect 的依赖，只在 count 变化时，才执行相应的 effect。

### 内容

-   问题：如果组件中还有其他状态，其他状态更新时，刚刚的 effect 回调（修改标题的操作）也会执行。

-   默认：函数中的任何状态发生更新，useEffect 的回调函数都会执行。

-   优化：<font color=e32d40>**如何跳过不必要的执行，只有在 count 变化时，才执行相应的 effect**</font>。

-   操作：第二个参数可以传一个数组，表示只有当数组中的选项/依赖项改变时，才会重新执行该 effect。

### 问题

```jsx
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    const [money, setMoney] = useState(100)
    useEffect(() => {
        console.log('执行了 useEffect ~~~')
        document.title = count
    })
    return (
        <div>
            <p>count: {count}</p>
            <p>money: {money}</p>
            <button onClick={() => setCount(count + 1)}>update count</button>
            <button onClick={() => setMoney(money + 1)}>update money</button>
        </div>
    )
}

export default App
```

### 解决

```jsx
useEffect(() => {
    console.log('执行了 useEffect ~~~')
    document.title = count
}, [count])
```

### 小结

useEffect 的第二个参数用来干嘛的？

## 立即获取更新后的数据 📝

## useEffect 依赖是一个空数组

### 目标

通过 useEffect 如何让组件只有在第一次渲染后会执行。

### 内容

useEffect 的第二个参数，还可以是一个空数组（[]），表示只有在组件第一次渲染后执行，一般会进行**事件绑定**、**发送请求**等。

### 代码

```jsx
useEffect(() => {
    const handleResize = () => {}
    window.addEventListener('resize', handleResize)
}, [])
```

### 解释

-   仅相当于 class 组件的 componentDidMount 钩子函数的作用。

-   和 useState 一样，一个组件中也可以调用多次 useEffect。

-   推荐：一个 useEffect 只处理一个功能，有多个功能时，使用多次 useEffect。

### 小结

useEffect 的第二个参数是一个空数组，相当于 class 组件中的那个钩子？

## useEffect 不要对依赖项撒谎

### 目标

能够理解如果不正确使用依赖项可能会带来的问题。

### 内容

-   useEffect 回调函数中用到的数据（比如前面学习的 count）就是依赖数据，就应该出现在依赖项数组中。

-   如果 useEffect 回调函数中用到了某个数据，但是没有出现在依赖项数组中，就会导致一些“Bug”出现（例如 useEffect 回调不会执行）！

-   所以，不要对 useEffect 的依赖撒谎，[参考 useEffect 完全指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)。

```jsx
import React, { useState, useEffect } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    useEffect(() => {
        // React Hook useEffect has a missing dependency: 'count'. Either include it or remove the dependency array
        document.title = count
    }, [])
    return (
        <div>
            <p>count: {count}</p>
            <button onClick={() => setCount(count + 1)}>update count</button>
        </div>
    )
}

export default App
```

### 小结

能够说出对 useEffect 第 2 个参数几种写法所代表的含义，例如不写第二个参数、写空数组、或者 `[count]` 分别表示什么意思？

```jsx
// 触发时机：第一次渲染会执行，任何数据变化导致组件更新时执行，相当于 componentDidMount + ComponentDidUpdate
useEffect(() => {})

// 触发时机：只在组件第一次渲染时执行，相当于 componentDidMount
useEffect(() => {}, [])

// 触发时机：第一次渲染会执行，当 count 变化时会再次执行，相当于 componentDidMount + componentDidUpdate(判断)
useEffect(() => {}, [count])
```

## 倒计时 📝

### 目标

把前面学习的两个 Hook 结合起来使用，完成打开页面进行倒计时的效果。

![djs](https://picgo-any.oss-cn-shanghai.aliyuncs.com/img/202207210936969.gif)

### 一个问题

先点击按钮开启定时器，再点击 +8 按钮，10s 后输出的结果是什么？

```jsx
import React, { useState } from 'react'

export default function App() {
    const [count, setCount] = useState(10)
    const startTime = () => {
        setTimeout(() => {
            // debugger
            console.log(count)
        }, 10000)
    }
    return (
        <div>
            <h3>{count}</h3>
            <button onClick={() => setCount(count + 8)}>+8</button>
            <button onClick={startTime}>开启定时器</button>
        </div>
    )
}
```

### 得出结论

由于先开启了定时器，形成了闭包，外部的 count 一直被定时器中的函数引用着，“不敢”释放，所以<font color=e32d40>**定时器中的 count 永远是第一次被引用着的那个 count**</font>。

### 有问题的代码

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
    const [count, setCount] = useState(10)
    useEffect(() => {
        setInterval(() => {
            setCount(count - 1)
        }, 1000)
    }, []) // 定时器确实只想开启一次，所以使用了 []
    return (
        <div>
            <h3>{count}</h3>
        </div>
    )
}
```

### 解决方案

<span style="position:relative;top:-3px;">✍</span> setCount 的参数参数可以是一个回调函数，回调函数的参数表示上一次的状态。

```jsx
import React, { useState, useEffect } from 'react'

export default function App() {
    const [count, setCount] = useState(10)
    useEffect(() => {
        setInterval(() => {
            setCount((count) => count - 1)
        }, 1000)
    }, [])
    return (
        <div>
            <h3>{count}</h3>
        </div>
    )
}
```

### 小结

完成这个案例最核心的一行代码是什么？

