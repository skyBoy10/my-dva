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