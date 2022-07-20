# 是否所有函数是否都有 prototype

## 首先我们先理清，`__proto__`、`prototype`、`constructor`

1. `__proto__`和`constructor`属性是对象所独有的。
2. `prototype`属性是函数所独有的。但是由于`JS`中函数也是一种对象，所以函数也拥有`__proto__`和`constructor`属性。

`__proto__`属性都是由一个对象指向一个对象，即指向它们的原型对象（也可以理解为父对象）

`constructor`属性也是对象才拥有的，它是从一个对象指向一个函数，含义就是指向该对象的构造函数

`prototype`属性，它是函数所独有的，它是从一个函数指向一个对象。它的含义是函数的原型对象，也就是用这个构造函数创建的实例的原型对象

**每个对象都有构造函数**是指每个对象都可以找到其对应的`constructor`，

这个`constructor`可能是对象自己本身显式定义的或者通过`__proto__`在原型链中找到的

**而单从`constructor`这个属性来讲，只有`prototype`对象才有。**

```js
函数创建的对象.__proto__ === 该函数.prototype

该函数.prototype.constructor === 该函数本身
```

**这里总结几点**

1. 我们需要牢记两点：
   1.  `__proto__` 和 `constructor`属性是**对象**所独有的。
   2.  `prototype` 属性是**函数**所独有的，因为函数也是一种对象，所以函数也拥有`__proto__`和`constructor`属性。
2. `__proto__`属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的`__proto__`属性所指向的那个对象（父对象）里找，一直找，直到`__proto__`属性的**终点`null`**，再往上找就相当于在`null`上取值，会报错。通过`__proto__`属性将对象连接起来的**这条链路即我们所谓的原型链**。
3. `prototype`属性的**作用**就是让该函数所实例化的对象们都可以找到公用的属性和方法，即`f1.__proto__` === `Foo.prototype`。
4. `constructor`属性的含义就是**指向该对象的构造函数**，所有函数（此时看成对象了）最终的构造函数都指向 **`Function`**。

## [[prototype]]和prototype和`__proto__`

请注意！上面标题的第一个prototype外面有两层[]包裹！

```js
[[prototype]] !== prototype
```

**`[[prototype]]`是对象的私有属性**，而`prototype`却是只有函数才有的属性！

**`__proto__`是JS的非标准但许多浏览器实现的属性，即`[[prototype]]`**

- 也就是`someObject.[[Prototype]] === someObject.__proto__`，
- 当然如果你在控制台操作的话会报错，因为浏览器并没有实现`someObject.[[Prototype]]`这样的操作，
- 所以你如果非要验证的话请使用ES6支持的`Object.getPrototypeOf()`方法，即`Object.getPrototypeOf(someObject) === someObject.__proto__`。

::: tip

**所有`javascript`对象都有一个<font color=red>指向它的原型对象的内部链接</font>`[[prototype]]`，但只有函数对象才有`prototype`这个属性**

:::

## 那么是否所有函数是否都有 prototype？

首先我们看下常见的函数的 `prototype`

```js
// function 声明函数
function fun() {} 
console.log(fun.prototype); // {constructor: ƒ}

// 异步函数
async function Async() {} 
console.log(Async.prototype); // undefined

// 箭头函数
const arrow = () => {} 
console.log(arrow.prototype); // undefined

// 异步箭头函数
const arrowF = async () => {} 
console.log(arrowF.prototype); // undefined

// 表达式方式
const ConstFun = function() {} 
console.log(ConstFun.prototype); // {constructor: ƒ}
```

可以得知**箭头函数与异步函数**的 `prototype` 为 undefined。

不过他们没有 `prototype` 属性并不代表他们没有原型对象

```js
// 异步函数
async function Async() {} 
console.dir(Async.__proto__); // AsyncFunction

// 箭头函数
const arrow = () => {} 
console.dir(arrow.__proto__); // ƒ anonymous()
```

不过可以看到通过浏览器提供的`__proto__`是可以访问到原型对象的
