import React from 'react';

import './amount.less';

const cusAmount = props => {
    const { amount } = props;

    const getOldList = () => {
        const listStr = sessionStorage.getItem('amountList');

        if(listStr) {
            return JSON.parse(listStr);
        }

        return [];
    }

    const formatAmount = () => {
        if(amount <= 0) return [];
        const amtArr = `${amount}`.split('');
        const oldList = getOldList(amtArr);
        const result = [];

        for(let i = 0; i < amtArr.length; i += 1) {
            if((i + 1) % 3) {
                result.push({
                    index: i,
                    amountStr: amtArr[i],
                });
                continue;
            }

            result.push({
                index: i,
                amountStr: amtArr[i],
            });

            if(amtArr.length > (i + 1)) {
                result.push({
                    id: 'm' + 1000 + i,
                    index: 0 - i,
                    amountStr: ','
                });
            }
        }

        const resArr = result.map((item, index) => {
            return {
                id: oldList.length <= 0 || oldList.length - 1 < index || oldList[index].amountStr != item.amountStr ? Math.round(Math.random() * 1000) : oldList[index].id,
                index: index,
                amountStr: item.amountStr,
            }
        });

        sessionStorage.setItem('amountList', JSON.stringify(resArr));
        return resArr;
    }

    const list = formatAmount();

    return (
        <div className='cus-amount flex-row'>
            <span className='amount-item'>¥</span>
            {
                list.map(item => {
                    return (
                        <span className='amount-item' key={item.id}>
                            <span className={ item.index < 0 ? '' : 'amount-ani-in' }>
                                {item.amountStr}
                            </span>
                        </span>
                    );
                })
            }
        </div>
    )
}

export default cusAmount;