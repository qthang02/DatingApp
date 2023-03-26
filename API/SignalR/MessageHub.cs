﻿using API.Extensions;
using API.Repositories;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR;

public class MessageHub : Hub
{
    private readonly IMessageRepository _messageRepository;

    public MessageHub(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var otherUser = httpContext!.Request.Query["user"].ToString();
        var groupName = GetGroupName(Context.User!.GetUsername(), otherUser);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        
        var messages = await _messageRepository.GetMessageThread(Context.User!.GetUsername(), otherUser);
        
        await Clients.Groups(groupName).SendAsync("ReceiveMessageThread", messages);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        return base.OnDisconnectedAsync(exception);
    }

    private string GetGroupName(string? identityName, string otherUser)
    {
        var stringCompare = string.CompareOrdinal(identityName, otherUser) < 0;
        return stringCompare ? $"{identityName}-{otherUser}" : $"{otherUser}-{identityName}";
    }
}