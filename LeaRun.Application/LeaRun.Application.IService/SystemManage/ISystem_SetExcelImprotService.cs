using LeaRun.Application.Entity.SystemManage;
//using LeaRun.Data.Repository;
using LeaRun.Util.WebControl;
using System.Collections.Generic;

namespace LeaRun.Application.IService.SystemManage
{
    /// <summary>
    /// 版 本 6.1
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创 建：admin
    /// 日 期：2017-06-12 11:00
    /// 描 述：数据导入
    /// </summary>
    public interface ISystem_SetExcelImprotService
    {
        #region 获取数据
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        IEnumerable<System_SetExcelImprotEntity> GetPageList(string conn, Pagination pagination, string queryJson);

        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        IEnumerable<System_SetExcelImprotEntity> GetList(string conn, string queryJson);

        /// <summary>
        /// 获取实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        System_SetExcelImprotEntity GetEntity(string conn, string keyValue);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="keyValue"></param>
        /// <returns></returns>
        System_SetExcelImprotEntity GetEntityByModuleId(string keyValue);

        /// <summary>
        /// 获取子表详细信息
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        IEnumerable<System_SetExcelImportFiledEntity> GetDetails(string conn, string keyValue);
        #endregion

        #region 提交数据
        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        void RemoveForm(string conn, string keyValue);

        /// <summary>
        /// 保存表单（新增、修改）,不包含子对象的数据
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        void SaveForm(string conn, string keyValue, System_SetExcelImprotEntity entity);

        /// <summary>
        /// 保存表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        void SaveForm(string conn, string keyValue, System_SetExcelImprotEntity entity,List<System_SetExcelImportFiledEntity> entryList);
        #endregion
    }
}
