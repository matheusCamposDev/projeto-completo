using Desafio.DTO.AlunoDTO;
using FluentValidation;

namespace Desafio.Validators
{
    public class AlunoUpdateValidator : AbstractValidator<AlunoUpdateDTO>
    {
        public AlunoUpdateValidator() 
        {
            RuleFor(alunoCreateDTO => alunoCreateDTO.Name)
                .NotEmpty().WithMessage("Campo nome é obrigatório. Não foi possível alterar");

            RuleFor(alunoCreateDTO => alunoCreateDTO.Email)
                .NotEmpty().WithMessage("Campo email é obrigatório.")
                .EmailAddress().WithMessage("Formato de email inválido. Não foi possível alterar");

            RuleFor(alunoCreateDTO => alunoCreateDTO.DataNascimento)
                .NotEmpty().WithMessage("Campo data de nascimento é obrigatório.")
                .Must(data => data <= DateTime.Today.AddYears(-18)).WithMessage("Aluno precisa ter pelo menos 18 anos.");
        }
    }
}
