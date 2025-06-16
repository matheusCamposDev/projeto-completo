using Desafio.DTO.MatriculaDTO;
using FluentValidation;

namespace Desafio.Validators.MatriculaValidator
{
    public class MatriculaCreateValidator : AbstractValidator<MatriculaCreateDTO>
    {
        public MatriculaCreateValidator()
        {
            RuleFor(m => m.AlunoId).GreaterThan(0).WithMessage("AlunoId inválido.");
            RuleFor(m => m.CursoId).GreaterThan(0).WithMessage("CursoId inválido.");
        }
    }
}
