using LeaRun.Application.Entity.CollegeMIS;
using System.Data.Entity.ModelConfiguration;

namespace LeaRun.Application.Mapping.CollegeMIS
{
    /// <summary>
    /// 版 本
    /// Copyright (c) 2013-2016 北京泉江科技有限公司
    /// 创 建：admin
    /// 日 期：2017-08-11 14:25
    /// 描 述：学生换班记录
    /// </summary>
    public class BK_StuChangeClassRecMap : EntityTypeConfiguration<BK_StuChangeClassRecEntity>
    {
        public BK_StuChangeClassRecMap()
        {
            #region 表、主键
            //表
            this.ToTable("BK_StuChangeClassRec");
            //主键
            this.HasKey(t => t.ID);
            #endregion

            #region 配置关系
            #endregion
        }
    }
}
