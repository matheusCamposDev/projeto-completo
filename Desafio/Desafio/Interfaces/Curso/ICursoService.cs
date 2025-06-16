using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;

namespace Desafio.Interfaces.Curso
{
    public interface ICursoService
    {
        Task<CursoReadDTO> CreateAsync(CursoCreateDTO dto);
        Task<List<CursoReadDTO>> GetAllAsync();
        Task<CursoReadDTO?> GetByIdAsync(int id);
        Task<CursoReadDTO?> UpdateAsync(int id, CursoUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
