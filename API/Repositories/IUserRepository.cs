using API.DTOs;
using API.Entities;
using API.Helper;

namespace API.Repositories;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<AppUser> GetUserByUsernameAsync(string username);
    Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    Task<MemberDto> GetMemberAsync(string username);
    Task<bool> UserExit(string username);
    Task<AppUser> GetUserByIdAsync(int id);
    Task<string> GetUserGender(string username);
}