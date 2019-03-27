import qs from 'qs';
import moment from 'moment';
import numeral from 'numeral';

/**
 * url参数取值
 * @param key
 * @returns {null}
 */
export function query(key) {
    const arr = window.location.href.split('?');
    if (arr.length <= 1) {
        return null;
    }
    arr.shift();
    const str = arr.join();
    const obj = qs.parse(str)
    return obj[key] === undefined ? null : obj[key];
}

/**
 * 数组洗牌
 * @param arr
 * @returns {*}
 */
export function shuffle(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        let idx = Math.floor(Math.random() * (len - i));
        let temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
    }
    return arr;
}

/**
 * 数字转换字母 0 对应 A
 * @param num
 * @returns {string}
 */
export function changeNum2Letter(num) {
    return String.fromCharCode(65 + num);
}

/**
 * 判断字符串为空
 * @param str
 * @returns {boolean}
 */
export function isNullOrEmpty(str) {
    return str === null || str === '' || str === undefined;
}

export function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 *  uuid
 * @param len
 * @param radix
 * @returns {string}
 */
export function uuid(len = 8, radix = 16) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        let r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}


function supplyZero(num) {
    let str = '';
    for (let i = 0; i < num; i += 1) {
        str += '0';
    }
    return str;
}

export function formatMoney(value, num, type) {
    switch (type) {
        case "rmb":
            return `¥ ${numeral(value).format(`0,0.${supplyZero(num || 2)}`)}`;
        case "dollar":
            return numeral(value).format(`$ 0,0.${supplyZero(num || 2)}`);
    }
}

export function formatNumber(value, num) {
    num = num || 0;
    if (num === 0) {
        return numeral(value).format(`0,0`);
    }
    return numeral(value).format(`0,0.${supplyZero(num || 0)}`);
}

export function formatDate(dateObj, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!dateObj) {
        return null;
    }
    return moment(dateObj).format(format);
}

export function base64Img2Blob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});

}

export function downloadFile(fileName, content) {
    let aLink = document.createElement('a');
    document.body.appendChild(aLink);
    let blob = base64Img2Blob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
    aLink.dispatchEvent(evt);
    aLink.remove();
}

export function exportExcel(JSONData, FileName, ShowLabel) {
    let arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;
    let table = '<table>';
    let row = "<tr>";
    for (let i = 0, l = ShowLabel.length; i < l; i += 1) {
        row += `<th style='text-align:${ShowLabel[i].align||'left'}'>` + ShowLabel[i].value + '</th>';
    }
    table += row + "</tr>";
    for (let i = 0; i < arrData.length; i += 1) {
        let row = "<tr>";
        for (let index in arrData[i]) {
            let value = arrData[i][index].value === "." ? "" : arrData[i][index].value;
            row +=value? `<td style='${arrData[i][index].style}' ${arrData[i][index].rowspan?`rowspan=${arrData[i][index].rowspan}`:''}>` + value + '</td>':'<td></td>';
        }
        table += row + "</tr>";
    }
    table += "</table>";
    let excelFile = "<html  " +
        "xmlns:v='urn:schemas-microsoft-com:vml'" +
        "xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:x='urn:schemas-microsoft-com:office:excel' " +
        "xmlns:m='http://schemas.microsoft.com/office/2004/12/omml' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += table;
    excelFile += "</body>";
    excelFile += "</html>";
    let uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);
    let link = document.createElement("a");
    link.href = uri;
    link.style = "visibility:hidden";
    link.download = FileName + ".xls";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportCsv(jsonData,label, fileName) {
    //列标题，逗号隔开，每一个逗号就是隔开一个单元格
    let str = `${label}\n`;
    //增加\t为了不让表格显示科学计数法或者其他格式
    for(let i = 0 ; i < jsonData.length ; i++ ){
        for(let item in jsonData[i]){
            str+=`${jsonData[i][item] + '\t'},`;
        }
        str+='\n';
    }
    //encodeURIComponent解决中文乱码
    let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
    //通过创建a标签实现
    var link = document.createElement("a");
    link.href = uri;
    //对下载的文件命名
    link.download =  `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();

}