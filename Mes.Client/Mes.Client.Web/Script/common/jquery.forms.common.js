﻿/*
公共函数处理模块
*/
function GetOrderStatusName(value) {
    switch (value) {
        case 'N':
            return '待炸单';
            break;
        case 'S':
            return '待拆单';
            break;
        case 'A':
            return '云拆单';
            break;
        case 'Y':
            return '拆单确认';
            break;
        case 'U':
            return '待上传';
            break;
        case "T":
            return '待排产';
            break;
        case 'M':
            return '待生产';
            break;
        case 'P':
            return '生产中';
            break;
        case 'F':
            return '已发货';
            break;
        case 'C':
            return '已取消';
            break;
        case 'I':
            return '已包装';
            break;
            //case 'O':
            //    return '待备货';
            //    break;
            //case 'R':
            return '已入库';
            break;
        case 'E':
            return '拆单失败';
            break;
        case "D":
            return '待财务审核';
            break;
        case "B":
            return '已退回';
            break;
        case "Z":
            return '信息待确认';
            break;
        default:
            return '待审核';
    }
}

//方案状态：N,待上传方案文件；P,待生成报价明细；Q,待报价确认；F,方案成交；C,方案取消；
function getSolutionStatusName(value) {
    switch (value.toUpperCase()) {
        case 'N':
            return "待上传方案文件";
        case 'P':
            return "待生成报价明细";
        case 'Q':
            return '待报价确认';
        case "E":
            return '<font color="red">方案文件无效</font>';
        case 'F':
            return '方案成交'
        case 'C':
            return '<font color="red">方案取消</font>'
        default:
            return '无效状态'
    }
}

function getSolutionStatusValue(value) {
    switch (value.toUpperCase()) {
        case "待上传方案文件":
            return "N";
        case "待生成报价明细":
            return "P";
        case "待报价确认":
            return "Q";
        case "方案成交":
            return "F";
        case "方案文件无效":
            return "E";
        case "方案取消"://<font color="red"></font>
            return "C";
        default:  //无效状态
            return "D"
    }
}

//报价单状态，N:确认中,F:已确认,C:已取消    
function getQuoteMainStatusName(value) {
    switch (value.toUpperCase()) {
        case 'N':
            return "确认中";
            break;
        case 'F':
            return "已确认";
            break;
        case 'C':
            return "已取消";
            break;
        case 'E':
            return "炸单失败";
            break;
        case 'I':
            return "已经完成";
            break;
        default:
            break;
    }
}

function getQuoteMainStatusValue(value) {
    switch (value.toUpperCase()) {
        case "确认中":
            return "N";
            break;
        case "已确认":
            return "F";
            break;
        case "已取消":
            return "C";
            break;
        default:
            break;
    }
}

//测量状态  N:待分派，C：已分派
function getRoomDesigerStatusName(value) {
    switch (value.toUpperCase()) {
        case 'N':
            return "待分派";
            break;
        case 'C':
            return "已分派";
            break;
        default:
            return "状态无效";
            break;
    }
}

//将序列化成json格式后日期(毫秒数)转成日期格式
function ChangeDateFormat(cellval) {
    var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minutes + ":" + seconds;
}
//产品状态：CabinetStatus-N 正常  U申请改单  C申请消单 D产品已取消或已删除
function GetCabinetStatusName(value) {
    console.log(value.trim().toUpperCase());
    switch (value.trim().toUpperCase()) {
        case 'N':
            return "正常";
        case 'U':
            return "正在申请改单";
        case 'C':
            return '正在申请消单'
        case 'D':
            return '已取消'
        default:
            return '无效状态'
    }
}
//日期去掉中文格式
function removeCN(str) {
    var reg = /[\u4E00-\u9FA5]/g;
    var strAfter = str.replace(reg, '');
    return strAfter;
}

var EmptyGuid = '00000000-0000-0000-0000-000000000000';
$.extend($.fn.datagrid.defaults, {
    fit: true,
    nowrap: false,
    striped: true,
    rownumbers: true,
    singleSelect: true,
    pagination: true,
    pageSize: 20,
    sortOrder: 'ASC',
    border: false,
    striped: false,
    pageList: [10, 20, 30, 40, 50],
    onLoadSuccess: function (data) {
        $(this).datagrid('clearSelections');
    },
    onLoadError: function (XMLHttpRequest, textStatus, errorThrown) {
        if (XMLHttpRequest.status == "0") return;
        var substr = XMLHttpRequest.responseText;
        if (substr === "TimeOut") {
            showError("登录超时，3秒后将返回登录页面....");
            setTimeout(function () {
                top.window.location.href = '/View/Account/login.aspx';
            }, 3000);
        }
        else {
            showError('加载数据错误！原因：' + XMLHttpRequest.responseText);
        }
    }
});

