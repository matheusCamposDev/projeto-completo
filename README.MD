# Configurando projeto

- Tenha instalado Docker Desktop e docker compose na máquina.
- execute o comando: `docker compose up --build`
- A aplicação estará rodando: `http://localhost:3000/`

# Sobre o projeto

### A página inicial
- Matrícula: onde você registra um aluno e seleciona um curso (o curso precisa ser adicionado antes).
- Cursos: onde você adiona um curso.
- Todos os alunos: onde você pode editar e excluir (caso não esteja matriculado) um aluno.
- Alunos Matriculados: lista de todos os alunos que possuem uma matrícula.

<img src="prints/home.png" alt="Tela Inicial" width="700"/>

### /matricula

- Formulário matrícula possui validações no frontend para preenchimento correto dos dados nome email e data. 

- O botão de enviar fica disponível assim que todos os campos são preenchidos corretamente.

<img src="prints/formulario-matricula.png" alt="Tela Inicial" width="400"/>

- Alguns modais são apresentados para informações de processo que podem alertar que aluno já existe, curso criado com sucesso, confirmação para excluir um aluno, ou matrícula.
- Nesse caso como foi feita uma nova matrícula a um aluno existente a mensagem será essa:

<img src="prints/modal.png" alt="Tela Inicial" width="400"/>

- A próxima etapa será a seleção de curso.

<img src="prints/dropdown-select-curso.png" alt="Tela Inicial" width="400"/>

### /cursos

- Tabela de cursos: nela é possível excluir, editar e adicionar um curso.
- A tabela possui paginação com 5 itens por página.

<img src="prints/cursos-list.png" alt="Tela Inicial" width="600"/>

### /alunos

- Lista de todos os alunos matriculados ou não matriculados em um curso.
- Apenas alunos não matriculados poderam ser excluídos.
- Para excluir um aluno que está matrículado primeiro terá que excluir a matrícula do aluno em `/matriculados`.
- Caso tente excluir um aluno matriculado um modal de aviso informará que ele possui uma matrícula.

<img src="prints/alunos-list.png" alt="Tela Inicial" width="600"/>

### /matriculados

- Lista apenas os alunos que possuem matrículas
- Filtro de nomes busca aluno quem vem direto da base de dados

<img src="prints/matriculados.png" alt="Tela Inicial" width="600"/>
