namespace Desafio.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
    }
}
