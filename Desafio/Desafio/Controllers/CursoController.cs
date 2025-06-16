using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using Desafio.Interfaces.Aluno;
using Desafio.Interfaces.Curso;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Desafio.Controllers
{
    [Route("api/")]
    [ApiController]
    public class CursoController : ControllerBase
    {
        private readonly ICursoService _service;

        public CursoController(ICursoService service)
        {
            _service = service;
        }

        [HttpPost("curso")]
        public async Task<IActionResult> CretaeCurso([FromBody] CursoCreateDTO dto, [FromServices] IValidator<CursoCreateDTO> validator)
        {
            var result = validator.Validate(dto);

            if (!result.IsValid)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.ErrorMessage) });
            }

            var curso = await _service.CreateAsync(dto);

            return Ok(curso);

        }

        [HttpGet("cursos")]
        public async Task<IActionResult> GetCursos()
        {
            IEnumerable<CursoReadDTO> cursos = await _service.GetAllAsync();

            return Ok(cursos);
        }

        [HttpGet("curso/{id}")]
        public async Task<IActionResult> GetCurso(int id)
        {
            var curso = await _service.GetByIdAsync(id);

            if (curso == null)
                return NotFound(new { message = "Curso não encontrado." });

            return Ok(curso);
        }

        [HttpPut("curso/{id}")]
        public async Task<IActionResult> UpdateCurso(int id, [FromBody] CursoUpdateDTO dto, [FromServices] IValidator<CursoUpdateDTO> validator)
        {
            var result = validator.Validate(dto);

            if (!result.IsValid)
                return BadRequest(new { errors = result.Errors.Select(e => e.ErrorMessage) });

            var curso = await _service.UpdateAsync(id, dto);

            if (curso == null)
                return NotFound(new { message = "Aluno não encontrado." });

            return Ok(curso);
        }

        [HttpDelete("curso/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool curso = await _service.DeleteAsync(id);

            if (!curso)
                return NotFound(new { message = "Curso não encontrado." });

            return NoContent();
        }
    }
}
