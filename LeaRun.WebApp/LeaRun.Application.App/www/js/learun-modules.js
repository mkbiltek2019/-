﻿/*
* 创建者：LearunChen
* 时间：  2016-06-08
* 描述：  数据模型存放js，统一处理数据交互和后台
* */
angular.module('starter.modules', [])
//主页应用列表
  .factory('HomeApps', function () {
    var homeApps = [{
        name: "客户demo",
        icon: "ion-ios-paperplane-outline",
        color: "bgcolor_a",
        viewid: 'home-customers.html'
    }
    , {
        name: "商机demo",
        icon: "ion-ios-people-outline",
        color: "bgcolor_b",
        viewid: 'home-business.html',
    }, {
        name: "学生工作",
        icon: "ion-ios-list-outline",
        color: "bgcolor_c",
        viewid: 'home-xuegong.html',
    }, {
        name: "财务收费",
        icon: "ion-ios-paper-outline",
        color: "bgcolor_d",
        viewid: 'home-caiwu.html',
    }, {
        name: "宿舍管理",
        icon: "ion-ios-pulse",
        color: "bgcolor_e",
        viewid: 'home-baodao.html',
    }, {
        name: "报表中心",
        icon: "ion-ios-pie-outline",
        color: "bgcolor_a",
        viewid: 'home-baobao.html',
    }

    , {
        name: "迎新报到",
        icon: "ion-ios-person-outline",
        color: "bgcolor_c",
        viewid: 'home-baodao.html',
    }
     , {
        name: "顶岗实习",
        icon: "ion-ios-toggle-outline",
        color: "bgcolor_f",
        viewid: 'home-shixi.html',
    }
, {
        name: "毕业离校",
        icon: "ion-ios-browsers-outline",
        color: "bgcolor_f",
        viewid: 'home-lixiao.html'
    }, {
        name: "即时通信",
        icon: "ion-ios-chatboxes-outline",
        color: "bgcolor_g",
        viewid: 'home-chat.html',
    }, {
        name: "在线学习",
        icon: "ion-ios-book",
        color: "bgcolor_b",
        viewid: 'home-study.html',
    }, {
        name: "我的学业",
        icon: "ion-ios-pricetag-outline",
        color: "bgcolor_e",
        viewid: 'MyKecheng.html',
    }











    ];

    return {
        all: function () {
            return homeApps;
        },
        remove: function (homeApps) {
            homeApps.splice(homeApps.indexOf(homeApps), 1);
        },
        get: function (homeAppId) {
            for (var i = 0; i < homeApps.length; i++) {
                if (homeApps[i].id === parseInt(homeAppId)) {
                    return homeApps[i];
                }
            }
            return null;
        }
    };
})
//实例列表信息
  .factory('Cases', function () {
    var cases = [{
        id: 0,
        name: '列表',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'case-list.html'
    }, {
        id: 1,
        name: '表单',
        icon: 'ion-ios-paper-outline',
        bgcolor: 'bgcolor_b',
        viewid: 'case-form.html'
    }, {
        id: 2,
        name: '按钮',
        icon: 'ion-ios-circle-filled',
        bgcolor: 'bgcolor_c',
        viewid: 'case-button.html'
    }, {
        id: 3,
        name: '选择相册图片',
        icon: 'ion-ios-cloud-upload',
        bgcolor: 'bgcolor_d',
        viewid: 'case-picture.html'
    }, {
        id: 4,
        name: '拍照',
        icon: 'ion-ios-camera',
        bgcolor: 'bgcolor_e',
        viewid: 'case-camera.html'
    }, {
        id: 5,
        name: '扫描条码',
        icon: 'ion-ios-barcode-outline',
        bgcolor: 'royal-bg',
        viewid: 'case-barcode.html'
    }, {
        id: 6,
        name: '通讯录',
        icon: 'ion-person-stalker',
        bgcolor: 'calm-bg',
        viewid: 'case-contact.html'
    }, {
        id: 7,
        name: '打电话',
        icon: 'ion-ios-telephone',
        bgcolor: 'assertive-bg',
        viewid: 'case-tel.html'
    }, {
        id: 8,
        name: '地理位置',
        icon: 'ion-ios-location',
        bgcolor: 'dark-bg',
        viewid: 'case-location.html'
    }];

    return {
        all: function () {
            return cases;
        },
        remove: function (cases) {
            cases.splice(cases.indexOf(cases), 1);
        },
        get: function (caseId) {
            for (var i = 0; i < cases.length; i++) {
                if (cases[i].id === parseInt(caseId)) {
                    return cases[i];
                }
            }
            return null;
        }
    };
})
//教师列表信息
  .factory('lrmCustomers',['$learunFormatDate', 'AreaInfo','$learunGetDataItem','$learunHttp','ApiUrl','$learunTopAlert',function ($learunFormatDate, AreaInfo,$learunGetDataItem,$learunHttp,ApiUrl,$learunTopAlert) {
    //教师列表
    var custList = {
      records: 0,
      page: 1,
      total: 1,
      moredata: false,
      customers: []
    };
    var custListSearch={};

    var custType = {};  //教师类别
    var custLevel = {}; //教师级别
    var custDegree = {} //教师程度
    var custTrade = {}  //教师行业

    //教师编辑数据字段
    var editDataEx = [
      {
        "name":"教师名称",
        "id":"fullName",
        "isRequire":true
      },
      {
        "name":"教师类别",
        "id":"custTypeId",
        "isRequire":true
      },
      {
        "name":"教师级别",
        "id":"custLevelId",
        "isRequire":true
      },
      {
        "name":"教师程度",
        "id":"custDegreeId",
        "isRequire":true
      },
      {
        "name":"主要联系人",
        "id":"traceUserName",
        "isRequire":true
      },
      {
        "name":"联系人",
        "id":"contact",
        "isRequire":true
      },
      {
        "name":"手机",
        "id":"mobile",
        "isRequire":false
      },
      {
        "name":"QQ",
        "id":"qQ",
        "isRequire":false
      }
    ];
    //方法函数
    function translateData(data, obj) {
        for (var i in data) {
          var item = data[i];

          if(item.custIndustryId == null)
          {
            data[i].custIndustryName = "未知业";
            data[i].custIndustrybgColor = "dark-bg";
          }
          else{
            data[i].custIndustryName = custTrade[item.custIndustryId].itemName;
            data[i].custIndustrybgColor = custTrade[item.custIndustryId].bgColor;
          }

          data[i].custLevelName = custLevel[item.custLevelId].itemName;
          data[i].custTypeName = custType[item.custTypeId].itemName;
          data[i].custDegreeName = custDegree[item.custDegreeId].itemName;

          if (data[i].province != null)
          {
              data[i].provinceName = AreaInfo.getProvinceName(item.province);
              if (data[i].city != null) {
                  data[i].cityName = AreaInfo.getCityName(item.province, item.city);
              }
          }
          data[i].lastDate = item.modifyDate == null ? $learunFormatDate(item.createDate, 'MM-dd') : $learunFormatDate(item.modifyDate, 'MM-dd');
          data[i].createDate = $learunFormatDate(item.createDate, 'yyyy-MM-dd hh:mm');
          data[i].modifyDate = $learunFormatDate(item.modifyDate, 'yyyy-MM-dd hh:mm');
          obj.push(data[i]);
        }
    };
    //获取数据
    function getData(page,queryData, obj,callback) {
      $learunHttp.post({
        "url": ApiUrl.customerListApi,
        "data": { "page": page, "rows": 10, "sidx": "ModifyDate", "sord": "desc", "queryData": JSON.stringify(queryData) },
        "isverify": true,
        "success": function (data) {
          if(page == 1) {
            obj.customers =[];
          }
          translateData(data.result.rows, obj.customers);
          obj.records = data.result.records;
          obj.page = data.result.page;
          obj.total = data.result.total;
          if (data.result.page == data.result.total || data.result.total == 0) {
            obj.moredata = false;
          }
          else {
            obj.moredata = true;
          }
          obj.page = obj.page+1;
        },
        "error": function () {
          $learunTopAlert.show({ text: "刷新失败" });
        },
        "finally": function () {
          callback();
        }
      });
    }
    //返回
    return {
      baseInit: function(){
        $learunGetDataItem({
          "itemName":'Client_Sort',
          "callback": function (data) {
            custType = data;
          }
        });
        $learunGetDataItem({
          "itemName":'Client_Level',
          "callback": function (data) {
            custLevel = data;
          }
        });
        $learunGetDataItem({
          "itemName":'Client_Degree',
          "callback": function (data) {
            custDegree = data;
          }
        });
        $learunGetDataItem({
          "itemName":'Client_Trade',
          "callback": function (data) {
            custTrade = data;
          }
        });
      },
      getList: function () {
        return custList;
      },
      update: function (callback) {
        getData(1,{},custList,callback);
      },
      add: function (callback) {
        getData(custList.page,{},custList,callback);
      },
      get: function (custId) {
        for (var i = 0; i < custList.customers.length; i++) {
          if (custList.customers[i].customerId === custId) {
            return custList.customers[i];
          }
        }
        for (var i = 0; i < custListSearch.customers.length; i++) {
          if (custListSearch.customers[i].customerId === custId) {
            return custListSearch.customers[i];
          }
        }
        return null;
      },
      getSearchList: function () {
        custListSearch = {
          records: 0,
          page: 1,
          total: 1,
          moredata: false,
          customers: [],
          keyword: ""
        };
        return custListSearch;
      },
      searchData: function () {
        if (custListSearch.keyword == "") {
          return false;
        }
        getData(1,{ "condition": "All", "keyword": custListSearch.keyword },custListSearch, function () {});
      },
      searchDataAdd:function (callback){
        if (custListSearch.keyword == "") {
          return false;
        }
        getData(custListSearch.page,{ "condition": "All", "keyword": custListSearch.keyword },custListSearch,callback);
      },
      remove: function (customer) {
        $learunHttp.post({
          "url": ApiUrl.deleteCustomerApi,
          "data": { "customerId": customer.customerId },
          "success": function (data) {
            if(custListSearch.records > 0) {
              custListSearch.customers.splice(custListSearch.customers.indexOf(customer), 1);
              custListSearch.records = custListSearch.records -1;
              for (var i = 0; i < custList.customers.length; i++) {
                if (custList.customers[i].customerId === customer.customerId) {
                  customer =  custList.customers[i];
                }
              }
            }
            custList.customers.splice(custList.customers.indexOf(customer), 1);
            custList.records = custList.records -1;
          },
          "error": function () {
            $learunTopAlert.show({ text: "删除失败！" });
          }
        });
      },
      editSubmit: function (editData,callback) {
        $learunHttp.post({
          "url": ApiUrl.saveCustomerApi,
          "data": editData,
          "isverify": true,
          "success": function (data) {
            $learunTopAlert.show({ text: "保存成功！" });
          },
          "error": function () {
            $learunTopAlert.show({ text: "保存失败！" });
          },
          "finally":function(){
            callback();
          }
        });
      },
      getCustType:function()
      {
        return custType;
      },
      getCustLevel:function()
      {
        return custLevel;
      },
      getCustDegree:function()
      {
        return custDegree;
      },
      getCustTrade:function()
      {
        return custTrade;
      },

      getEditDataEx:function(){
        return editDataEx;
      }
    };
}])
//学生列表信息
  .factory('lrmBusinesss',['$learunFormatDate','$learunGetDataItem','$learunHttp','ApiUrl','$learunTopAlert',function ($learunFormatDate,$learunGetDataItem,$learunHttp,ApiUrl,$learunTopAlert) {
    //学生列表数据
    var businessList ={
      records: 0,
      page: 1,
      total: 1,
      moredata: false,
      businesss: []
    };
    var businessListSearch = {};//搜索列表数据
    var chancePhases = {};//学生阶段
    var chanceSource = {};//学生来源
    var editDataEx = [
      {
        "name":"XX名称",
        "id":"fullName",
        "isRequire":true
      },
      {
        "name":"预计金额",
        "id":"amount",
        "isRequire":true
      },
      {
        "name":"XX来源",
        "id":"sourceId",
        "isRequire":true
      },
      {
        "name":"XX阶段",
        "id":"stageId",
        "isRequire":true
      },
      {
        "name":"毕业学校名称",
        "id":"companyName",
        "isRequire":true
      },
      {
        "name":"人员",
        "id":"traceUserName",
        "isRequire":true
      },
      {
        "name":"联系人",
        "id":"contacts",
        "isRequire":true
      },
      {
        "name":"手机",
        "id":"mobile",
        "isRequire":false
      },
      {
        "name":"QQ",
        "id":"qQ",
        "isRequire":false
      }
    ];//商家编辑数据字段

    //方法函数(数据遍历转化)
    function translateData(data,obj) {
        for (var i in data) {
          var item = data[i];
          data[i].stageName =  chancePhases[data[i].stageId].itemName;
          data[i].bgStageColor = chancePhases[data[i].stageId].bgColor;
          data[i].sourceName = chanceSource[data[i].sourceId].itemName;
          data[i].lastDate =  $learunFormatDate(item.modifyDate, 'MM-dd');
          data[i].createDate = $learunFormatDate(item.createDate, 'yyyy-MM-dd hh:mm');
          data[i].modifyDate = $learunFormatDate(item.modifyDate, 'yyyy-MM-dd hh:mm');
          data[i].dealDate = $learunFormatDate(item.dealDate, 'yyyy-MM-dd');
          obj.push(data[i]);
        }
    };
    //获取数据方法
    function getData(page,queryData,obj,callback) {
      $learunHttp.post({
        "url": ApiUrl.chanceListApi,
        "data": { "page": page, "rows": 10, "sidx": "ModifyDate", "sord": "desc", "queryData": JSON.stringify(queryData) },
        "isverify": true,
        "success": function (data) {
          if(page == 1) {
            obj.businesss =[];
          }
          translateData(data.result.rows, obj.businesss);
          obj.records = data.result.records;
          obj.page = data.result.page;
          obj.total = data.result.total;
          if (data.result.page == data.result.total || data.result.total == 0) {
            obj.moredata = false;
          }
          else {
            obj.moredata = true;
          }
          obj.page = obj.page+1;
        },
        "error": function () {
          $learunTopAlert.show({ text: "刷新失败" });
        },
        "finally": function () {
          callback();
        }
      });
    }
    return {
      init: function () {//初始化信息
        $learunGetDataItem({
          "itemName":'Client_ChancePhase',
          "callback": function (data) {
            chancePhases = data;
          }
        });
        $learunGetDataItem({
          "itemName":'Client_ChanceSource',
          "callback": function (data) {
            chanceSource = data;
            console.log(chanceSource);
          }
        });
      },
      getList: function () {
        return businessList;
      },
      update: function (callback) {//刷新数据
        getData(1,{},businessList,callback);
      },
      add:function(callback) {
        getData(businessList.page,{},businessList,callback);
      },
      getSearchList: function () {
        businessListSearch = {
          records: 0,
          page: 1,
          total: 1,
          moredata: false,
          businesss: [],
          keyword: ""
        };
        return businessListSearch;
      },
      searchData: function () {
        if (businessListSearch.keyword == "") {
          return false;
        }
        getData(1,{ "condition": "All", "keyword": businessListSearch.keyword },businessListSearch, function () {});
      },
      searchDataAdd:function (callback){
        if (businessListSearch.keyword == "") {
          return false;
        }
        getData(businessListSearch.page,{ "condition": "All", "keyword": businessListSearch.keyword },businessListSearch,callback);
      },
      get: function (chanceId) {
        for (var i = 0; i < businessList.businesss.length; i++) {
          if (businessList.businesss[i].chanceId === chanceId) {
            return businessList.businesss[i];
          }
        }
        for (var i = 0; i < businessListSearch.businesss.length; i++) {
          if (businessListSearch.businesss[i].chanceId === chanceId) {
            return businessListSearch.businesss[i];
          }
        }
        return null;
      },
      getChancePhases: function () {
        return chancePhases;
      },
      getChanceSource: function () {
        return chanceSource;
      },
      getEditDataEx:function(){
        return editDataEx;
      },
      remove: function (business) {
        $learunHttp.post({
          "url": ApiUrl.deleteChanceApi,
          "data": { "chanceId": business.chanceId },
          "success": function () {
            if(businessListSearch.records > 0) {
              businessListSearch.businesss.splice(businessListSearch.businesss.indexOf(business), 1);
              businessListSearch.records = businessListSearch.records -1;
              for (var i = 0; i < businessList.businesss.length; i++) {
                if (businessList.businesss[i].chanceId === business.chanceId) {
                  business = businessList.businesss[i];
                }
              }
            }
            businessList.businesss.splice(businessList.businesss.indexOf(business), 1);
            businessList.records = businessList.records -1;

          },
          "error": function () {
            $learunTopAlert.show({ text: "删除失败！" });
          }
        });

      },
      editSubmit: function (editData,callback) {
        $learunHttp.post({
          "url": ApiUrl.saveChanceApi,
          "data": editData,
          "isverify": true,
          "success": function (data) {
            $learunTopAlert.show({ text: "保存成功!" });
          },
          "error": function () {
            $learunTopAlert.show({ text: "保存失败！" });
          },
          "finally":function(){
            callback();
          }
        });
      }

    };
}])
//首页公告
  .factory('Announces', function () {
    var announces = [{
        id: 0,
        name: '界面不好看，工作都白干，客户重颜值，内涵放一边',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'noticeDetails.html',//templates/notices/noticeDetails.html
    },{
        id: 0,
        name: '号外！号外！泉江开发APP不用美工了',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'noticeDetails.html',
    }, {
        id: 1,
        name: '泉江全栈开发工程师培养计划',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'list',
    }, {
        id: 2,
        name: '前端后台一把抓，开发不再要美工！',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'list',
    }, {
        id: 3,
        name: '现在的客户重颜值，一定要把界面弄好看！！',
        icon: 'ion-ios-list-outline',
        bgcolor: 'positive-bg',
        viewid: 'list',
    }];
    return {
        all: function () {
            return announces;
        },
        remove: function (announces) {
            announces.splice(announces.indexOf(announces), 1);
        },
        get: function (announceId) {
            for (var i = 0; i < announces.length; i++) {
                if (announces[i].id == parseInt(announceId)) {
                    return announces[i];
                }
            }
            return null;
        }
    };
})
//我的账号信息
  .factory('UserInfo',['$learunLocals',function ($learunLocals) {
    var userInfo = {
        userid: "",
        account: "",
        password: "",
        realname: "",
        headicon: "img/logo.png",
        gender: "",
        organizeid: "",
        organizename: "",
        departmentid: "",
        departmentname: "",
        dutyid: "",
        dutyname: "",
        postid: "",
        postname: "",
        roleid: "",
        rolename: "",
        managerid: "",
        manager: "",
        description: "",
        mobile: "",
        telephone: "",
        email: "",
        oicq: "",
        wechat: "",
        msn: "",

        token: "",
        isLogin:false,
    };
    return {
        get: function () {
            var newUserInfo = $learunLocals.getObject('userInfo');
            if (newUserInfo.isLogin == undefined)
            {
                userInfo.isLogin = false;
                userInfo.token = "";
            }
            ionic.extend(userInfo, userInfo, newUserInfo || {});
            return userInfo;
        },
        set: function (data, token, isLogin) {
            data.headicon = "img/logo.png";//(data.headicon == undefined ? userInfo.headicon : data.headicon);
            ionic.extend(userInfo, userInfo, data || {});
            userInfo.token = token;
            userInfo.isLogin = isLogin;
            $learunLocals.setObject('userInfo', userInfo);
        },
        clear: function ()
        {
            userInfo.isLogin = false;
            userInfo.token = "";
            $learunLocals.setObject('userInfo', {});
        }
    };
}])
//行政区域数据
  .factory('AreaInfo', ['$learunHttp','ApiUrl',function ($learunHttp, ApiUrl) {
    var areaInfo = {};
    return {
      init: function () {
        $learunHttp.post({
          "url": ApiUrl.areaListApi,
          "isverify": true,
          "success": function (data) {
              areaInfo = data.result;
          }
        });
      },
      getProvinceName: function (provinceId) {
        return areaInfo[provinceId].areaName;
      },
      getCityName: function (provinceId, cityId)
      {
        return areaInfo[provinceId].children[cityId];
      }
    };
}])
//基础信息
  .factory('lrmBaseInfo',['$learunHttp','ApiUrl', function ($learunHttp,ApiUrl) {
    var baseInfo ={
      userListInfo:[]//用户列表
    };
    return{
      init:function(){
        $learunHttp.post({
          "url": ApiUrl.getUserListApi,
          "isverify": true,
          "success": function (data) {
            baseInfo.userListInfo = data.result;
          }
        });
      },
      getUserInfoList:function(depId){
        var data = [];
        for(var i in baseInfo.userListInfo)
        {
          var item = baseInfo.userListInfo[i];
          if(item.departmentId == depId) {
            data.push(item);
          }
        }
        return data;
      }
    };
  }])



