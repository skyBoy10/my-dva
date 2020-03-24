import { func } from "prop-types";

/** 
 * 性别处理
*/
export const formatGender = gender => {
    switch(gender) {
        case 1:
        case '1':
            return '男';
        case 2:
        case '2':
            return '女';
        default: 
            return '未知';
    }
};

/** 
 * 金额精度处理
*/
export const formatMoney = (amount, type, accuracy) => {
    let temp = amount ? amount.toFixed(accuracy) : '0.00';
    let moneyType = type ? type : 1;
    let formatAmount = amount ? temp.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") : '0.00';
    switch(moneyType) {
        case 1:
        case '1':
            return '￥' + formatAmount;
        case 2:
        case '2':
            return '$' + formatAmount;
        default:
            return formatAmount;
    }
}

/** 
 * 自定义promise
*/

function CusPromise(fn) {
    let state = 'pending',
        value = '',
        callbacks = [];
    
    this.then = onFulFilled => {
        return new CusPromise(resolve => {
            handle({
                onFulFilled: onFulFilled || null,
                resolve: resolve,
            });
        })
    };

    const handle = callback => {
        if(state === 'pending') {
            callbacks.push(callback);
            return;
        }

        if(!callback.onFulFilled) {
            callback.resolve(value);
            return;
        }

        let ret = callback.onFulFilled(value);
        callback.resolve(ret);
    };

    const resolve =  newValue => {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            const then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        state = 'fulfilled';
        value = newValue;
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                handle(callback);
            });
        }, 0);
    };

    fn(resolve);
};

/** 
 * 冒泡排序，优化1(记录交换的位置)
*/
export const bubbleSort = list => {
    let i = list.length - 1,
        pos = 0;
    
    while(i) {
        pos = 0; // 重置开始位置

        for(let j = 0; j < i; j++) {
            if(list[j] > list[j+1]) {
                let temp = list[j];
                list[j] = list[j+1];
                list[j+1] = temp;
                pos = j;
            }
        }

        i = pos;
    }
}


/**
 * 选择排序
 */
