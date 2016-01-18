using System.Web;
using System.Web.Optimization;

namespace LoboVaz
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/jq").Include(
                        "~/js/jquery-{version}.min.js"));

            bundles.Add(new ScriptBundle("~/js/jqval").Include(
                        "~/js/jquery.validate.min.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/js/mdrnzr").Include(
                        "~/js/modernizr-*"));

            bundles.Add(new ScriptBundle("~/js/btstrp").Include(
                      "~/js/bootstrap.js"));


            //          < script src = "../../js/modernizr-2.6.2.js" ></ script >
            //< script src = "../../js/jquery.validate.min.js" ></ script >
            // < script src = "../../js/bootstrap.min.js" ></ script >
            //  < script src = "../../js/jquery.flexslider.js" ></ script >
            //   < script src = "../../js/jquery-scrollToTop.js" ></ script >
            //    < script src = "../../js/classie.js" ></ script >
            //     < script src = "../../js/velocity.min.js" ></ script >
            //      < script src = "../../js/velocity.ui.js" ></ script >
            //       < script src = "../../js/progressButton.js" ></ script >
            //        < script src = "~/node_modules/tinymce/tinymce.min.js" ></ script >
            //         < script src = "../../js/waypoints.min.js" ></ script >
            //          < script src = "../../js/scripts.js" ></ script >

            bundles.Add(new ScriptBundle("~/js/Home").Include(
                     "~/js/jquery.flexslider.js",
                     //"~/js/jquery-scrollToTop.js",
                     "~/js/classie.js",
                     "~/js/velocity.min.js",
                     "~/js/velocity.ui.js",
                     "~/js/progressButton.js",
                     "~/node_modules/tinymce/tinymce.min.js",
                     "~/js/waypoints.min.js",
                     "~/js/responsive-video.js",
                     "~/js/scripts.js"
                     ));

            bundles.Add(new StyleBundle("~/css/Home").Include(
                      "~/css/bootstrap.min.css",
                      "~/css/bootstrap-theme.min.css",
                     "~/css/styles.css",
                      "~/css/queries.css",
                      "~/css/flexslider.css",
                        "~/css/grid.css",
                        "~/css/submitButton.css",
                        //"~/css/scrollToTop.css",
                        "~/css/easing.css",
                        "~/css/helpers.css",
                        "~/css/animate.css"
                        
                      ));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}
