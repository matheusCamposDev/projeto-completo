using Desafio.DTO.AlunoDTO;

namespace Desafio.Interfaces.Aluno
{
    public interface IAlunoService
    {
        Task<AlunoReadDTO> CreateAsync(AlunoCreateDTO dto);
        Task<List<AlunoReadDTO>> GetAllAsync();
        Task<AlunoReadDTO?> GetByFiltersAsync(string name, string email, DateTime dataNascimento);
        Task<AlunoReadDTO?> UpdateAsync(int id, AlunoUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
