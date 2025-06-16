using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using FluentValidation;

namespace Desafio.Validators.CursoValidator
{
    public class CursoCreateValidator : AbstractValidator<CursoCreateDTO>
    {
        public CursoCreateValidator()
        {
            RuleFor(alunoCreateDTO => alunoCreateDTO.Name)
                .NotEmpty().WithMessage("Campo nome é obrigatório.");

            RuleFor(alunoCreateDTO => alunoCreateDTO.Description)
                .NotEmpty().WithMessage("Campo descrição é obrigatório.");
        }
    }
}
