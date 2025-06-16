using Microsoft.EntityFrameworkCore;

namespace Desafio.Models
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options) : base(options)
        {
        }
        
        public DbSet<Aluno> Alunos {  get; set; }
        public DbSet<Curso> Cursos { get; set; }
        public DbSet<Matricula> Matriculas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Aluno>(entity =>
            {
                entity.ToTable("Alunos");

                entity.HasKey(a => a.Id);

                entity.Property(a => a.Name)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(a => a.Email)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(a => a.DataNascimento)
                      .IsRequired();
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.ToTable("Cursos");

                entity.HasKey(a => a.Id);

                entity.Property(a => a.Name)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(a => a.Description)
                      .IsRequired()
                      .HasMaxLength(100);
            });

            modelBuilder.Entity<Matricula>()
                .HasOne(m => m.Aluno)
                .WithMany(a => a.Matriculas)
                .HasForeignKey(m => m.AlunoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Matricula>()
                .HasOne(m => m.Curso)
                .WithMany(c => c.Matriculas)
                .HasForeignKey(m => m.CursoId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
