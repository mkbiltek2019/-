﻿(function (n, t) {
    "use strict";
    function i(n) {
        t.addToolbarButton({
            id: n.F_EnCode,
            toolbar: ".toolbar",
            icon: "fa fa-sign-in",
            name: n.F_FullName,
            event: function () {
                t.dialogOpen({
                    id: "ExcelImportForm",
                    title: "快速导入",
                    url: "/Utility/ExcelImportForm?btnId=" + n.F_EnCode,
                    width: "1100px",
                    height: "700px",
                    btn: null,
                    callBack: function () {
                        console.log("cbb")
                    }
                })
            }
        })
    }
    function r(n, i) {
        t.addToolbarButton({
            id: n.F_EnCode,
            toolbar: ".toolbar",
            icon: "fa fa-sign-out",
            name: n.F_FullName,
            event: function () {
                dialogOpen({
                    id: "ExcelIExportDialog",
                    title: i.F_Name,
                    url: "/Utility/ExcelExportForm?gridId=" + i.F_GridId + "&filename=" + i.F_Name,
                    width: "500px",
                    height: "380px",
                    callBack: function (n) {
                        top.frames[n].AcceptClick()
                    },
                    btn: ["导出Excel", "关闭"]
                })
            }
        })
    }
    n.extend(t, {
        addToolbarButton: function (t) {
            if (n("#" + t.id).length == 0) {
                var i = n("#learun-excel-btn-list");
                i.length == 0 ? n(t.toolbar).append('<div class="btn-group" id="learun-excel-btn-list"><a id="' + t.id + '" class="btn btn-default" ><i class="' + t.icon + '"><\/i>&nbsp;' + t.name + "<\/a><\/div>") : i.append('<a id="' + t.id + '" class="btn btn-default" ><i class="' + t.icon + '"><\/i>&nbsp;' + t.name + "<\/a>")
            }
            n("#" + t.id).unbind();
            n("#" + t.id).on("click", t.event)
        },
        excel: {
            init: function () {
                var f = top.$.cookie("currentmoduleId"),
                o = top.learun.data.get(["menu", f]),
                u,
                e;
                o != "" && window.location.href.indexOf(o.F_UrlAddress) != -1 && (u = top.learun.data.get(["excelImportTemplate", f]), !u || (u.entitys ? n.each(u.entitys,
                function (n, t) {
                    i(t.btn)
                }) : (u.entitys = {},
                n.each(u.keys,
                function (n, r) {
                    t.getDataForm({
                        url: "../../SystemManage/ExcelImportTemplate/GetFormJson",
                        param: {
                            keyValue: r
                        },
                        async: !0,
                        type: "get",
                        success: function (n) {
                            var t = top.learun.data.get(["authorizeButton", f,
                            function (t) {
                                return t.F_ModuleButtonId == n.templateInfo.F_ModuleBtnId
                            }]); !t || (i(t), u.entitys[t.F_EnCode] || (u.entitys[t.F_EnCode] = {
                                btn: t,
                                data: []
                            }), u.entitys[t.F_EnCode].data.push(n))
                        }
                    })
                }))), e = top.learun.data.get(["excelExportTemplate", f]), !e || (console.log(e), n.each(e,
                function (n, t) {
                    var i = top.learun.data.get(["authorizeButton", f,
                    function (n) {
                        return n.F_ModuleButtonId == t.F_ModuleBtnId
                    }]);
                    r(i, t)
                })))
            }
        }
    })
})(window.jQuery, window.learun)