using System.Web.Mvc;
using Microsoft.Practices.Unity;
using LoboVaz.Services;
using LoboVaz.Domain.DAO;
using LoboVaz.Infra.DAO;

namespace LoboVaz
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();



            container.RegisterType<IContext, MongoContext>();

            container.RegisterType<IPostService, PostServiceImpl>();
            container.RegisterType<IPostDAO, PostDAOImpl>();

            container.RegisterType<IUserService, UserServiceImpl>();
            container.RegisterType<IUserDAO, UserDAOImpl>();

            DependencyResolver.SetResolver(new Microsoft.Practices.Unity.Mvc.UnityDependencyResolver(container));
        }
    }
}