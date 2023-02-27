using API.Data;
using API.DTOs;
using API.Entities;
using API.Helper;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    
    public void Update(AppUser user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
        return (await _context.Users!
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username))!;
    }

    public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
    {
        var query = _context.Users
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .AsNoTracking();


        return await PagedList<MemberDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<MemberDto> GetMemberAsync(string username)
    {
        return (await _context.Users!
            .Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync())!;
    }
    
    public async Task<bool> UserExit(string username)
    {
        return await _context.Users!.AnyAsync(x => x.UserName == username.ToLower());
    }

    public void AddUser(AppUser user)
    {
        _context.Users!.Add(user);
    }
}