export const selectSort = arr => {
    let minIndex,temp = 0;
    for(let i = 0; i < arr.length - 1; i++) {
        minIndex = i;  //将当前下标定义为最小值下标
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                //如果有小于当前最小值的关键值,将此关键值的下标赋值给min
                minIndex = j;
            }
        }

        if(i !== minIndex) {
            ////若min不等于i，说明找到最小值，交换
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

/** 
 * 归并
*/
const merge = (left,right) => {
    let result = [];
    while(left.length > 0 && right.length > 0){
        if(left[0] <= right[0]) {
            //如果左边的数据小于右边的数据，将左边数据取出，放在新数组中
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while(left.length){
        result.push(left.shift());
    }

    while(right.length){
        result.push(right.shift());
    }

    return result;
}

/** 
 * 归并排序，分解数组为最小单位，然后对每个单位最比较，合并有序数组
*/
export const mergeSort = list => {
    let len = list.length;

    if(len < 2) {
        return list;
    }

    const mid = Math.floor(len / 2);
    const left = list.slice(0, mid);
    const right = list.slice(mid);

    return merge(mergeSort(left), mergeSort(right)); // 递归排序
}

/**
 *  二分查找，必须是有序数组
 */
export const binarySearch = (m,list) => {
    let position = -1;
    let start = 0, end = list.length - 1;
    let mid = 0;

    while(start <= end) {
        mid = Math.floor((start + end) / 2);
        if(m > list[mid]) {
            start = mid + 1;
        }else if(m < list[mid]){
            end = mid - 1;
        }else {
            position = mid;
            break;
        }
    }

    return position;
}

/** 
 * 全排列，对一个数组进行全排列
*/
export const permute = input => {
    let permArr = [],
    usedChars = [];

    function main(input){
      let i, ch;
      for (i = 0; i < input.length; i++) {
        ch = input.splice(i, 1)[0];
        usedChars.push(ch);

        if (input.length === 0) {
          permArr.push(usedChars.slice());
        }

        main(input);
        input.splice(i, 0, ch);
        usedChars.pop();
      }

      return permArr;
    }

    return main(input);
};

/** 
 * 数组扁平化，[1, [2, 3, 5], [[3, 4]], [];
 * 数组的扁平化还可以直接使用toString方法
*/
export const flatten = (arr, result = []) => {
    for (let item of arr) {
        if (Array.isArray(item))
            flatten(item, result)
        else
            result.push(item)
    }

    return result;
}

/**
 * 使用es6对数组进行扁平化
 * @param {*} arr 
 */
export const cusFlattenArr = arr => {
    if (arr && arr.length === 0) {
        return [];
    }

    return arr.reduce((pre, item) => {
        return pre.concat(Array.isArray(item) ? cusFlattenArr(item) : item);
    }, []);
}

Array.prototype.cusFilter = (fn) => {
    const arr = this;
    const len = arr.length;
    const result = [];
    for (let i = 0; i < len; i += 1) {
        if (fn(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }

    return result;
}

/*
    判断一个变量的类型，包括基础数据类型，引用类型；typeof 对基础数据类型还好用，但是对引用类型就不行，对象返回的全是“object”，函数返回的是“function”；
    所以，对引用类型一般都用，instanceof，他的实现原理是根据原型链查找；
    也可以通过原生js的一个api进行判断，Object.prototype.toString.call(变量)；
 */

 /**
  * 防抖
  */

function douce (fn, delay = 1000) {
    let timer;

    return () => {
        if (timer) {
            clearTimeout(timer);
        }
    
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}

/**
 * 节流
 */

function throttle (fn, delay = 1000) {
    let timer;

    return () => {
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}

/**
 * 不使用Generator创建迭代器，创建自定义迭代器
 */

 function cusIterator(arr = []) {
     let index = 0;

     return {
         next: () => {
            const done = index >= arr.length;
            const value = !done ? arr[index++] : undefined;

            return {
                done,
                value
            };
         }
     };
 }

/**
 * 深度优先遍历，首先从一个违背访问的节点v，依次遍历所有和该节点相通深度优先的节点，直至都被访问。
 * 然后往复循环另一个未被访问的节点。实现如下
 */

 function deepRecursion(nodes, result = []) {
    if (nodes) {
        const children = nodes.children;
        result.push(nodes);

        for (let i = 0; i < children.length; i += 1) {
            if (children[i].children) {
                deepRecursion(children[i].children, result);
                return;
            }

            result.push(children[i].children);
        }
    }

    return result;
 }

 /**
  * ajax的原生写法
  */

 export const cusAjax = () => {
    return {
        get: (url, fn) => {
            const req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.onreadystatechange = () => {
                // readyState值为4说明已经完成请求
                if (req.readyState === 4 && req.status === 200 || req.status === 304) {
                    fn.call(this, req.responseText);
                }
            };

            req.send();
        },
        post: (url, param, fn) => {
            const req = new XMLHttpRequest();
            req.open("POST", url, true);
            req.setRequestHeader("Content-Type", "application/json;utf-8");
            
            req.onreadystatechange = () => {
                // readyState值为4说明已经完成请求
                if (req.readyState === 4 && req.status === 200 || req.status === 304) {
                    fn.call(this, req.responseText);
                }
            };

            req.send(param);
        }
    };
 }

 /**
  * 函数的柯里化，柯里化又称部分求值，字面意思就是不会立刻求值，而是到了需要的时候再去求值。a(1,3)(2)
  * 得到的值是6；其中arguments.callee返回的是当前执行函数的函数体；匿名函数经常使用；
  */
 const sum = function() { 
    let arrs = [];
    return function() {
        if (arguments.length === 0) {
            if (arrs.length === 0) {
              return 0;
          }
  
          return arrs.reduce((pre, item) => { return pre + item; });
      }
      
      arrs.push(...arguments);
      return arguments.callee;
    };
  }


  /**
   * 深copy
   */

  function deepClone(source) {
    if (typeof source !== 'object' || source == null) {
      return source;
    }
    
    const target = Array.isArray(source) ? [] : {};
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] === 'object' && source[key] !== null) {
          target[key] = deepClone(source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
    return target;
  }

  /**
   * 下面的涉及到this的指向，this根据的指向，根据this所在执行环境决定，不过函数内部的变量，是根据函数声明所在的环境决定；
   */
var inner = '0-1';
function say() { 
  console.log(inner);
  console.log(this.inner);
};

var obj1 = (function() { 
  var inner = '1-1';
  return { 
    inner: '1-2',
    say: function() { 
      console.log(inner);
      console.log(this.inner);
    }
  };
})();

var obj2 = (function() { 
  var inner = '2-1';
  return { 
    inner: '2-2',
    say: function() { 
      console.log(inner);
      console.log(this.inner);
    }
  }
})();


say();
obj1.say();
obj2.say();
obj1.say = say;
obj1.say();
obj1.say = obj2.say;
obj1.say();