using ApplicationFitness.Domain.Models;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Dtos;
using WebApi.Sorting;

namespace WebApi.Services
{
    public interface IProgramTypeService
    {
        List<ProgramType> GetProgramTypes();

        ProgramType GetProgramByName(string name);

        ProgramType AddNewProgramType(CreateProgramTypeDto dto);

        ProgramType UpdateProgramTypeDetails(int id, UpdateProgramTypeDto dto);

        ProgramType UpdateProgramType(int id, ProgramTypeDto dto);

        bool RemoveProgramTypeById(int id);
        IEnumerable<ProgramType> GetTypesFiltered(FilterModel filter);
        ProgramType GetProgramTypeById(int id);
        ProgramType GetProgramTypeScheduleId(int id);
    }
}
