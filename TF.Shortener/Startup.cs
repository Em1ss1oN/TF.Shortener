using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TF.Shortener.Startup))]
namespace TF.Shortener
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
