using LeaRun.Application.Entity.ArrangeLesson;
using LeaRun.Application.IService.ArrangeLesson;
using LeaRun.Application.Service.ArrangeLesson;
using LeaRun.Util.WebControl;
using System.Collections.Generic;
using System;

namespace LeaRun.Application.Busines.ArrangeLesson
{
    /// <summary>
    /// 版 本 6.1
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创 建：唐和江
    /// 日 期：2016-10-24 11:13
    /// 描 述：InfoLesson
    /// </summary>
    public class InfoLessonBLL
    {
        private InfoLessonIService service = new InfoLessonService();

        private Entity.SystemManage.DataBaseLinkEntity conEntity;
        #region 构造方法指定要连的数据库
        public InfoLessonBLL()
        {
            SystemManage.DataBaseLinkBLL databaseLinkBLL = new Busines.SystemManage.DataBaseLinkBLL();
            conEntity = databaseLinkBLL.GetEntity("4481b357-809b-4ae3-aafd-c0c27e48041b");
        }
        #endregion
        #region 获取数据
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pagination">分页</param>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回分页列表</returns>
        public IEnumerable<InfoLessonEntity> GetPageList(Pagination pagination, string queryJson)
        {
            return service.GetPageList(conEntity.DbConnection,pagination, queryJson);
        }
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="queryJson">查询参数</param>
        /// <returns>返回列表</returns>
        public IEnumerable<InfoLessonEntity> GetList(string queryJson)
        {
            return service.GetList(conEntity.DbConnection,queryJson);
        }
        /// <summary>
        /// 获取实体
        /// </summary>
        /// <param name="keyValue">主键值</param>
        /// <returns></returns>
        public InfoLessonEntity GetEntity(string keyValue)
        {
            return service.GetEntity(conEntity.DbConnection,keyValue);
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
        public void SaveForm(string keyValue, InfoLessonEntity entity)
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
