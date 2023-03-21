﻿using API.DTOs;
using API.Entities;
using API.Repositories;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;

    public AccountController(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _userRepository.UserExit(registerDto.UserName!)) return BadRequest("Username is taken");

        var user = _mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.UserName!.ToLower();
       
        
        var rs = await _userRepository.AddUser(user, registerDto.Password);

        if (!rs.Succeeded) return BadRequest(rs.Errors);

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userRepository.GetUserByUsernameAsync(loginDto.UserName!);
        
        if (user == null) return Unauthorized("Invalid UserName");
        
        var addRs = await _userRepository.CheckUserLogin(user, loginDto.Password!);
        
        if (!addRs) return Unauthorized("Invalid Password");
        
        var roleRs = await _userRepository.AddUserRole(user, "Member");
        
        if (!roleRs.Succeeded) return BadRequest(roleRs.Errors);
        
        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            PhotoUrl = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
            KnownAs = user?.KnownAs,
            Gender = user?.Gender
        };
    }
}