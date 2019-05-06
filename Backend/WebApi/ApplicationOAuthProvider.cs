using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using WebApi.Models;

namespace WebApi
{
    //validate user from given username and password
    public class ApplicationOAuthProvider:OAuthAuthorizationServerProvider
    {
        //authenticate the client by client device based on the given client id and secret code
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        //validate using username and password
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
            var userManager = new UserManager<ApplicationUser>(userStore);
            var user = await userManager.FindAsync(context.UserName, context.Password);
            if (user != null)
            {
                //add claims related to the logged in user
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                //these value stored in a key value pair inside the application
                identity.AddClaim(new Claim("UserName",user.UserName));
                identity.AddClaim(new Claim("Email",user.Email));
                identity.AddClaim(new Claim("FirstName",user.FirstName));
                identity.AddClaim(new Claim("LastName",user.LastName));
                identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));

                //now validate user
                context.Validated(identity);


            }
            else
            {
                return;
            }
        }
    }
}