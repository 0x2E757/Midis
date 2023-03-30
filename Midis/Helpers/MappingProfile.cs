using AutoMapper;
using Midis.DTOs;
using Midis.Models;

namespace Midis.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserModel, UserDTO>();
        }
    }
}
