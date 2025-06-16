using Desafio.DTO.AlunoDTO;
using Desafio.DTO.CursoDTO;
using Desafio.DTO.MatriculaDTO;
using Desafio.Interfaces.Aluno;
using Desafio.Interfaces.Curso;
using Desafio.Interfaces.IMatricula;
using Desafio.Models;
using Desafio.Services;
using Desafio.Validators;
using Desafio.Validators.CursoValidator;
using Desafio.Validators.MatriculaValidator;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IValidator<AlunoCreateDTO>, AlunoValidator>();
builder.Services.AddScoped<IValidator<AlunoUpdateDTO>, AlunoUpdateValidator>();
builder.Services.AddScoped<IValidator<CursoCreateDTO>, CursoCreateValidator>();
builder.Services.AddScoped<IValidator<CursoUpdateDTO>, CursoUpdateValidator>();
builder.Services.AddScoped<IValidator<MatriculaCreateDTO>, MatriculaCreateValidator>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services context
builder.Services.AddDbContext<APIContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

builder.Services.AddScoped<IAlunoService, AlunoService>();
builder.Services.AddScoped<ICursoService, CursoService>();
builder.Services.AddScoped<IMatriculaService, MatriculaService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("AllowFrontend");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<APIContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
