using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Launavernd2.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public JsonResult GetIdgjald(int aldur, bool reykir)
        {
            int[] reyklausmadur = new int[] {1133, 1133, 1184, 1242, 1300, 1365, 1437, 1517, 1602, 1693, 1792, 1909, 2042, 2193, 2363, 2553, 2763, 2998, 3255, 3540, 3867, 4233, 4636,5082, 5571, 6145, 6821, 7573, 8382, 9224, 10113, 11075, 12226, 13452, 14736, 16129, 17640, 19317, 21084, 22957, 25236, 28121, 30554, 33201, 36080, 39213, 42621, 46330, 50364, 54753, 59528, 64723};
            int[] reykingamadur = new int[] {1221, 1221, 1283, 1348, 1411, 1483, 1565, 1655, 1753, 1858, 1974, 2111, 2314, 2555, 2825, 3146, 3507, 3844, 4188, 4543, 5008, 5560, 6209, 7010, 7890, 8925, 10513, 12378, 14453, 16282, 18020, 19595, 20973, 22407, 23928, 25584, 27745, 30185, 33500, 36698, 39790, 43500, 46983, 50465, 54352, 58535, 63036, 67879, 73090, 78694, 84722, 91204};

            if(aldur < 18 || aldur > 69)
                return Json(false, JsonRequestBehavior.AllowGet);

            int idgjald;
            if (reykir)
            {
                idgjald = reykingamadur[aldur - 18];
            }
            else 
            {
                idgjald = reyklausmadur[aldur - 18];
            }

            return Json(idgjald, JsonRequestBehavior.AllowGet);
        }
    }
}