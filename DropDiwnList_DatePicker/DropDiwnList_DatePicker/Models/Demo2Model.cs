using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DropDiwnList_DatePicker.Models
{
    public class Demo2Model
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
        [AdditionalMetadata("TaiwanCalendarYear", true)]
        [AdditionalMetadata("YearStart", 1912)]
        [AdditionalMetadata("YearEnd", 2015)]
        [AdditionalMetadata("YearOption", "年")]
        [AdditionalMetadata("MonthOption", "月")]
        [AdditionalMetadata("DayOption", "日")]
        public DateTime BirthDate { get; set; } 

    }
}