using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    // AutoMapper
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees
                    .FirstOrDefault(x => x.IsHost).AppUser.UserName));
                    
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(p => p.Username, o => o.MapFrom(aa => aa.AppUser.UserName))
                .ForMember(p => p.DisplayName, o => o.MapFrom(aa => aa.AppUser.DisplayName));
        }
    }
}