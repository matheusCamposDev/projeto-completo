using AutoMapper;
using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using Desafio.Interfaces.Aluno;
using Desafio.Interfaces.Curso;
using Desafio.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Desafio.Services
{
    public class CursoService : ICursoService
    {
        private readonly APIContext _context;
        private readonly IMapper _mapper;

        public CursoService(APIContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CursoReadDTO> CreateAsync(CursoCreateDTO dto)
        {
            var curso = _mapper.Map<Curso>(dto);

            await _context.AddAsync(curso);

            await _context.SaveChangesAsync();

            return _mapper.Map<CursoReadDTO>(curso);
        }

        public async Task<List<CursoReadDTO>> GetAllAsync()
        {
            var cursos = await _context.Cursos.ToListAsync();

            return _mapper.Map<List<CursoReadDTO>>(cursos);
        }

        public async Task<CursoReadDTO?> GetByIdAsync(int id)
        {
            var curso = await _context.Cursos.FirstOrDefaultAsync(a => a.Id == id);

            return curso != null ? _mapper.Map<CursoReadDTO>(curso) : null;
        }

        public async Task<CursoReadDTO?> UpdateAsync(int id, CursoUpdateDTO dto)
        {
            var curso = await _context.Cursos.FirstOrDefaultAsync(a => a.Id == id);

            if (curso == null) return null;

            _mapper.Map(dto, curso);

            await _context.SaveChangesAsync();

            return _mapper.Map<CursoReadDTO>(curso);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var curso = await _context.Cursos.FirstOrDefaultAsync(a => a.Id == id);

            if (curso == null) return false;

            _context.Cursos.Remove(curso);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}
