﻿using LeaRun.Application.Entity.BaseManage;
using System.Data.Entity.ModelConfiguration;

namespace LeaRun.Application.Mapping.BaseManage
{
    /// <summary>
    /// 版 本
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创建人：J&M
    /// 日 期：2015.11.03 10:58
    /// 描 述：用户管理
    /// </summary>
    public class UserMap : EntityTypeConfiguration<UserEntity>
    {
        public UserMap()
        {
            #region 表、主键
            //表
            this.ToTable("Base_User");
            //主键
            this.HasKey(t => t.UserId);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
