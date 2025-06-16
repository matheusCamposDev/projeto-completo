namespace Desafio.Models
{
    public class Curso
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Matricula> Matriculas { get; set; } = new List<Matricula>();
    }
}
