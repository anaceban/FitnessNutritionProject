using ApplicationFitness.Domain.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Repositories;

namespace WebApi.Services.Interfaces
{
    public class AdviceService : IAdviceService
    {
        private readonly IRepository<ProgramAdvice> _adviceRepository;
        private readonly IMapper _mapper;
        public AdviceService(IRepository<ProgramAdvice> adviceRepository, IMapper mapper)
        {
            _adviceRepository = adviceRepository;
            _mapper = mapper;
        }
        public IEnumerable<ProgramAdviceDto> GetProgramAdvices()
        {
            var advices = _adviceRepository.GetAll();
            return _mapper.Map<List<ProgramAdviceDto>>(advices);
        }
    }
}
