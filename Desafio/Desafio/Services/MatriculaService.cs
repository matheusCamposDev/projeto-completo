using AutoMapper;
using Desafio.DTO.CursoDTO;
using Desafio.DTO.MatriculaDTO;
using Desafio.Interfaces.IMatricula;
using Desafio.Models;
using Microsoft.EntityFrameworkCore;

namespace Desafio.Services
{
    public class MatriculaService : IMatriculaService
    {
        private readonly APIContext _context;
        private readonly IMapper _mapper;

        public MatriculaService(APIContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MatriculaReadDTO> CreateAsync(MatriculaCreateDTO dto)
        {
            var exists = await _context.Matriculas
            .AnyAsync(m => m.AlunoId == dto.AlunoId && m.CursoId == dto.CursoId);

            if (exists)
                throw new InvalidOperationException("Aluno já está matriculado neste curso.");

            var alunoExists = await _context.Alunos.AnyAsync(a => a.Id == dto.AlunoId);
            var cursoExists = await _context.Cursos.AnyAsync(c => c.Id == dto.CursoId);

            if (!alunoExists || !cursoExists)
                throw new InvalidOperationException("Aluno ou Curso não encontrado.");

            var matricula = _mapper.Map<Matricula>(dto);

            _context.Matriculas.Add(matricula);
            await _context.SaveChangesAsync();

            await _context.Entry(matricula).Reference(m => m.Aluno).LoadAsync();
            await _context.Entry(matricula).Reference(m => m.Curso).LoadAsync();

            return _mapper.Map<MatriculaReadDTO>(matricula);
        }

        public async Task<IEnumerable<MatriculaReadDTO>> GetAllMatriculaAsync()
        {
            IEnumerable<Matricula> matriculas = await _context.Matriculas
                .Include(m => m.Aluno)
                .Include(m => m.Curso)
                .ToListAsync();

            return _mapper.Map<IEnumerable<MatriculaReadDTO>>(matriculas);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var matricula = await _context.Matriculas.FirstOrDefaultAsync(m => m.Id == id);
            if (matricula == null)
                return false;

            _context.Matriculas.Remove(matricula);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
