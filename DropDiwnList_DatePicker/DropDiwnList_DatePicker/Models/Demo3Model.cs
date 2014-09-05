using DropDiwnList_DatePicker.Infrastructure;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DropDiwnList_DatePicker.Models
{
    public class Demo3Model
    {
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Name { get; set; }

        [Required]
        [StringLength(128)]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [AgeRange(MinAge = 18, MaxAge = 65, ErrorMessage = "年齡限制為 18 ~ 65 歲.")]
        //[MinAge(18, ErrorMessage = "未滿 18 歲是不行的喔！")]
        //[MaxAge(65, ErrorMessage = "不可以超過 65 歲喔！")]
        [AdditionalMetadata("TaiwanCalendarYear", true)]
        [AdditionalMetadata("YearStart", 1912)]
        [AdditionalMetadata("YearEnd", 2015)]
        [AdditionalMetadata("YearOption", "年")]
        [AdditionalMetadata("MonthOption", "月")]
        [AdditionalMetadata("DayOption", "日")]
        public DateTime BirthDate { get; set; } 

    }
}