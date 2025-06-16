using AutoMapper;
using Desafio.DTO.AlunoDTO;
using Desafio.Interfaces.Aluno;
using Desafio.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Desafio.Services
{
    public class AlunoService : IAlunoService
    {
        private readonly APIContext _context;
        private readonly IMapper _mapper;

        public AlunoService(APIContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AlunoReadDTO> CreateAsync(AlunoCreateDTO dto)
        {
            var aluno = _mapper.Map<Aluno>(dto);
            
            await _context.AddAsync(aluno);
            
            await _context.SaveChangesAsync();
            
            return _mapper.Map<AlunoReadDTO>(aluno);
        }

        public async Task<List<AlunoReadDTO>> GetAllAsync()
        {
            var alunos = await _context.Alunos.ToListAsync();
            
            return _mapper.Map<List<AlunoReadDTO>>(alunos);
        }

        public async Task<AlunoReadDTO?> GetByFiltersAsync(string name, string email, DateTime dataNascimento)
        {
            var aluno = await _context.Alunos.FirstOrDefaultAsync(a =>
            a.Name == name &&
            a.Email == email &&
            a.DataNascimento.Date == dataNascimento.Date);

            return aluno != null ? _mapper.Map<AlunoReadDTO>(aluno) : null;
        }

        public async Task<AlunoReadDTO?> UpdateAsync(int id, AlunoUpdateDTO dto)
        {
            var aluno = await _context.Alunos.FirstOrDefaultAsync(a => a.Id == id);

            if (aluno == null) return null;

            _mapper.Map(dto, aluno);

            await _context.SaveChangesAsync();

            return _mapper.Map<AlunoReadDTO>(aluno);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var aluno = await _context.Alunos.FirstOrDefaultAsync(a => a.Id == id);

            if (aluno == null) return false;
            
            _context.Alunos.Remove(aluno);

            await _context.SaveChangesAsync();
            
            return true;
        }
    }
}
