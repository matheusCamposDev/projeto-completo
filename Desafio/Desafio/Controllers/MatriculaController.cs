using Desafio.DTO.MatriculaDTO;
using Desafio.Interfaces.IMatricula;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Desafio.Controllers
{
    [Route("api/")]
    [ApiController]
    public class MatriculaController : ControllerBase
    {
        private readonly IMatriculaService _service;

        public MatriculaController(IMatriculaService service)
        {
            _service = service;
        }

        [HttpPost("matriculas")]
        public async Task<IActionResult> PostMatricula([FromBody] MatriculaCreateDTO dto, [FromServices] IValidator<MatriculaCreateDTO> validator)
        {
            var validation = validator.Validate(dto);

            if (!validation.IsValid)
                return BadRequest(new { errors = validation.Errors.Select(e => e.ErrorMessage) });

            var matricula = await _service.CreateAsync(dto);
            return Ok(matricula);
        }

        [HttpGet("matriculas")]
        public async Task<IActionResult> GetAllMatricula()
        {
            var matriculas = await _service.GetAllMatriculaAsync();
            return Ok(matriculas);
        }


        [HttpDelete("matriculas/{id}")]
        public async Task<IActionResult> DeleteMatricula(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
                return NotFound(new { message = "Matrícula não encontrada." });

            return NoContent();
        }
    }
}
