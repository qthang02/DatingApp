﻿using API.Extensions;
using API.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helper;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();
        if(!resultContext.HttpContext.User.Identity!.IsAuthenticated) return;
        
        var userId = resultContext.HttpContext.User.GetUserId();
        
        var repo = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();
        var user = await repo!.UserRepository.GetUserByIdAsync(userId);
        user!.LastActive = DateTime.Now;
        await repo.Complete();
    }
}