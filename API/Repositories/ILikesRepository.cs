﻿using API.DTOs;
using API.Entities;

namespace API.Repositories;

public interface ILikesRepository
{
    Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
    Task<AppUser> GetUserWithLikes(int userId);
    Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);
}