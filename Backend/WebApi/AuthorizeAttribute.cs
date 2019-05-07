using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi
{
    /*this do for when role are not authorize for some api method it give status code as 401 unauthorize. bu it should 
    give as 403-forbidden
    */
    public class AuthorizeAttribute: System.Web.Http.AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            //check whether user authenticated using user name and password
            if (!HttpContext.Current.User.Identity.IsAuthenticated)
            {
                base.HandleUnauthorizedRequest(actionContext);
            }
            else
            {
                actionContext.Response = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Forbidden);
            }
        }
    }
}