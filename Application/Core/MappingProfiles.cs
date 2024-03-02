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
                .ForMember(d => d.Username, o => o.MapFrom(aa => aa.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(aa => aa.AppUser.DisplayName));

            // public string Image { get; set; } => p.Photos.FirstOrDefault(x => x.IsMain).Url
            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(p => p.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}