using API.Data;
using API.Entities;
using API.Extensions;
using API.Middleware;
using API.SignalR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(policyBuilder => policyBuilder.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<DataContext>();
    var userManager = service.GetRequiredService<UserManager<AppUser>>();
    var roleManager = service.GetRequiredService<RoleManager<AppRole>>();
    await context.Database.MigrateAsync();
    await context.Database.ExecuteSqlRawAsync("DELETE FROM [Connections]");
    await Seed.SeedUsers(userManager, roleManager);
}
catch (Exception ex)
{
    var logger = service.GetService<ILogger<Program>>();
    logger?.LogError(ex, "An error occurred during migration");
}

app.UseAuthentication();
app.UseHttpsRedirection();
app.MapControllers();
app.UseAuthorization();
app.MapControllers();
app.MapHub<PresenceHub>("hubs/presence");
app.MapHub<MessageHub>("hubs/message");

app.Run();