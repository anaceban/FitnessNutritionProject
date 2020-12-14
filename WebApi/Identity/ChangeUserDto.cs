using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Identity
{
    public class ChangeUserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}
