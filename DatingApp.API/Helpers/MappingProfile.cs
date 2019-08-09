using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserForListDto>()
               .ForMember(dest => dest.PhotoUrl, act =>
               {
                   act.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain) != null ?
                   src.Photos.FirstOrDefault(p => p.IsMain).Url : null);
               })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });

            ;
            CreateMap<User, UserForDetailsDto>()
                .ForMember(dest => dest.PhotoUrl, act =>
            {
                // act.MapFrom((src, x) => src.Photos.FirstOrDefault(p => p.IsMain)?.Url);
                act.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain) != null ?
                  src.Photos.FirstOrDefault(p => p.IsMain).Url : null);
            })
            .ForMember(dest => dest.Age, opt => {
                opt.MapFrom(d => d.DateOfBirth.CalculateAge());
            });

            CreateMap<UserForUpdateDto,User>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoToReturnDto>();
            CreateMap<Message, MessageForCreationDto>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(des => des.SenderPhotoUrl, opt =>
                 opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url))
                 .ForMember(des => des.RecipientPhotoUrl, opt =>
                 {
                     opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url);
                 });
        }
    }
}
