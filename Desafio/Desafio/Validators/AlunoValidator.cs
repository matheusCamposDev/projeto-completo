using Desafio.DTO.AlunoDTO;
using FluentValidation;

namespace Desafio.Validators
{
    public class AlunoValidator : AbstractValidator<AlunoCreateDTO>
    {
        public AlunoValidator() 
        {
            RuleFor(alunoCreateDTO => alunoCreateDTO.Name)
                .NotEmpty().WithMessage("Campo nome é obrigatório.");

            RuleFor(alunoCreateDTO => alunoCreateDTO.Email)
                .NotEmpty().WithMessage("Campo email é obrigatório.")
                .EmailAddress().WithMessage("Formato de email inválido.");

            RuleFor(alunoCreateDTO => alunoCreateDTO.DataNascimento)
                .NotEmpty().WithMessage("Campo data de nascimento é obrigatório.")
                .Must(data => data <= DateTime.Today.AddYears(-18)).WithMessage("Aluno precisa ter pelo menos 18 anos.");
        }
    }
}
