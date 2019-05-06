using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using WebApi.Models;
using WebApi.ViewModels;

namespace WebApi.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        //[Route("api/Account/Register")]
        [Route("Register")]
        [HttpPost]
        public IdentityResult Register(AccountModel model)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);

            var user = new ApplicationUser() {UserName = model.UserName, Email = model.Email};
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;

            //validate Password according to our = default min = 6
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 3,
                RequireDigit = false,
                RequireLowercase = false,
                RequireNonLetterOrDigit = false,
                RequireUppercase = false
            };

            //Heare create User
            IdentityResult result = manager.Create(user, model.Password);

            return result;
        }
    }
}
