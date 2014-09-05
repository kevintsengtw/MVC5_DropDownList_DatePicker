using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DropDiwnList_DatePicker.Models;

namespace DropDiwnList_DatePicker.Controllers
{
    public class DemoController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Sample1()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.1

            return View();
        }

        public ActionResult Sample2()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.2

            return View();
        }

        [HttpPost]
        public ActionResult Sample2(Demo1Model model)
        {
            DateTime dirthDate = model.BirthDate;
            return View(model);
        }

        public ActionResult Sample3()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.3 - Editor Templates

            return View();
        }

        public ActionResult Sample4()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.4 - Editor Templates

            return View();
        }

        public ActionResult Sample5()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.5 - Editor Templates

            return View();
        }


        public ActionResult Sample7()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 Part.7 - Validation

            return View();
        }

        public ActionResult Sample8()
        {
            //ASP.NET MVC - 下拉選單的日期選擇器 - 年齡限制

            return View();
        }
    }
}