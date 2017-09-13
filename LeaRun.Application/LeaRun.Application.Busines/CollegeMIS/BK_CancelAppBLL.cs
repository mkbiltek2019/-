using LeaRun.Application.Entity.CollegeMIS;
using LeaRun.Application.IService.CollegeMIS;
using LeaRun.Application.Service.CollegeMIS;
using LeaRun.Util.WebControl;
using System.Collections.Generic;
using System;

namespace LeaRun.Application.Busines.CollegeMIS
{
    /// <summary>
    /// 版 本 6.1
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创 建：admin
    /// 日 期：2017-08-18 15:12
    /// 描 述：撤消申请记录
    /// </summary>
    public class BK_CancelAppBLL
    {
        private BK_CancelAppIService service = new BK_CancelAppService();

        private Entity.SystemManage.DataBaseLinkEntity conEntity;
        #region 构造方法指定要连的数据库
        public BK_CancelAppBLL()
        {
            SystemManage.DataBaseLinkBLL databaseLinkBLL = new Busines.SystemManage.DataBaseLinkBLL();
            conEntity = databaseLinkBLL.GetEntity("9914ca66-d5ae-4a26-9353-76bddea33179");
        }
        #endregion
        #region 获取数据
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        public IEnumerable<BK_CancelAppEntity> GetPageList(Pagination pagination, string queryJson)
        {
            return service.GetPageList(conEntity.DbConnection,pagination, queryJson);
        }
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回列表</returns>
        public IEnumerable<BK_CancelAppEntity> GetList(string queryJson)
        {
            return service.GetList(conEntity.DbConnection,queryJson);
        }

        /// <summary>
        /// 获取记录数
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回列表</returns>
        public List<M_BK_NumberEntity> Number()
        {
            return service.Number(conEntity.DbConnection);
        }
        /// <summary>
        /// 获取记录数
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回列表</returns>
        public List<M_BK_NumberEntity> TeaNumber()
        {
            return service.TeaNumber(conEntity.DbConnection);
        }

        /// <summary>
        /// 获取实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        public BK_CancelAppEntity GetEntity(string keyValue)
        {
            return service.GetEntity(conEntity.DbConnection,keyValue);
        }

        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        public List<M_BK_CancelAppEntity> StuGetCancelAppList(Pagination pagination)
        {
            return service.StuGetCancelAppList(conEntity.DbConnection, pagination);
        }

        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        public List<M_BK_CancelAppEntity> TeaGetCancelAppList(Pagination pagination)
        {
            return service.TeaGetCancelAppList(conEntity.DbConnection, pagination);
        }
       
        #endregion

        #region 提交数据
        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="keyValue">主键</param>
        public void RemoveForm(string keyValue)
        {
            try
            {
                service.RemoveForm(conEntity.DbConnection,keyValue);
            }
            catch (Exception)
            {
                throw;
            }
        }
                /// <summary>
        /// 保存表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        public void SaveForm2( string keyValue, BK_CancelAppEntity entity)
        {
            try
            {
                service.SaveForm2(conEntity.DbConnection, keyValue, entity);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /// <summary>
        /// 保存表单（新增、修改）
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <param name="entity">实体对象</param>
        /// <returns></returns>
        public void SaveForm(string keyValue, BK_CancelAppEntity entity)
        {
            try
            {
                service.SaveForm(conEntity.DbConnection,keyValue, entity);
            }
            catch (Exception)
            {
                throw;
            }
        }
        #endregion
    }
}
