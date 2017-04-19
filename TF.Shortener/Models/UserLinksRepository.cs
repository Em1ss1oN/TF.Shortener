using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using System.Web;

namespace TF.Shortener.Models
{
    public interface IUserLinksRepository : IDisposable
    {
        Task<ShortLink> Get(string id);
        Task Add(ShortLink link, string userId);
        Task Update(ShortLink link);
        Task<bool> Delete(string id, string userId);
        Task<IEnumerable<ShortLink>> GetByUser(string userId);
        Task<IEnumerable<ShortLink>> GetAll();
        Task<ShortLink> GetByUri(Uri uri);
    }

    public class UserLinksRepository : IUserLinksRepository
    {
        private readonly ApplicationDbContext _context;

        public UserLinksRepository(ApplicationDbContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            _context = context;
        }

        public async Task<IEnumerable<ShortLink>> GetAll()
        {
            return await Task.FromResult(_context.ShortLinks);
        }

        public async Task<ShortLink> GetByUri(Uri uri)
        {
            var uriString = uri.ToString();
            return await _context.ShortLinks.FirstOrDefaultAsync(s => s.Uri == uriString);
        }

        public async Task<ShortLink> Get(string id)
        {
            return await _context.ShortLinks.FindAsync(id);
        }

        public async Task Add(ShortLink link, string userId)
        {
            if (link == null)
            {
                throw new ArgumentNullException(nameof(link));
            }

            if (_context.Entry(link).State == EntityState.Detached)
            {
                _context.ShortLinks.Add(link);
            }

            if (!String.IsNullOrEmpty(userId))
            {
                var user = await GetUserById(userId);
                if (user != null && user.UserLinks.All(l => l.ShortPath != link.ShortPath))
                {
                    user.UserLinks.Add(link);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task Update(ShortLink link)
        {
            if (link == null)
            {
                throw new ArgumentNullException(nameof(link));
            }

            if (_context.Entry(link).State == EntityState.Detached)
            {
                _context.ShortLinks.Attach(link);
                _context.Entry(link).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();
        }

        private async Task<ApplicationUser> GetUserById(string userId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName == userId);
        }

        public async Task<bool> Delete(string id, string userId)
        {
            if (String.IsNullOrEmpty(id))
            {
                throw new ArgumentException(nameof(id));
            }

            if (String.IsNullOrEmpty(userId))
            {
                throw new ArgumentException(nameof(userId));
            }

            var user = await GetUserById(userId);
            if (user == null)
            {
                return false;
            }

            var item = await Get(id);
            if (item == null)
            {
                return false;
            }

            user.UserLinks.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> Delete(string id)
        {
            var item = await Get(id);
            if (item == null)
            {
                return false;
            }

            _context.ShortLinks.Remove(item);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<IEnumerable<ShortLink>> GetByUser(string userId)
        {
            var user = await GetUserById(userId);
            return user?.UserLinks ?? Enumerable.Empty<ShortLink>();
        }

        public void Dispose()
        {
            _context?.Dispose();
        }
    }
}