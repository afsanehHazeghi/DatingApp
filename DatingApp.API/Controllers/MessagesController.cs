using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public MessagesController(IDatingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet("{id}",Name ="GetMessage")]
        public async Task<IActionResult> GetMessage(int userId , int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);
            if (message == null)
                return NotFound();
            var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
            return Ok(messageToReturn);
        }

        [HttpGet]
        public async Task<IActionResult> GetMessages(int userId,[FromQuery]MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageParams.UserId = userId;
            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);

            var messagesToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);
            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, messagesFromRepo.ItemCount, messagesFromRepo.TotalPages);

            return Ok(messagesToReturn);
        }

        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messages = await _repo.GetMessageThread(userId, recipientId);
            var messagesToReturn = _mapper.Map<IEnumerable<MessageToReturnDto>>(messages);
            return Ok(messagesToReturn);
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage(int userId, MessageForCreationDto messageForCreationDto)
        {
            var sender= await _repo.GetUser(userId);
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);
            if (recipient == null)
                return BadRequest("Couldn`t find user");

            messageForCreationDto.SenderId = userId;
            var message = _mapper.Map<Message>(messageForCreationDto);
            _repo.Add<Message>(message);
            if(await _repo.SaveAll())
            {
                 var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("GetMessage", new { id = message.Id }, messageToReturn);
            }
            throw new Exception("Faild on creation message");
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);
            if(message == null)
            {
                return NotFound();
            }
            if (userId == message.SenderId)
                message.SenderDeleted = true;

            if (userId == message.RecipientId)
                message.RecpientDeleted = true;

            if (message.SenderDeleted && message.RecpientDeleted)
                _repo.Delete(message);

            if (await _repo.SaveAll())
                return NoContent();
            throw new Exception("cannot delete the message!!");
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkAsReadMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);
            if (message == null)
            {
                return NotFound();
            }

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("cannot read mark the message!!");
        }
        }
}





