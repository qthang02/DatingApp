﻿using API.Data;
using API.DTOs;
using API.Entities;
using API.Helper;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;

    public UserRepository(DataContext context, IMapper mapper, UserManager<AppUser> userManager)
    {
        _context = context;
        _mapper = mapper;
        _userManager = userManager;
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
        return (await _userManager.Users!
            .Include(p => p.Photos)
            .SingleOrDefaultAsync(x => x.UserName == username))!;
    }

    public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
    {
        var query = _context.Users!.AsQueryable();

        query = query.Where(u => u.UserName != userParams.CurrentUsername);
        query = query.Where(u => u.Gender == userParams.Gender);

        var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
        var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));

        query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
        
        query = userParams.OrderBy switch
        {
            "created" => query.OrderByDescending(u => u.Created),
            _ => query.OrderByDescending(u => u.LastActive)
        };

        return await PagedList<MemberDto>.CreateAsync(
            query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider), 
            userParams.PageNumber, 
            userParams.PageSize);
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

    public async Task<IdentityResult> AddUser(AppUser user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }

    public async Task<bool> CheckUserLogin(AppUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return (await _context.Users!.FindAsync(id))!;
    }
}