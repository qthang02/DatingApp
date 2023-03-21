using API.DTOs;
using API.Entities;
using API.Helper;
using Microsoft.AspNetCore.Identity;

namespace API.Repositories;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto> GetMemberAsync(string username);
    Task<bool> UserExit(string username);
    Task<IdentityResult> AddUser(AppUser user, string password);
    Task<bool> CheckUserLogin(AppUser user, string password);
    Task<AppUser> GetUserByIdAsync(int id);
    Task<IdentityResult> AddUserRole(AppUser user, string role);
}