//判断字符串是否为空
function IsNullOrEmpty(value) {
    if (value == undefined || value == null || value.length == 0) {
        return true;
    } else {
        return false;
    }
};

//英文占1个字符，中文汉字占2个字符
function get_length(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
            len += 2;
        } else {
            len++;
        }
    }
    return len;
};
//字符串截取 一个中文汉字算两个字符
function cut_str(val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null)
            byteValLen += 2;
        else
            byteValLen += 1;
        if (byteValLen > max)
            break;
        returnValue += val[i];
    }
    return returnValue;
};

//2018-03-16T16:02:06.05
function getdateTime(value) {
    if (value == undefined || value == "0001-01-01T00:00:00")
        return "";
    try {
        if (value.indexOf("T") != -1) {
            var array = value.split("T");
            if (array.length > 0) {
                var splite2 = array[1].split(":");
                return (array[0] + " " + splite2[0] + ":" + splite2[1]);
            }
        }
    }
    catch (err) {
        console.log('日期转化错误：' + value);
    }
    return "";
};

function InsertIframe(parameter) {
    var PrintUrl = "";
    var lodopImgPath = $("#lodopImg").attr("src");
    console.log(lodopImgPath);

    if (lodopImgPath.indexOf("http://www.c-lodop.com") >= 0) {
        PrintUrl = "http://www.c-lodop.com/View/Print/Index.aspx" + parameter + "&isconfig=true";
    }
    else {
        PrintUrl = "/View/Print/Index.aspx" + parameter;
    }

    var iframe_ = '<iframe src="' + PrintUrl + '" style="display:none;"></iframe>';
    console.log(iframe_);
    $("body").append(iframe_);
};

(function ($) {
    $.extend({
        formatstring: function (source, args) {
            var result = source;
            if (typeof (args) == "object") {
                if (args.length == undefined) {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                } else {
                    for (var i = 0; i < args.length; i++) {
                        if (args[i] != undefined) {
                            var reg = new RegExp("({[" + i + "]})", "g");
                            result = result.replace(reg, args[i]);
                        }
                    }
                }
            }
            return result;
        }
    })
})(jQuery);

//alert($.formatstring("为什么{0}没有format", ["javascript"]));

function htmlEncode(str) {
    var ele = document.createElement('div');
    ele.appendChild(document.createTextNode(str));
    return ele.innerHTML;
}
function htmlDecode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/\&gt;/g, "&");
    s = s.replace(/\&lt;/g, "<");
    s = s.replace(/\&gt;/g, ">");
    s = s.replace(/\&nbsp;/g, " ");
    s = s.replace(/\&#39;/g, "\'");
    s = s.replace(/\&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}

function jsNC() {
    return "nocache=" + (new Date()).getTime();
}

function NewGuid() {
    var guid = "";
    $.ajax({
        url: '/ashx/commonhandler.ashx?Method=NewGuid&' + jsNC(),
        async: false,
        type: 'post',
        success: function (data) {
            if (data.ID == undefined) {
                data = eval('(' + data + ')');
            }
            guid = data.ID;
        }
    })
    return guid;
}


//获取URL参数
function getUrlParam(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg);  //匹配目标参数

    if (r != null) return unescape(r[2]); return null; //返回参数值

}

//打开新的Tab页
function OpTab(title, url) {
    top.addTab(title, url, "con icon-sys");
}

function showError(message) {
    parent.$.messager.alert('错误信息', message, 'error');
}
function showInfo(message) {
    parent.$.messager.alert("提示信息", message, "info");
}

$.ajaxSetup({
    global: false,
    type: "POST",
    dataType: 'json',
    //请求失败遇到异常触发
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus == 200) return;
        if (XMLHttpRequest.responseText == '') return;
        if (XMLHttpRequest.status == "0") return;
        var substr = XMLHttpRequest.responseText;
        if (substr === "TimeOut") {
            showError("登录超时，3秒后将返回登录页面....");
            setTimeout(function () {
                top.window.location.href = '/login.aspx';
            }, 3000);
        }
        else {
            showError('加载数据错误！原因：' + XMLHttpRequest.responseText);
        }
    }
});
