# JavaScript高级

## 1-面向过程与面向对象

### 1-1面向过程

- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了。

### 1-2面向对象

- 面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

### 1-3面向过程与面向对象对比
| 
 | 面向过程 | 面向对象 |
| --- | --- | --- |
| 优点 | 性能比面向对象高，适合跟硬件联系很紧密的东西，例如单片机就采用的面向过程编程。 | 易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护 |
| 缺点 | 不易维护、不易复用、不易扩展 | 性能比面向过程低 |


## 2-对象与类

### 2-1对象

对象是由属性和方法组成的：是一个无需键值对的集合,指的是一个具体的事物

- 属性：事物的特征，在对象中用属性来表示（常用名词）
- 方法：事物的行为，在对象中用方法来表示（常用动词）

### 2-2类

- 在 ES6 中新增加了类的概念，可以使用 class 关键字声明一个类，之后以这个类来实例化对象。类抽象了对象的公共部分，它泛指某一大类（class）对象特指某一个，通过类实例化一个具体的对象

#### 2-2-1创建类

```javascript
//步骤1 使用class关键字
class name {
  // class body
}     
//步骤2使用定义的类创建实例  注意new关键字
var xx = new name();
```

#### 2-2-2类创建添加属性和方法

```javascript
//步骤1 使用class关键字
class Person {
  constructor(name,age) {   // constructor 构造器或者构造函数
      this.name = name;
      this.age = age;
    }/------------------------------------------->注意,方法与方法之间不需要添加逗号
   say() {
      console.log(this.name + '你好');
   }
}       

//步骤2使用定义的类创建实例  注意new关键字
var ldh = new Person('刘德华', 18); 
ldh.say()
```

**注意哟:**

1. 通过class 关键字创建类, 类名我们还是习惯性定义首字母大写
2. 类里面有个constructor 函数,可以接受传递过来的参数,同时返回实例对象
3. constructor 函数 只要 new 生成实例时,就会自动调用这个函数, 如果我们不写这个函数,类也会自动生成这个函数
4. 多个函数方法之间不需要添加逗号分隔
5. 生成实例 new 不能省略
6. 语法规范, 创建类 类名后面不要加小括号,生成实例 类名后面加小括号, 构造函数不需要加function

#### 2-2-3类的继承

- 语法

```javascript
// 父类
class Father{   
} 

// 子类继承父类
class  Son extends Father {  
}
```

- 示例

```javascript
class Father {
      constructor(surname) {
        this.surname= surname;
      }
      say() {
        console.log('你的姓是' + this.surname);
       }
}

class Son extends Father{  // 这样子类就继承了父类的属性和方法
}
var damao= new Son('刘');
damao.say();      //结果为 你的姓是刘
```

-  子类使用super关键字访问父类的方法 
**注意:** 
```javascript
//定义了父类
class Father {
   constructor(x, y) {
   this.x = x;
   this.y = y;
   }
   sum() {
   console.log(this.x + this.y);
	}
 }
//子元素继承父类
    class Son extends Father {
   		 constructor(x, y) {
    		super(x, y); //使用super调用了父类中的构造函数
    	}
    }
    var son = new Son(1, 2);
    son.sum(); //结果为3
```

   1.  继承中,如果实例化子类输出一个方法,先看子类有没有这个方法,如果有就先执行子类的 
   1.  继承中,如果子类里面没有,就去查找父类有没有这个方法,如果有,就执行父类的这个方法(就近原则) 
   1.  如果子类想要继承父类的方法,同时在自己内部扩展自己的方法,利用super 调用父类的构造函数,super 必须在子类this之前调用  
