using ApplicationFitness.Domain.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using WebApi.Controllers;
using WebApi.Dtos;
using WebApi.Repositories;
using WebApi.Services;
using Xunit.Sdk;

namespace TestFitnessApp
{
    [TestClass]
    public class TestOfProgramTypeController
    {
        private Mock<IMapper> _mockMapper;
        private Mock<IProgramTypeService> _mockTypeService;
        private ProgramTypeController _programTypeController;
        private List<ProgramType> _programTypes;
        

        [TestInitialize]
        public void Initializer()
        {
            _mockTypeService = new Mock<IProgramTypeService>();
            _mockMapper = new Mock<IMapper>(); 
            _programTypeController = new ProgramTypeController(_mockTypeService.Object,_mockMapper.Object);
            _mockMapper.Setup(m => m.Map<ProgramTypeDto>(It.IsAny<ProgramType>())).Returns((ProgramType type) => new ProgramTypeDto()
            {
                Name = type.Name
            });
            _programTypes = new List<ProgramType>()
            {
                new ProgramType
                {
                    Id = 1,
                    Name = "Slimming"
                },
                new ProgramType
                {
                    Id = 2,
                    Name = "Gaining muscles"
                }
            };

        }
        [TestMethod]
        [DataRow(1)]
        public void ShouldGetProgramTypeById(int id)
        {
            var expected = _programTypes.First(p => p.Id == id);
            _mockTypeService.Setup(m => m.GetProgramTypeById(It.IsAny<int>())).Returns(expected);
            var type = _programTypeController.Get(id) as OkObjectResult;
            var result = type.Value as ProgramTypeDto;
            Assert.AreEqual("Slimming", result.Name);
            Assert.AreEqual((int)HttpStatusCode.OK, type.StatusCode);

        }

        [TestMethod]
        public void ShouldGetAllProgramTypes()
        {
            var expected = _programTypes;
            _mockTypeService.Setup(m => m.GetProgramTypes()).Returns(expected);
            var types = _programTypeController.Get() as ObjectResult;
            var result = types.Value as List<ProgramTypeDto>;
            Assert.AreEqual(2, result.Count);
            Assert.AreEqual((int)HttpStatusCode.OK, types.StatusCode); 
        }
        [TestMethod]
        public void ShouldAddNewType()
        {
            var type = new ProgramType { Name = "Slimming for begginers" };
            _programTypes.Add(type);
            var expected = _programTypes;
            _mockTypeService.Setup(m => m.GetProgramTypes()).Returns(expected);
            _mockTypeService.Setup(m => m.AddNewProgramType(It.IsAny<CreateProgramTypeDto>())).Returns(type);    
            var controller = _programTypeController.Post(new CreateProgramTypeDto { Name = "Slimming for begginers" }) as ObjectResult;
            var result = controller.Value as ProgramTypeDto;
            Assert.AreEqual(result.Name, type.Name);
            Assert.AreEqual((int)HttpStatusCode.Created, controller.StatusCode);
        }
    }
}
