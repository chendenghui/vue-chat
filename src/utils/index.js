
/**
     * 获取对应名称的cookie
     * @param name cookie的名称
     * @returns {null} 不存在时，返回null
     */
export function getCookie(cookieName) {
    const allcookies = document.cookie;
    let cookiePos = allcookies.indexOf(cookieName);   //索引的长度
    let value = null;
    // 如果找到了索引，就代表cookie存在，
    // 反之，就说明不存在。
    if (cookiePos !== -1) {
        // 把cookiePos放在值的开始，只要给值加1即可。
        cookiePos += cookieName.length + 1;      //这里容易出问题，所以请大家参考的时候自己好好研究一下
        let cookieEnd = allcookies.indexOf(';', cookiePos);

        if (cookieEnd === -1) {
            cookieEnd = allcookies.length;
        }
        value = unescape(allcookies.substring(cookiePos, cookieEnd));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
}

//获取url参数
export const getUrlParam = (paraName) => {
    const url = location.href;
    const arrObj = url.split('?');
    if (arrObj.length > 1) {
        const seachData = arrObj[1];
        const arrPara = seachData.split('&');
        let arr;
        for (let i = 0; i < arrPara.length; i = i + 1) {
            arr = arrPara[i].split('=');
            if (arr !== null && arr[0] === paraName) {
                return arr[1];
            }
        }
        return undefined;
    }
    return undefined;
};
// 判断参数为空

export const isEmpty = (obj) => {
    // 检验 undefined 和 null
    if (!obj && obj !== 0 && obj !== '') {
        return true;
    }
    // eslint-disable-next-line
    if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) { 　
        return true;
    }
    // eslint-disable-next-line
    if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
        return true;
    }
    return false;
};
// 检测是否是对象
export const isObject = (obj) => {
    const type = typeof obj;
    return ((type === 'function') || (type === 'object')) && (obj !== null);
};

// formData
export const setFormData = (obj) => {
    const formData = new FormData();
    Object.entries(obj).forEach((item) => {
        if (isObject(item[1])) {
            Object.entries(item[1]).forEach((i) => {
                const key = `${item[0]}[${i[0]}]`;
                formData.append(key, i[1]);
            });

        } else {
            formData.append(item[0], item[1]);
        }
    });
    return formData;
};
//多维数组去重
export const uniqueArr = (oldArr, id) => {
    const allArr = [];// 新数组
    const oldArrMap = {};
    oldArr.forEach((item) => {
        oldArrMap[item[id]] = item;
    });

    Object.keys(oldArrMap).forEach((item) => {
        allArr.push(oldArrMap[item]);
    });
    return allArr;
};
// 一维数组去重
export const unique = (arr) => { return arr.filter((value, index) => arr.indexOf(value) === index); };

// 一维数组去重
export const toNumber = (value) => {
    let res = Number(value);
    res = isNaN(res) ? 0 : res;
    return res;
};
