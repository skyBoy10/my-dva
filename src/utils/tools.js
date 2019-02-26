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
 * 数组扁平化，[1, [2, 3, 5], [[3, 4]], []]
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
 * 数组扁平化，利用es6的reduce
*/
function flattenEs6(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}