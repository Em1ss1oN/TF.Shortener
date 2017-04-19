using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TF.Shortener.Models;

namespace TF.Shortener.Controllers
{
    [Authorize]
    public class ShortController : ApiController
    {
        private readonly IUserLinksRepository _repository;
        private readonly IShortLinkGenerator _generator;

        public ShortController(IUserLinksRepository repository, IShortLinkGenerator generator)
        {
            _repository = repository;
            _generator = generator;
        }

        // GET api/<controller>
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            var links = await _repository.GetByUser(User.Identity.Name);
            return Ok(links.Select(l => l.ToViewModel()));
        }

        // GET /5adb452a
        [AllowAnonymous]
        [Route("{id}")]
        [HttpGet]
        public async Task<IHttpActionResult> Follow(String id)
        {
            var link = await _repository.Get(id);
            if (link == null)
            {
                return NotFound();
            }

            link.Count++;
            await _repository.Update(link);

            return Redirect(link.Uri);
        }

        // POST api/<controller>
        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> Shorten([FromBody]ShortenViewModel model)
        {
            if (model == null || !model.Link.IsAbsoluteUri)
            {
                return BadRequest(@"It is not a valid Url");
            }

            var user = User.Identity.IsAuthenticated ? User.Identity.Name : String.Empty;
            var link = await _repository.GetByUri(model.Link);

            if (link == null)
            {
                link = new ShortLink();
                string linkText;
                while (true)
                {
                    linkText = _generator.GetNewShortLink();
                    if (await _repository.Get(linkText) == null)
                    {
                        break;
                    }
                }

                link.Count = 0;
                link.CreateDate = DateTime.UtcNow;
                link.ShortPath = linkText;
                link.Uri = model.Link.ToString();
            }

            await _repository.Add(link, user);
            return Ok(link.ToViewModel());
        }
    }
}