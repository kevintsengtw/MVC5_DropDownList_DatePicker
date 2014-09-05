using System.Web;
using System.Web.Mvc;

namespace DropDiwnList_DatePicker
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