//抵校登记
//列表信息
  .factory('yxDxdj', ['$learunFormatDate', '$learunGetDataItem', '$learunHttp', 'ApiUrl', '$learunTopAlert', function ($learunFormatDate, $learunGetDataItem, $learunHttp, ApiUrl, $learunTopAlert) {
      //抵校登记列表数据
      var dxdjList = {
          records: 0,
          page: 1,
          total: 1,
          moredata: false,
          dxdj: []
      };
      var dxdjListSearch = {};//搜索列表数据
      var arriveType = {};//来校方式
      var baodaoDept = {};//报到院系
      var stationName = {};//到站名称
      var editDataEx = [
        {
            "name": "新生姓名",
            "id": "stuName",
            "isRequire": true
        },
        {
            "name": "报到院系",
            "id": "baodaoDept",
            "isRequire": true
        },
        {
            "name": "抵校方式",//来校方式：火车，飞机，轮船，公交车,自驾车
            "id": "arriveType",
            "isRequire": true
        },
        {
            "name": "到站名称",//到站名称：根据学校的接站设定
            "id": "stationName",
            "isRequire": true
        },
        {
            "name": "所乘车次",
            "id": "companyName",
            "isRequire": true
        },
        {
            "name": "到校时间",
            "id": "arriveTime",
            "isRequire": true
        },
        {
            "name": "来校人数",
            "id": "parteners",
            "isRequire": true
        },
        {
            "name": "联系电话",
            "id": "mobile",
            "isRequire": true
        },
        {
            "name": "备用电话",
            "id": "mobile2",
            "isRequire": true
        },
        {
            "name": "附言",
            "id": "words",
            "isRequire": false
        }
      ];//编辑数据字段

      //方法函数(数据遍历转化)
      function translateData(data, obj) {
          for (var i in data) {
              var item = data[i];
              data[i].arriveTime = $learunFormatDate(item.arriveTime, 'yyyy-MM-dd hh:mm');
              obj.push(data[i]);
          }
      };
      
      return {
          init: function () {//初始化信息
              $learunGetDataItem({
                  "itemName": 'arriveType',
                  "callback": function (data) {
                      arriveType = data;
                  }
              });
              $learunGetDataItem({
                  "itemName": 'baodaoDept',
                  "callback": function (data) {
                      baodaoDept = data;
                      console.log(baodaoDept);
                  }
              });
              $learunGetDataItem({
                  "itemName": 'stationName',
                  "callback": function (data) {
                      stationName = data;
                      console.log(stationName);
                  }
              });
          }, 
          
          get: function (dxdjId) {
              //for (var i = 0; i < businessList.businesss.length; i++) {
              //    if (businessList.businesss[i].chanceId === chanceId) {
              //        return businessList.businesss[i];
              //    }
              //}
              //for (var i = 0; i < businessListSearch.businesss.length; i++) {
              //    if (businessListSearch.businesss[i].chanceId === chanceId) {
              //        return businessListSearch.businesss[i];
              //    }
              //}
              return null;
          },
          getArriveType: function () {
              return arriveType;
          },
          getBaodaoDept: function () {
              return baodaoDept;
          },
          getStationName: function () {
              return stationName;
          },
          getEditDataEx: function () {
              return editDataEx;
          },          
          editSubmit: function (editData, callback) {
              $learunHttp.post({
                  "url": ApiUrl.saveDxdjApi,
                  "data": editData,
                  "isverify": true,
                  "success": function (data) {
                      $learunTopAlert.show({ text: "保存成功!" });
                  },
                  "error": function () {
                      $learunTopAlert.show({ text: "保存失败！" });
                  },
                  "finally": function () {
                      callback();
                  }
              });
          }

      };
  }])

;
