using ApplicationFitness.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using WebApi;

namespace TestFitnessApp
{
    [TestClass]
    public class IntegrationTest
    {
        private readonly HttpClient _client;
        public IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>();
            _client = appFactory.CreateClient();
        }

        [TestMethod]
        public async Task ShouldAccess_GetTypeById()
        {
            var request = "/api/ProgramType/1";
            var response = await _client.GetAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var jsonFromPostResponse = await response.Content.ReadAsStringAsync();
                var obj = JsonConvert.DeserializeObject<ProgramType>(jsonFromPostResponse);
                Assert.AreEqual("Slimming", obj.Name);
            }
            response.EnsureSuccessStatusCode();
        }
        [TestMethod]
        public async Task ShouldAccess_GetAllTypes()
        {
            var request = "/api/ProgramType";
            var response = await _client.GetAsync(request);
            response.EnsureSuccessStatusCode();
            var jsonFromPostResponse = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<List<ProgramType>>(jsonFromPostResponse);
            Assert.IsTrue(obj.Count == 3);
        }

        [TestMethod]
        public async Task ShouldAccess_AddNewProgramType()
        {
            var request = new
            {
                Url = "api/ProgramType",
                Body = new
                {
                    Name = "Gaining muscle for advanced"
                }
            };
            var postResponse = await _client.PostAsync(request.Url, ContentHelper.GetStringContent(request.Body));
            postResponse.EnsureSuccessStatusCode();

        }
        [TestMethod]
        public async Task Should_DeleteProgramType()
        {
            var request = "/api/ProgramType/7";
            var deleteResponse = await _client.DeleteAsync(request);
            deleteResponse.EnsureSuccessStatusCode();
        }
    }
}
