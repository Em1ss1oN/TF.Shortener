using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using TF.Shortener.Controllers;
using TF.Shortener.Models;

namespace TF.Shortener.Tests.Controllers
{
    [TestClass]
    public class ShortControllerTest
    {
        [TestMethod]
        public async Task ShortenTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            linkGeneratorMock.Setup(g => g.GetNewShortLink()).Returns("short");

            var repositoryMock = new Mock<IUserLinksRepository>();
            repositoryMock.Setup(r => r.GetByUri(It.IsAny<Uri>())).Returns(Task.FromResult<ShortLink>(null));
            repositoryMock.Setup(r => r.Add(It.IsAny<ShortLink>(), It.IsAny<string>())).Returns(Task.CompletedTask);

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);

            var result = await controller.Shorten(new ShortenViewModel() { Link = new Uri("http://google.com")});
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<ShortLinkViewModel>));
            var ok = result as OkNegotiatedContentResult<ShortLinkViewModel>;
            Assert.AreEqual(new Uri("http://google.com"), ok.Content.Uri);
            Assert.AreEqual("short", ok.Content.ShortPath);
            Assert.AreEqual(0, ok.Content.Count);

            linkGeneratorMock.Verify(r => r.GetNewShortLink(), Times.Once);
            repositoryMock.Verify(r => r.GetByUri(It.IsAny<Uri>()), Times.Once);
            repositoryMock.Verify(r => r.Add(It.IsAny<ShortLink>(), It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public async Task ShortenAlreadyExistTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            linkGeneratorMock.Setup(g => g.GetNewShortLink());

            var repositoryMock = new Mock<IUserLinksRepository>();
            repositoryMock.Setup(r => r.GetByUri(It.IsAny<Uri>()))
                .Returns(Task.FromResult<ShortLink>(
                    Mock.Of<ShortLink>(link => link.ShortPath == "short" && link.Uri == "http://google.com" &&
                                               link.Count == 1 && link.CreateDate == DateTime.Now)));
            repositoryMock.Setup(r => r.Add(It.IsAny<ShortLink>(), It.IsAny<string>())).Returns(Task.CompletedTask); ;

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);

            var result = await controller.Shorten(new ShortenViewModel() { Link = new Uri("http://google.com") });
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<ShortLinkViewModel>));
            var ok = result as OkNegotiatedContentResult<ShortLinkViewModel>;
            Assert.AreEqual(new Uri("http://google.com"), ok.Content.Uri);
            Assert.AreEqual("short", ok.Content.ShortPath);
            Assert.AreEqual(1, ok.Content.Count);

            linkGeneratorMock.Verify(r => r.GetNewShortLink(), Times.Never);
            repositoryMock.Verify(r => r.GetByUri(It.IsAny<Uri>()), Times.Once);
            repositoryMock.Verify(r => r.Add(It.IsAny<ShortLink>(), It.IsAny<string>()), Times.Once);
        }

        [TestMethod]
        public async Task ShortenNonUriTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            var repositoryMock = new Mock<IUserLinksRepository>();

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);
            var result = await controller.Shorten(new ShortenViewModel() { Link = new Uri("google", UriKind.Relative) });
            Assert.IsInstanceOfType(result, typeof(BadRequestErrorMessageResult));
        }

        [TestMethod]
        public async Task ShortenNullTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            var repositoryMock = new Mock<IUserLinksRepository>();

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);
            var result = await controller.Shorten(null);
            Assert.IsInstanceOfType(result, typeof(BadRequestErrorMessageResult));
        }

        [TestMethod]
        public async Task GetTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            var repositoryMock = new Mock<IUserLinksRepository>();
            repositoryMock.Setup(r => r.GetByUser(It.IsNotIn("user")))
                .Returns(Task.FromResult(Enumerable.Empty<ShortLink>()));
            repositoryMock.Setup(r => r.GetByUser("user"))
                .ReturnsAsync(new[]
                {
                    new ShortLink() {Uri = "http://google.com", Count = 1, ShortPath = "short1"},
                    new ShortLink() {Uri = "http://contoso.com", Count = 2, ShortPath = "short2"}
                });

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);
            controller.RequestContext.Principal =
                Mock.Of<IPrincipal>(p => p.Identity ==
                                         Mock.Of<IIdentity>(i => i.IsAuthenticated == true && i.Name == "user"));

            var result = await controller.Get();
            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<IEnumerable<ShortLinkViewModel>>));
            var ok = result as OkNegotiatedContentResult<IEnumerable<ShortLinkViewModel>>;
            var vm = ok.Content.FirstOrDefault(v => v.ShortPath == "short1");
            Assert.IsNotNull(vm);
            Assert.AreEqual(1, vm.Count);
            Assert.AreEqual(new Uri("http://google.com"), vm.Uri);
            vm = ok.Content.FirstOrDefault(v => v.ShortPath == "short2");
            Assert.IsNotNull(vm);
            Assert.AreEqual(2, vm.Count);
            Assert.AreEqual(new Uri("http://contoso.com"), vm.Uri);
        }

        [TestMethod]
        public async Task RedirectTets()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            var repositoryMock = new Mock<IUserLinksRepository>();

            var link = new ShortLink() {Uri = "http://google.com", Count = 1, ShortPath = "short1"};
            repositoryMock.Setup(r => r.Get(It.IsAny<string>()))
                .ReturnsAsync(link);
            repositoryMock.Setup(r => r.Update(link)).Returns(Task.CompletedTask);

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);
            var result = await controller.Follow("short1");
            Assert.IsInstanceOfType(result, typeof(RedirectResult));
            var redirect = (RedirectResult) result;
            Assert.AreEqual(new Uri("http://google.com"), redirect.Location);
            Assert.AreEqual(2, link.Count);
            repositoryMock.Verify(r => r.Update(link), Times.Once);
        }

        [TestMethod]
        public async Task RedirectNotFoundTest()
        {
            var linkGeneratorMock = new Mock<IShortLinkGenerator>();
            var repositoryMock = new Mock<IUserLinksRepository>();

            repositoryMock.Setup(r => r.Get(It.IsAny<string>())).Returns(Task.FromResult<ShortLink>(null));
            repositoryMock.Setup(r => r.Update(It.IsAny<ShortLink>())).Returns(Task.CompletedTask);

            var controller = new ShortController(repositoryMock.Object, linkGeneratorMock.Object);
            var result = await controller.Follow("short1");
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
            repositoryMock.Verify(r => r.Get(It.IsAny<string>()), Times.Once);
            repositoryMock.Verify(r => r.Update(It.IsAny<ShortLink>()), Times.Never);
        }
    }
}
