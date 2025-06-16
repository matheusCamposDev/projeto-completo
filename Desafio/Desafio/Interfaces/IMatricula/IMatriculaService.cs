using Desafio.DTO.MatriculaDTO;
using Desafio.Models;

namespace Desafio.Interfaces.IMatricula
{
    public interface IMatriculaService
    {
        Task<MatriculaReadDTO> CreateAsync(MatriculaCreateDTO dto);
        Task<IEnumerable<MatriculaReadDTO>> GetAllMatriculaAsync();
        Task<bool> DeleteAsync(int id);
    }
}
