using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        
        // add many to many relations
        public ICollection<ActivityAttendee> Activities { get; set; }
        
        public ICollection<Photo> Photos { get; set; }
    }
}