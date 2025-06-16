using AutoMapper;
using Desafio.DTO.AlunoDTO;
using Desafio.Interfaces.Aluno;
using Desafio.Models;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Desafio.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoService _service;

        public AlunoController(IAlunoService service)
        {
            _service = service;
        }

        [HttpPost("aluno")]
        public async Task<IActionResult> CretaeAluno([FromBody] AlunoCreateDTO dto, [FromServices] IValidator<AlunoCreateDTO> validator)
        {
            var result = validator.Validate(dto);

            if (!result.IsValid)
            {
                return BadRequest(new { errors = result.Errors.Select(e => e.ErrorMessage) });
            }

            var aluno = await _service.CreateAsync(dto);
            
            return Ok(aluno);

        }

        [HttpGet("alunos")]
        public async Task<IActionResult> GetAlunos()
        {
            IEnumerable<AlunoReadDTO> alunos = await _service.GetAllAsync(); 

            return Ok(alunos);
        }

        [HttpGet("aluno")]
        public async Task<IActionResult> GetAluno([FromQuery] string name, [FromQuery] string email, [FromQuery] DateTime dataNascimento)
        {
            var aluno = await _service.GetByFiltersAsync(name, email, dataNascimento);

            if (aluno == null)
                return NotFound(new { message = "Aluno não encontrado." });
            
            return Ok(aluno);
        }

        [HttpPut("aluno/{id}")]
        public async Task<IActionResult> UpdateAluno(int id, [FromBody] AlunoUpdateDTO dto, [FromServices] IValidator<AlunoUpdateDTO> validator)
        {
            var result = validator.Validate(dto);

            if (!result.IsValid)
                return BadRequest(new { errors = result.Errors.Select(e => e.ErrorMessage) });

            var aluno = await _service.UpdateAsync(id, dto);
            
            if (aluno == null)
                return NotFound(new { message = "Aluno não encontrado." });

            return Ok(aluno);
        }

        [HttpDelete("aluno/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            bool aluno = await _service.DeleteAsync(id);

            if (!aluno)
                return NotFound(new { message = "Aluno não encontrado." });

            return NoContent();
        }
    }
}
