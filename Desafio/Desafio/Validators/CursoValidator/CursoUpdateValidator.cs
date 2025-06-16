using Desafio.DTO.CursoDTO;
using FluentValidation;

namespace Desafio.Validators.CursoValidator
{
    public class CursoUpdateValidator : AbstractValidator<CursoUpdateDTO>
    {
        public CursoUpdateValidator()
        {
            RuleFor(alunoCreateDTO => alunoCreateDTO.Name)
                .NotEmpty().WithMessage("Campo nome é obrigatório. Não foi possível alterar.");

            RuleFor(alunoCreateDTO => alunoCreateDTO.Description)
                .NotEmpty().WithMessage("Campo descrição é obrigatório. Não foi possível alterar.");
        }
    }
}