```javascript
 // 父类有加法方法
 class Father {
   constructor(x, y) {
   this.x = x;
   this.y = y;
   }
   sum() {
   console.log(this.x + this.y);
   }
 }
 // 子类继承父类加法方法 同时 扩展减法方法
 class Son extends Father {
   constructor(x, y) {
   // 利用super 调用父类的构造函数 super 必须在子类this之前调用,放到this之后会报错
   super(x, y);
   this.x = x;
   this.y = y;

  }
  subtract() {
  console.log(this.x - this.y);
  }
}
var son = new Son(5, 3);
son.subtract();
son.sum();
```

   4.  时刻注意this的指向问题,类里面的共有的属性和方法一定要加this使用. 
      1. constructor中的this指向的是new出来的实例对象
      1. 自定义的方法,一般也指向的new出来的实例对象
      1. 绑定事件之后this指向的就是触发事件的事件源
   5.  在 ES6 中类没有变量提升，所以必须先定义类，才能通过类实例化对象  ![img1.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188888116-ed1e893e-4e86-46aa-8183-e2225afd9d6f.png#clientId=ueb26b788-40da-4&from=ui&id=u4d65d860&margin=%5Bobject%20Object%5D&name=img1.png&originHeight=349&originWidth=692&originalType=binary&ratio=1&size=45416&status=done&style=none&taskId=u2344d983-b606-41b6-9967-a91dfd853bb)
## ![img2.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188895770-0e5bbd82-331a-4640-9167-5bc9cfb797d0.png#clientId=ueb26b788-40da-4&from=ui&id=u458e6138&margin=%5Bobject%20Object%5D&name=img2.png&originHeight=388&originWidth=673&originalType=binary&ratio=1&size=51605&status=done&style=none&taskId=u7126d597-1481-48f1-9e3f-dca54012994)

## 3-面向对象版tab 栏切换

### 3-1功能需求

1. 点击 tab栏,可以切换效果.
2. 点击 + 号, 可以添加 tab 项和内容项.
3. 点击 x 号, 可以删除当前的tab项和内容项.
4. 双击tab项文字或者内容项文字可以修改里面的文字内容

### 3-2案例准备

1. 获取到标题元素
2. 获取到内容元素
3. 获取到删除的小按钮 x号
4. 新建js文件,定义类,添加需要的属性方法(切换,删除,增加,修改)
5. 时刻注意this的指向问题

### 3-3 切换

-  为获取到的标题绑定点击事件,展示对应的内容区域,存储对应的索引  
```javascript
 this.lis[i].index = i;
 this.lis[i].onclick = this.toggleTab;
```

-  使用排他,实现只有一个元素的显示  
```javascript
 toggleTab() {
   //将所有的标题与内容类样式全部移除
     for (var i = 0; i < this.lis.length; i++) {
     this.lis[i].className = '';
     this.sections[i].className = '';
     }
   //为当前的标题添加激活样式
     this.className = 'liactive';
    //为当前的内容添加激活样式
     that.sections[this.index].className = 'conactive';
  }
```

### 3-4添加

-  为添加按钮+ 绑定点击事件  
```javascript
 this.add.onclick = this.addTab;
```

-  实现标题与内容的添加,做好排他处理  
```javascript
addTab() {
    that.clearClass();
    // (1) 创建li元素和section元素 
    var random = Math.random();
    var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi">				</span></li>';
    var section = '<section class="conactive">测试 ' + random + '</section>';
    // (2) 把这两个元素追加到对应的父元素里面
    that.ul.insertAdjacentHTML('beforeend', li);
    that.fsection.insertAdjacentHTML('beforeend', section);
    that.init();
    }
```

### 3-5删除

-  为元素的删除按钮x绑定点击事件  
```javascript
 this.remove[i].onclick = this.removeTab;
```

-  获取到点击的删除按钮的所在的父元素的所有,删除对应的标题与内容  
```javascript
 removeTab(e) {
     e.stopPropagation(); // 阻止冒泡 防止触发li 的切换点击事件
     var index = this.parentNode.index;
     console.log(index);
     // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
     that.lis[index].remove();
     that.sections[index].remove();
     that.init();
     // 当我们删除的不是选中状态的li 的时候,原来的选中状态li保持不变
     if (document.querySelector('.liactive')) return;
     // 当我们删除了选中状态的这个li 的时候, 让它的前一个li 处于选定状态
     index--;
     // 手动调用我们的点击事件  不需要鼠标触发
     that.lis[index] && that.lis[index].click();
 }
```

### 3-6编辑

-  为元素(标题与内容)绑定双击事件  
```javascript
 this.spans[i].ondblclick = this.editTab;
 this.sections[i].ondblclick = this.editTab;
```

-  在双击事件处理文本选中状态,修改内部DOM节点,实现新旧value值的传递  
```javascript
editTab() {
    var str = this.innerHTML;
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : 				    document.selection.empty();
    // alert(11);
      this.innerHTML = '<input type="text" />';
      var input = this.children[0];
      input.value = str;
      input.select(); // 文本框里面的文字处于选定状态
      // 当我们离开文本框就把文本框里面的值给span 
      input.onblur = function() {
      this.parentNode.innerHTML = this.value;
      };
      // 按下回车也可以把文本框里面的值给span
      input.onkeyup = function(e) {
      if (e.keyCode === 13) {
      // 手动调用表单失去焦点事件  不需要鼠标离开操作
      this.blur();
      }
    }
}
```

## 1.构造函数和原型

### 1.1对象的三种创建方式--复习

1.  字面量方式  
```javascript
var obj = {};
```

2.  new关键字  
```javascript
var obj = new Object();
```

3.  构造函数方式  
```javascript
function Person(name,age){
  this.name = name;
  this.age = age;
}
var obj = new Person('zs',12);
```

**new 干了什么**

1. 先在内存中创建一个空对象
2. 将构造函数中的 this 指向这个空对象
3. 进入函数体执行代码
4. 构造函数中有一个看不见的返回值 this

如果在构造函数写入一个return ，他的返回值是一个 基本数据类型 则忽略，该构造函数还是返回 this

如果在构造函数写入一个return ，他的返回值是一个 引用数据类型 则返回改引用数据类型

### 1.2静态成员和实例成员

#### 实例成员

实例成员就是构造函数内部通过this添加的成员 如下列代码中uname age sing 就是实例成员,实例成员只能通过实例化的对象来访问

```javascript
 function Star(uname, age) {
     this.uname = uname;
     this.age = age;
     this.sing = function() {
     console.log('我会唱歌');
    }
}
var ldh = new Star('刘德华', 18);
console.log(ldh.uname);//实例成员只能通过实例化的对象来访问
```

#### 静态成员

静态成员 在构造函数本身上添加的成员  如下列代码中 sex 就是静态成员,静态成员只能通过构造函数来访问

```javascript
 function Star(uname, age) {
     this.uname = uname;
     this.age = age;
     this.sing = function() {
     console.log('我会唱歌');
    }
}
Star.sex = '男';
var ldh = new Star('刘德华', 18);
console.log(Star.sex);//静态成员只能通过构造函数来访问
```

### 1.3构造函数的问题

构造函数方法很好用，但是存在浪费内存的问题。

![img3.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188909169-691fa2aa-b4fe-4257-ad60-640e93d1f885.png#clientId=ueb26b788-40da-4&from=ui&id=u7f1ffe6a&margin=%5Bobject%20Object%5D&name=img3.png&originHeight=488&originWidth=1292&originalType=binary&ratio=1&size=49998&status=done&style=none&taskId=u97277293-6418-4e3b-9edc-87090982d67)

### 1.4构造函数原型prototype

构造函数通过原型分配的函数是所有对象所共享的。

JavaScript 规定，每一个构造函数都有一个prototype 属性，指向另一个对象。注意这个prototype就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有。

我们可以把那些不变的方法，直接定义在 prototype 对象上，这样所有对象的实例就可以共享这些方法。

### 1.5对象原型

```html
对象都会有一个属性 __proto__ 指向构造函数的 prototype 原型对象，之所以我们对象可以使用构造函数 prototype 原型对象的属性和方法，就是因为对象有 __proto__ 原型的存在。
__proto__对象原型和原型对象 prototype 是等价的
__proto__对象原型的意义就在于为对象的查找机制提供一个方向，或者说一条路线，但是它是一个非标准属性，因此实际开发中，不可以使用这个属性，它只是内部指向原型对象 prototype
```

![img4.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188919183-365a40e1-d7d4-403c-a30e-46ce66121ba2.png#clientId=ueb26b788-40da-4&from=ui&id=u534bb6cb&margin=%5Bobject%20Object%5D&name=img4.png&originHeight=333&originWidth=1050&originalType=binary&ratio=1&size=26374&status=done&style=none&taskId=u75d3ece9-aa87-4d5b-a2db-0a3c04c8512)

![img5.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188953362-ffbb95ca-1200-40d7-ba19-56f2e30312a3.png#clientId=ueb26b788-40da-4&from=ui&id=ucfe1b527&margin=%5Bobject%20Object%5D&name=img5.png&originHeight=465&originWidth=918&originalType=binary&ratio=1&size=78508&status=done&style=none&taskId=ucb3f446b-0940-41b7-9aed-35999572958)

### 1.6constructor构造函数

它是对象必有的属性，因此普通对象和函数都具有constructor属性
该属性指向(等于)构造此对象的函数。
**记住这里，这个属性指向一个函数！！！！也可以说，这个属性就是一个函数**

```html
对象原型（ __proto__）和构造函数（prototype）原型对象里面都有一个属性 constructor 属性 ，constructor 我们称为构造函数，因为它指回构造函数本身。
constructor 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。
一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 constructor  就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个 constructor 指向原来的构造函数。
```

如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数如:

```javascript
 function Star(uname, age) {
     this.uname = uname;
     this.age = age;
 }
 // 很多情况下,我们需要手动的利用constructor 这个属性指回 原来的构造函数
 Star.prototype = {
 // 如果我们修改了原来的原型对象,给原型对象赋值的是一个对象,则必须手动的利用constructor指回原来的构造函数
   constructor: Star, // 手动设置指回原来的构造函数
   sing: function() {
     console.log('我会唱歌');
   },
   movie: function() {
     console.log('我会演电影');
   }
}
var zxy = new Star('张学友', 19);
```

### 1.7构造函数实例和原型对象三角关系

```javascript
1.构造函数的prototype属性指向了构造函数原型对象
2.实例对象是由构造函数创建的,实例对象的__proto__属性指向了构造函数的原型对象
3.构造函数的原型对象的constructor属性指向了构造函数,实例对象的原型的constructor属性也指向了构造函数
```

![img6.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188961152-1c537b25-8080-477e-a244-cb14b51064b2.png#clientId=ueb26b788-40da-4&from=ui&id=uce1e37ab&margin=%5Bobject%20Object%5D&name=img6.png&originHeight=517&originWidth=1080&originalType=binary&ratio=1&size=33832&status=done&style=none&taskId=ub3098800-fd60-4538-9903-aa68dd132b3)

### 1.8原型链和成员的查找机制

任何对象都有原型对象,也就是prototype属性,任何原型对象也是一个对象,该对象就有**proto**属性,这样一层一层往上找,就形成了一条链,我们称此为原型链;

```html
   当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。
如果没有就查找它的原型（也就是 __proto__指向的 prototype 原型对象）。
如果还没有就查找原型对象的原型（Object的原型对象）。
依此类推一直找到 Object 为止（null）。
__proto__对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线。
```

### 1.9原型对象中this指向

不管构造函数中的this还是原型对象的this,都指向我们new出来的实例对象

### 1.10通过原型为数组扩展内置方法

```javascript
 Array.prototype.sum = function() {
   var sum = 0;
   for (var i = 0; i < this.length; i++) {
   sum += this[i];
   }
   return sum;
 };
 //此时数组对象中已经存在sum()方法了  可以始终 数组.sum()进行数据的求
```

## 2.继承

### 2.1call()

- call()可以调用函数
- call()可以修改this的指向,使用call()的时候 参数一是修改后的this指向,参数2,参数3..使用逗号隔开连接

```javascript
 function fn(x, y) {
     console.log('我想喝手磨咖啡');
     console.log(this);
     console.log(x + y);
}
  var o = {
  	name: 'andy'
  };
  // fn();
  // 1. call() 可以调用函数
  // fn.call();
  // 2. call() 可以改变这个函数的this指向 此时这个函数的this 就指向了o这个对象
  fn.call(o, 1, 2);
```

### 2.2子构造函数继承父构造函数中的属性

1. 先定义一个父构造函数
2. 再定义一个子构造函数
3. 子构造函数继承父构造函数的属性(使用call方法)

```javascript
 // 1. 父构造函数
 function Father(uname, age) {
   // this 指向父构造函数的对象实例
   this.uname = uname;
   this.age = age;
 }
  // 2 .子构造函数 
function Son(uname, age, score) {
  // this 指向子构造函数的对象实例
  3.使用call方式实现子继承父的属性
  Father.call(this, uname, age);
  this.score = score;
}
var son = new Son('刘德华', 18, 100);
console.log(son);
```

### 2.3借用原型对象继承方法

1. 先定义一个父构造函数
2. 再定义一个子构造函数
3. 子构造函数继承父构造函数的属性(使用call方法)

```javascript
// 1. 父构造函数
function Father(uname, age) {
  // this 指向父构造函数的对象实例
  this.uname = uname;
  this.age = age;
}
Father.prototype.money = function() {
  console.log(100000);
 };
 // 2 .子构造函数 
  function Son(uname, age, score) {
      // this 指向子构造函数的对象实例
      Father.call(this, uname, age);
      this.score = score;
  }
// Son.prototype = Father.prototype;  这样直接赋值会有问题,如果修改了子原型对象,父原型对象也会跟着一起变化
  Son.prototype = new Father();
  // 如果利用对象的形式修改了原型对象,别忘了利用constructor 指回原来的构造函数
  Son.prototype.constructor = Son;
  // 这个是子构造函数专门的方法
  Son.prototype.exam = function() {
    console.log('孩子要考试');

  }
  var son = new Son('刘德华', 18, 100);
  console.log(son);
```

## 3.ES5新增方法

### 3.1数组方法forEach遍历数组

```javascript
 arr.forEach(function(value, index, array) {
       //参数一是:数组元素
       //参数二是:数组元素的索引
       //参数三是:当前的数组
 })
  //相当于数组遍历的 for循环 没有返回值
```

### 3.2数组方法filter过滤数组

```javascript
  var arr = [12, 66, 4, 88, 3, 7];
  var newArr = arr.filter(function(value, index,array) {
  	 //参数一是:数组元素
     //参数二是:数组元素的索引
     //参数三是:当前的数组
     return value >= 20;
  });
  console.log(newArr);//[66,88] //返回值是一个新数组
```

### 3.3数组方法some

```javascript
some 查找数组中是否有满足条件的元素 
 var arr = [10, 30, 4];
 var flag = arr.some(function(value,index,array) {
    //参数一是:数组元素
     //参数二是:数组元素的索引
     //参数三是:当前的数组
     return value < 3;
  });
console.log(flag);//返回值是布尔值,只要查找到满足条件的一个元素就立马终止循环
```

### 3.4 数组方法 reduce

**reducer** 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

**reducer** 函数的返回值分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

```javascript
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
},0);
```

## 3.4筛选商品案例

1.  定义数组对象数据  
```javascript
var data = [{
            id: 1,
            pname: '小米',
            price: 3999
        }, {
            id: 2,
            pname: 'oppo',
            price: 999
        }, {
            id: 3,
            pname: '荣耀',
            price: 1299
        }, {
            id: 4,
            pname: '华为',
            price: 1999
        }, ];
```

2.  使用forEach遍历数据并渲染到页面中  
```javascript
data.forEach(function(value) {
  var tr = document.createElement('tr');
  tr.innerHTML = '<td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td>';
  tbody.appendChild(tr);
 });
```

3.  根据价格筛选数据 
   1.  获取到搜索按钮并为其绑定点击事件  
```javascript
search_price.addEventListener('click', function() {
});
```

   2.  使用filter将用户输入的价格信息筛选出来  
```javascript
search_price.addEventListener('click', function() {
      var newDate = data.filter(function(value) {
        //start.value是开始区间
        //end.value是结束的区间
      	return value.price >= start.value && value.price <= end.value;
      });
      console.log(newDate);
 });
```

   3.  将筛选出来的数据重新渲染到表格中 
      1.  将渲染数据的逻辑封装到一个函数中  
```javascript
function setDate(mydata) {
      // 先清空原来tbody 里面的数据
  tbody.innerHTML = '';
  mydata.forEach(function(value) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + value.id + '</td><td>' + value.pname + '</td><td>' + value.price + '</td>';
      tbody.appendChild(tr);
  });
 }
```

      2.  将筛选之后的数据重新渲染  
```javascript
 search_price.addEventListener('click', function() {
     var newDate = data.filter(function(value) {
     return value.price >= start.value && value.price <= end.value;
     });
     console.log(newDate);
     // 把筛选完之后的对象渲染到页面中
     setDate(newDate);
});
```

   4.  根据商品名称筛选 
      1.  获取用户输入的商品名称 
      1.  为查询按钮绑定点击事件,将输入的商品名称与这个数据进行筛选  
```javascript
 search_pro.addEventListener('click', function() {
     var arr = [];
     data.some(function(value) {
       if (value.pname === product.value) {
         // console.log(value);
         arr.push(value);
         return true; // return 后面必须写true  
       }
     });
     // 把拿到的数据渲染到页面中
     setDate(arr);
})
```

### 3.5some和forEach区别

- 如果查询数组中唯一的元素, 用some方法更合适,在some 里面 遇到 return true 就是终止遍历 迭代效率更高
- 在forEach 里面 return 不会终止迭代

### 3.6trim方法去除字符串两端的空格

```javascript
var str = '   hello   '
console.log(str.trim()）  //hello 去除两端空格
var str1 = '   he l l o   '
console.log(str.trim()）  //he l l o  去除两端空格
```

### 3.7获取对象的属性名

Object.keys(对象) 获取到当前对象中的属性名 ，返回值是一个数组

```javascript
 var obj = {
     id: 1,
     pname: '小米',
     price: 1999,
     num: 2000
};
var result = Object.keys(obj)
console.log(result)//[id，pname,price,num]
```

### 3.8 Object.defineProperty

Object.defineProperty设置或修改对象中的属性

```javascript
Object.defineProperty(对象，修改或新增的属性名，{
                      
		value:修改或新增的属性的值,
                      
		writable:true/false,//如果值为false 不允许修改这个属性值
                      
		enumerable: false,//enumerable 如果值为false 则不允许遍历
                      
    configurable: false  //configurable 如果为false 则不允许删除这个属性 属性是否可以被删除或是否可以再次修改特性
                      
    get(value){
  			// 当有人读取了数据就会调用该函数  且返回值就是 修改或新增的属性名，其中 value 就是被读取的属性
		}

		set(value){
      // 当有人修改了数据就会调用该函数  且收到修改的具体值，其中 value 就是被修改的属性
    }
})
```

## 1.函数的定义和调用

### 1.1函数的定义方式

1.  方式1 函数声明方式 function 关键字 (命名函数)  
```javascript
function fn(){}
```

2.  方式2 函数表达式(匿名函数)  
```javascript
var fn = function(){}
```

3.  方式3 new Function()  
```javascript
var f = new Function('a', 'b', 'console.log(a + b)');
f(1, 2);

var fn = new Function('参数1','参数2'..., '函数体')
注意
/*Function 里面参数都必须是字符串格式
第三种方式执行效率低，也不方便书写，因此较少使用
所有函数都是 Function 的实例(对象)  
函数也属于对象
*/
```

### 1.2函数的调用

```javascript
/* 1. 普通函数 */
function fn() {
	console.log('人生的巅峰');
}
 fn(); 
/* 2. 对象的方法 */
var o = {
  sayHi: function() {
  	console.log('人生的巅峰');
  }
}
o.sayHi();
/* 3. 构造函数*/
function Star() {};
new Star();
/* 4. 绑定事件函数*/
 btn.onclick = function() {};   // 点击了按钮就可以调用这个函数
/* 5. 定时器函数*/
setInterval(function() {}, 1000);  这个函数是定时器自动1秒钟调用一次
/* 6. 立即执行函数(自调用函数)*/
(function() {
	console.log('人生的巅峰');
})();
```

## 2.this

### 2.1函数内部的this指向

这些 this 的指向，是当我们调用函数的时候确定的。调用方式的不同决定了this 的指向不同

一般指向我们的调用者.

![img7.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188975776-0722fba3-57ce-403e-8799-5dc04a68caa3.png#clientId=ueb26b788-40da-4&from=ui&id=ud342d278&margin=%5Bobject%20Object%5D&name=img7.png&originHeight=400&originWidth=1142&originalType=binary&ratio=1&size=87996&status=done&style=none&taskId=ub5ff7360-e73f-4ba6-a98b-19cb2cf0377)

### 2.2改变函数内部 this 指向

#### 2.2.1 call方法

call()方法调用一个对象。简单理解为调用函数的方式，但是它可以改变函数的 this 指向

应用场景:  经常做继承.

```javascript
var o = {
	name: 'andy'
}
 function fn(a, b) {
      console.log(this);
      console.log(a+b)
};
fn()// 此时的this指向的是window
fn.call(o,1,2)//此时的this指向的是对象o,参数使用逗号隔开
```

#### 2.2.2 apply方法

apply() 方法调用一个函数。简单理解为调用函数的方式，但是它可以改变函数的 this 指向。

应用场景:  经常跟数组有关系

```javascript
var o = {
	name: 'andy'
}
 function fn(a, b) {
      console.log(this);
      console.log(a+b)
};
fn()// 此时的this指向的是window
fn.apply(o,[1,2])//此时的this指向的是对象o,参数使用数组传递
```

#### 2.2.3 bind方法

bind() 方法不会调用函数,但是能改变函数内部this 指向,返回的是原函数改变this之后产生的新函数

如果只是想改变 this 指向，并且不想调用这个函数的时候，可以使用bind

应用场景:不调用函数,但是还想改变this指向

```javascript
 var o = {
 name: 'andy'
 };

function fn(a, b) {
	console.log(this);
	console.log(a + b);
};
var f = fn.bind(o, 1, 2); //此处的f是bind返回的新函数
f();//调用新函数  this指向的是对象o 参数使用逗号隔开
```

#### 2.2.4 call、apply、bind三者的异同

-  共同点 : 都可以改变this指向 
-  不同点: 
   - call 和 apply  会调用函数, 并且改变函数内部this指向.
   - call 和 apply传递的参数不一样,call传递参数使用逗号隔开,apply使用数组传递
   - bind  不会调用函数, 可以改变函数内部this指向.
-  应用场景 
   1. call 经常做继承.
   1. apply经常跟数组有关系.  比如借助于数学对象实现数组最大值最小值
   1. bind  不调用函数,但是还想改变this指向. 比如改变定时器内部的this指向.

## 3.严格模式

### 3.1什么是严格模式

JavaScript 除了提供正常模式外，还提供了严格模式（strict mode）。ES5 的严格模式是采用具有限制性 JavaScript变体的一种方式，即在严格的条件下运行 JS 代码。

严格模式在 IE10 以上版本的浏览器中才会被支持，旧版本浏览器中会被忽略。

严格模式对正常的 JavaScript 语义做了一些更改：

1.消除了 Javascript 语法的一些不合理、不严谨之处，减少了一些怪异行为。

2.消除代码运行的一些不安全之处，保证代码运行的安全。

3.提高编译器效率，增加运行速度。

4.禁用了在 ECMAScript 的未来版本中可能会定义的一些语法，为未来新版本的 Javascript 做好铺垫。比如一些保留字如：class,enum,export, extends, import, super 不能做变量名

### 3.2开启严格模式

严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为为脚本开启严格模式和为函数开启严格模式两种情况。

-  情况一 :为脚本开启严格模式 
   -  有的 script 脚本是严格模式，有的 script 脚本是正常模式，这样不利于文件合并，所以可以将整个脚本文件放在一个立即执行的匿名函数之中。这样独立创建一个作用域而不影响其他
script 脚本文件。  
```javascript
(function (){
  //在当前的这个自调用函数中有开启严格模式，当前函数之外还是普通模式
　　　　"use strict";
       var num = 10;
　　　　function fn() {}
})();
//或者 
<script>
  　"use strict"; //当前script标签开启了严格模式
</script>
<script>
  			//当前script标签未开启严格模式
</script>
```

-  情况二: 为函数开启严格模式 
   -  要给某个函数开启严格模式，需要把“use strict”;  (或 'use strict'; ) 声明放在函数体所有语句之前。  
```javascript
function fn(){
　　"use strict";
　　return "123";
} 
//当前fn函数开启了严格模式
```

### 3.3严格模式中的变化

严格模式对 Javascript 的语法和行为，都做了一些改变。

```javascript
'use strict'
num = 10 
console.log(num)//严格模式后使用未声明的变量
--------------------------------------------------------------------------------
var num2 = 1;
delete num2;//严格模式不允许删除变量
--------------------------------------------------------------------------------
function fn() {
 console.log(this); // 严格模式下全局作用域中函数中的 this 是 undefined
}
fn();  
---------------------------------------------------------------------------------
function Star() {
	 this.sex = '男';
}
// Star();严格模式下,如果 构造函数不加new调用, this 指向的是undefined 如果给他赋值则 会报错.
var ldh = new Star();
console.log(ldh.sex);
----------------------------------------------------------------------------------
setTimeout(function() {
  console.log(this); //严格模式下，定时器 this 还是指向 window
}, 2000);
```

[更多严格模式要求参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)

## 4.高阶函数

高阶函数是对其他函数进行操作的函数，它接收函数作为参数或将函数作为返回值输出。

![img8.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188984795-315f7b9f-4c81-4af3-be2b-64dc5c219535.png#clientId=ueb26b788-40da-4&from=ui&id=u5e296d93&margin=%5Bobject%20Object%5D&name=img8.png&originHeight=262&originWidth=1214&originalType=binary&ratio=1&size=12644&status=done&style=none&taskId=u60b5da3e-5987-4a47-a00d-3915bbaf70a)

此时fn 就是一个高阶函数

函数也是一种数据类型，同样可以作为参数，传递给另外一个参数使用。最典型的就是作为回调函数。

同理函数也可以作为返回值传递回来

## 5.闭包

### 5.1变量的作用域复习

变量根据作用域的不同分为两种：全局变量和局部变量。

1. 函数内部可以使用全局变量。
2. 函数外部不可以使用局部变量。
3. 当函数执行完毕，本作用域内的局部变量会销毁。

### 5.2什么是闭包

闭包（closure）指有权访问另一个函数作用域中变量的函数。简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。

![img9.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638188995188-74cb1460-3ef5-4bdc-bb63-cd11ff0baa04.png#clientId=ueb26b788-40da-4&from=ui&id=ucbf2ca67&margin=%5Bobject%20Object%5D&name=img9.png&originHeight=404&originWidth=1050&originalType=binary&ratio=1&size=13283&status=done&style=none&taskId=ue8c226a0-15f0-4888-a1fa-669b5f1c405)

### 5.3闭包的作用

作用：延伸变量的作用范围。

```javascript
 function fn() {
   var num = 10;
   function fun() {
       console.log(num);
 	}
    return fun;
 }
var f = fn();
f();
```

### 5.4闭包的案例

1. 利用闭包的方式得到当前li 的索引号

```javascript
for (var i = 0; i < lis.length; i++) {
// 利用for循环创建了4个立即执行函数
// 立即执行函数也成为小闭包因为立即执行函数里面的任何一个函数都可以使用它的i这变量
(function(i) {
    lis[i].onclick = function() {
      console.log(i);
    }
 })(i);
}
```

2. 闭包应用-3秒钟之后,打印所有li元素的内容

```javascript
 for (var i = 0; i < lis.length; i++) {
   (function(i) {
     setTimeout(function() {
     console.log(lis[i].innerHTML);
     }, 3000)
   })(i);
}
```

3. 闭包应用-计算打车价格

```javascript
/*需求分析
打车起步价13(3公里内),  之后每多一公里增加 5块钱.  用户输入公里数就可以计算打车价格
如果有拥堵情况,总价格多收取10块钱拥堵费*/

 var car = (function() {
     var start = 13; // 起步价  局部变量
     var total = 0; // 总价  局部变量
     return {
       // 正常的总价
       price: function(n) {
         if (n <= 3) {
           total = start;
         } else {
           total = start + (n - 3) * 5
         }
         return total;
       },
       // 拥堵之后的费用
       yd: function(flag) {
         return flag ? total + 10 : total;
       }
	}
 })();
console.log(car.price(5)); // 23
console.log(car.yd(true)); // 33
```

### 5.5案例

```javascript
 var name = "The Window";
   var object = {
     name: "My Object",
     getNameFunc: function() {
     return function() {
     return this.name;
     };
   }
 };
console.log(object.getNameFunc()())
-----------------------------------------------------------------------------------
var name = "The Window";　　
  var object = {　　　　
    name: "My Object",
    getNameFunc: function() {
    var that = this;
    return function() {
    return that.name;
    };
  }
};
console.log(object.getNameFunc()())
```

## 6.递归

### 6.1什么是递归

**递归：**如果一个函数在内部可以调用其本身，那么这个函数就是递归函数。简单理解:函数内部自己调用自己, 这个函数就是递归函数

**注意：**递归函数的作用和循环效果一样，由于递归很容易发生“栈溢出”错误（stack overflow），所以必须要加退出条件return。

### 6.2利用递归求1~n的阶乘

```javascript
//利用递归函数求1~n的阶乘 1 * 2 * 3 * 4 * ..n
 function fn(n) {
     if (n == 1) { //结束条件
       return 1;
     }
     return n * fn(n - 1);
 }
 console.log(fn(3));
```

### 6.3利用递归求斐波那契数列

```javascript
// 利用递归函数求斐波那契数列(兔子序列)  1、1、2、3、5、8、13、21...
// 用户输入一个数字 n 就可以求出 这个数字对应的兔子序列值
// 我们只需要知道用户输入的n 的前面两项(n-1 n-2)就可以计算出n 对应的序列值
function fb(n) {
  if (n === 1 || n === 2) {
        return 1;
  }
  return fb(n - 1) + fb(n - 2);
}
console.log(fb(3));
```

### 6.4利用递归遍历数据

```javascript
// 我们想要做输入id号,就可以返回的数据对象
 var data = [{
   id: 1,
   name: '家电',
   goods: [{
     id: 11,
     gname: '冰箱',
     goods: [{
       id: 111,
       gname: '海尔'
     }, {
       id: 112,
       gname: '美的'
     },

            ]

   }, {
     id: 12,
     gname: '洗衣机'
   }]
 }, {
   id: 2,
   name: '服饰'
}];
//1.利用 forEach 去遍历里面的每一个对象
 function getID(json, id) {
   var o = {};
   json.forEach(function(item) {
     // console.log(item); // 2个数组元素
     if (item.id == id) {
       // console.log(item);
       o = item;
       return o;
       // 2. 我们想要得里层的数据 11 12 可以利用递归函数
       // 里面应该有goods这个数组并且数组的长度不为 0 
     } else if (item.goods && item.goods.length > 0) {
       o = getID(item.goods, id);
     }
   });
   return o;
}
```

## 1.正则表达式概述

### 1.1什么是正则表达式

正则表达式（ Regular Expression ）是用于匹配字符串中字符组合的模式。在JavaScript中，正则表达式也是对象。

正则表通常被用来检索、替换那些符合某个模式（规则）的文本，例如验证表单：用户名表单只能输入英文字母、数字或者下划线， 昵称输入框中可以输入中文(匹配)。此外，正则表达式还常用于过滤掉页面内容中的一些敏感词(替换)，或从字符串中获取我们想要的特定部分(提取)等 。

其他语言也会使用正则表达式，本阶段我们主要是利用JavaScript 正则表达式完成表单验证。

### 1.2 正则表达式的特点

1. 灵活性、逻辑性和功能性非常的强。
2. 可以迅速地用极简单的方式达到字符串的复杂控制。
3. 对于刚接触的人来说，比较晦涩难懂。比如：^\w+([-+.]\w+)_@\w+([-.]\w+)_.\w+([-.]\w+)*$
4. 实际开发,一般都是直接复制写好的正则表达式. 但是要求会使用正则表达式并且根据实际情况修改正则表达式.   比如用户名:   /[[1]](#fn1){3,16}$/

## 2.正则表达式在js中的使用

### 2.1正则表达式的创建

在 JavaScript 中，可以通过两种方式创建一个正则表达式。

方式一：通过调用RegExp对象的构造函数创建

```javascript
var regexp = new RegExp(/123/);
console.log(regexp);
```

方式二：利用字面量创建 正则表达式

```javascript
 var rg = /123/;
```

### 2.2测试正则表达式

test() 正则对象方法，用于检测字符串是否符合该规则，该对象会返回 true 或 false，其参数是测试字符串。

```javascript
var rg = /123/;
console.log(rg.test(123));
console.log(rg.test('abc'));
```

## 3.正则表达式中的特殊字符

### 3.1正则表达式的组成

一个正则表达式可以由简单的字符构成，比如 /abc/，也可以是简单和特殊字符的组合，比如 /ab*c/ 。其中特殊字符也被称为元字符，在正则表达式中是具有特殊意义的专用符号，如 ^ 、$ 、+ 等。

特殊字符非常多，可以参考：

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

jQuery 手册：正则表达式部分

[正则测试工具]( <[http://tool.oschina.net/regex](http://tool.oschina.net/regex))

### 3.2边界符

正则表达式中的边界符（位置符）用来提示字符所处的位置，主要有两个字符

| 边界符 | 说明 |
| --- | --- |
| ^ | 表示匹配行首的文本（以谁开始） |
| $ | 表示匹配行尾的文本（以谁结束） |


如果 ^和 $ 在一起，表示必须是精确匹配。

```javascript
var rg = /abc/; // 正则表达式里面不需要加引号 不管是数字型还是字符串型
// /abc/ 只要包含有abc这个字符串返回的都是true
console.log(rg.test('abc'));
console.log(rg.test('abcd'));
console.log(rg.test('aabcd'));
console.log('---------------------------');
var reg = /^abc/;
console.log(reg.test('abc')); // true
console.log(reg.test('abcd')); // true
console.log(reg.test('aabcd')); // false
console.log('---------------------------');
var reg1 = /^abc$/; // 精确匹配 要求必须是 abc字符串才符合规范
console.log(reg1.test('abc')); // true
console.log(reg1.test('abcd')); // false
console.log(reg1.test('aabcd')); // false
console.log(reg1.test('abcabc')); // false
```

### 3.3字符类

字符类表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内。

#### 3.3.1 [] 方括号

表示有一系列字符可供选择，只要匹配其中一个就可以了

```javascript
var rg = /[abc]/; // 只要包含有a 或者 包含有b 或者包含有c 都返回为true
console.log(rg.test('andy'));//true
console.log(rg.test('baby'));//true
console.log(rg.test('color'));//true
console.log(rg.test('red'));//false
var rg1 = /^[abc]$/; // 三选一 只有是a 或者是 b  或者是c 这三个字母才返回 true
console.log(rg1.test('aa'));//false
console.log(rg1.test('a'));//true
console.log(rg1.test('b'));//true
console.log(rg1.test('c'));//true
console.log(rg1.test('abc'));//true
----------------------------------------------------------------------------------
var reg = /^[a-z]$/ //26个英文字母任何一个字母返回 true  - 表示的是a 到z 的范围  
console.log(reg.test('a'));//true
console.log(reg.test('z'));//true
console.log(reg.test('A'));//false
-----------------------------------------------------------------------------------
//字符组合
var reg1 = /^[a-zA-Z0-9]$/; // 26个英文字母(大写和小写都可以)任何一个字母返回 true  
------------------------------------------------------------------------------------
//取反 方括号内部加上 ^ 表示取反，只要包含方括号内的字符，都返回 false 。
var reg2 = /^[^a-zA-Z0-9]$/;
console.log(reg2.test('a'));//false
console.log(reg2.test('B'));//false
console.log(reg2.test(8));//false
console.log(reg2.test('!'));//true
```

#### 3.3.2量词符

量词符用来设定某个模式出现的次数。

| 量词 | 说明 |
| --- | --- |
| * | 重复0次或更多次 |
| + | 重复1次或更多次 |
| ? | 重复0次或1次 |
| {n} | 重复n次 |
| {n,} | 重复n次或更多次 |
| {n,m} | 重复n到m次 |


#### 3.3.3用户名表单验证

功能需求:

1. 如果用户名输入合法, 则后面提示信息为:  用户名合法,并且颜色为绿色
2. 如果用户名输入不合法, 则后面提示信息为:  用户名不符合规范, 并且颜色为红色

![img10.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638189007345-9b5206dc-9f78-4bca-9168-ba27a0ed8f01.png#clientId=ueb26b788-40da-4&from=ui&id=u35f1b7ba&margin=%5Bobject%20Object%5D&name=img10.png&originHeight=82&originWidth=389&originalType=binary&ratio=1&size=2057&status=done&style=none&taskId=u11238858-2430-48ed-8acc-517c07af525)

![img11.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638189014117-a794c5bd-3663-4317-808d-e03f307dcbb4.png#clientId=ueb26b788-40da-4&from=ui&id=ufa820d8f&margin=%5Bobject%20Object%5D&name=img11.png&originHeight=41&originWidth=391&originalType=binary&ratio=1&size=2373&status=done&style=none&taskId=u7c73f10c-19b9-4df7-b90c-286d7883f0c)

分析:

1. 用户名只能为英文字母,数字,下划线或者短横线组成, 并且用户名长度为6~16位.
2. 首先准备好这种正则表达式模式/$[a-zA-Z0-9-_]{6,16}^/
3. 当表单失去焦点就开始验证.
4. 如果符合正则规范, 则让后面的span标签添加 right类.
5. 如果不符合正则规范, 则让后面的span标签添加 wrong类.

```javascript
<input type="text" class="uname"> <span>请输入用户名</span>
 <script>
 //  量词是设定某个模式出现的次数
 var reg = /^[a-zA-Z0-9_-]{6,16}$/; // 这个模式用户只能输入英文字母 数字 下划线 中划线
 var uname = document.querySelector('.uname');
 var span = document.querySelector('span');
 uname.onblur = function() {
   if (reg.test(this.value)) {
   console.log('正确的');
   span.className = 'right';
   span.innerHTML = '用户名格式输入正确';
   } else {
   console.log('错误的');
   span.className = 'wrong';
   span.innerHTML = '用户名格式输入不正确';
   }
 }
</script>
```

#### 3.3.4 括号总结

1.大括号  量词符.  里面表示重复次数

2.中括号 字符集合。匹配方括号中的任意字符.

3.小括号表示优先级

[正则表达式在线测试](https://c.runoob.com/)

### 3.4预定义类

预定义类指的是某些常见模式的简写方式.

![img12.png](https://cdn.nlark.com/yuque/0/2021/png/22709658/1638189025061-0070be99-9825-4e30-b9d5-4f844972d8dd.png#clientId=ueb26b788-40da-4&from=ui&id=u42d13859&margin=%5Bobject%20Object%5D&name=img12.png&originHeight=338&originWidth=981&originalType=binary&ratio=1&size=76227&status=done&style=none&taskId=u5fc14775-1246-4d38-aeab-d9db0403f9a)

**案例:验证座机号码**

```javascript
var reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;
var reg = /^\d{3,4}-\d{7,8}$/;
```

**表单验证案例**

```javascript
//手机号验证:/^1[3|4|5|7|8][0-9]{9}$/;
//验证通过与不通过更换元素的类名与元素中的内容
 if (reg.test(this.value)) {
    // console.log('正确的');
    this.nextElementSibling.className = 'success';
    this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
   } else {
       // console.log('不正确');
      this.nextElementSibling.className = 'error';
      this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确,请从新输入 ';
 }
```

```javascript
//QQ号验证: /^[1-9]\d{4,}$/; 
//昵称验证:/^[\u4e00-\u9fa5]{2,8}$/
//验证通过与不通过更换元素的类名与元素中的内容 ,将上一步的匹配代码进行封装,多次调用即可
 function regexp(ele, reg) {
    ele.onblur = function() {
      if (reg.test(this.value)) {
        // console.log('正确的');
        this.nextElementSibling.className = 'success';
        this.nextElementSibling.innerHTML = '<i class="success_icon"></i> 恭喜您输入正确';
   } else {
     // console.log('不正确');
     this.nextElementSibling.className = 'error';
     this.nextElementSibling.innerHTML = '<i class="error_icon"></i> 格式不正确,请从新输入 ';
            }
        }
 };
```

```javascript
//密码验证:/^[a-zA-Z0-9_-]{6,16}$/
//再次输入密码只需匹配与上次输入的密码值 是否一致
```

### 3.5正则替换replace

replace() 方法可以实现替换字符串操作，用来替换的参数可以是一个字符串或是一个正则表达式。

```javascript
var str = 'andy和red';
var newStr = str.replace('andy', 'baby');
console.log(newStr)//baby和red
//等同于 此处的andy可以写在正则表达式内
var newStr2 = str.replace(/andy/, 'baby');
console.log(newStr2)//baby和red
//全部替换
var str = 'abcabc'
var nStr = str.replace(/a/,'哈哈')
console.log(nStr) //哈哈bcabc
//全部替换g
var nStr = str.replace(/a/a,'哈哈')
console.log(nStr) //哈哈bc哈哈bc
//忽略大小写i
var str = 'aAbcAba';
var newStr = str.replace(/a/gi,'哈哈')//"哈哈哈哈bc哈哈b哈哈"
```

**案例:过滤敏感词汇**

```javascript
<textarea name="" id="message"></textarea> <button>提交</button>
<div></div>
<script>
    var text = document.querySelector('textarea');
    var btn = document.querySelector('button');
    var div = document.querySelector('div');
    btn.onclick = function() {
    	div.innerHTML = text.value.replace(/激情|gay/g, '**');
    }
</script>
```
