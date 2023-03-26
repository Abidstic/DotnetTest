using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController: BaseController
    {
        private readonly DataContext _context;
        public AccountController(DataContext context)
        {
            _context = context;
            
        }

        [HttpPost("register")] //api/account/register

        public async Task<ActionResult<AppUser>> Register (string username, string passowrd)
        {
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName= username,
                PasswordHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(passowrd)),
                PasswordSalt= hmac.Key
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return user;
        }


        


        
    }
}