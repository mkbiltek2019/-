using System;
using LeaRun.Application.Code;

namespace LeaRun.Application.Entity.FormManage
{
    /// <summary>
    /// 版 本
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创 建：admin
    /// 日 期：2017-08-25 14:31
    /// 描 述：表单关联表
    /// </summary>
    public class Form_ModuleRelationEntity : BaseEntity
    {
        #region 实体成员
        /// <summary>
        /// 主键
        /// </summary>
        /// <returns></returns>
        public string Id { get; set; }
        /// <summary>
        /// 表单内容表Id
        /// </summary>
        /// <returns></returns>
        public string ModuleContentId { get; set; }
        /// <summary>
        /// 表单ID
        /// </summary>
        /// <returns></returns>
        public string FrmId { get; set; }
        /// <summary>
        /// FrmName
        /// </summary>
        /// <returns></returns>
        public string FrmName { get; set; }
        /// <summary>
        /// 表单版本号
        /// </summary>
        /// <returns></returns>
        public string FrmVersion { get; set; }
        /// <summary>
        /// 表单关联类型
        /// </summary>
        /// <returns></returns>
        public int? FrmKind { get; set; }
        /// <summary>
        /// 关联模块Id
        /// </summary>
        /// <returns></returns>
        public string ObjectId { get; set; }
        /// <summary>
        /// 关联功能按钮Id
        /// </summary>
        /// <returns></returns>
        public string ObjectButtonId { get; set; }
        /// <summary>
        /// 关联功能模块名称
        /// </summary>
        /// <returns></returns>
        public string ObjectName { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        /// <returns></returns>
        public DateTime? CreateDate { get; set; }
        /// <summary>
        /// 创建人Id
        /// </summary>
        /// <returns></returns>
        public string CreateUserId { get; set; }
        /// <summary>
        /// 创建人
        /// </summary>
        /// <returns></returns>
        public string CreateUserName { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        /// <returns></returns>
        public DateTime? ModifyDate { get; set; }
        /// <summary>
        /// 更新人id
        /// </summary>
        /// <returns></returns>
        public string ModifyUserId { get; set; }
        /// <summary>
        /// 更新人名称
        /// </summary>
        /// <returns></returns>
        public string ModifyUserName { get; set; }
        #endregion

        #region 扩展操作
        /// <summary>
        /// 新增调用
        /// </summary>
        public override void Create()
        {
            this.Id = Guid.NewGuid().ToString();//根据实际需要去修改
            this.CreateDate = DateTime.Now;
            this.CreateUserId = OperatorProvider.Provider.Current().UserId;
            this.CreateUserName = OperatorProvider.Provider.Current().UserName;

        }
        /// <summary>
        /// 编辑调用
        /// </summary>
        /// <param name="keyValue"></param>
        public override void Modify(string keyValue)
        {
            this.Id = keyValue;
            this.ModifyDate = DateTime.Now;
            this.ModifyUserId = OperatorProvider.Provider.Current().UserId;
            this.ModifyUserName = OperatorProvider.Provider.Current().UserName;

        }
        #endregion
    }
}