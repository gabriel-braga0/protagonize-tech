# 📋 Gestor de Tarefas Profissional

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![.NET Core](https://img.shields.io/badge/.NET%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white)

Aplicação web desenvolvida como resolução do Desafio Técnico para nível Júnior. O sistema consiste em um gerenciador de tarefas completo (CRUD) com front-end em Angular e back-end em ASP.NET Core Web API.

---

## ✨ Funcionalidades e Diferenciais Implementados

Além dos requisitos obrigatórios, este projeto conta com os seguintes diferenciais focados em UX e boas práticas:

- **CRUD Completo:** Criação, listagem, edição e exclusão de tarefas.
- **Validações de Formulário:** Validação reativa no front-end (Angular Reactive Forms) e anotações de dados no back-end (Data Annotations).
- **Feedback Visual (UX):**
  - Toasts dinâmicos de sucesso e erro.
  - Indicadores de carregamento (Spinners) nativos nas ações de requisição HTTP (Salvar/Excluir).
  - Modal customizado para confirmação de exclusão (evitando o `alert()` nativo).
- **Arquitetura Moderna:** Uso de Angular 17+ com _Standalone Components_ e nova sintaxe de controle de fluxo (`@for`, `@if`).
- **Documentação da API:** Interface moderna utilizando **Scalar** para documentação do OpenAPI no back-end.

---

## 🛠️ Tecnologias Utilizadas

### Front-end:

- Angular (v17+) - Standalone Components
- HTML5, CSS3 puro (Design responsivo e componentizado)
- RxJS (Operadores como `finalize` para controle de estado)

### Back-end:

- C# / ASP.NET Core Web API (.NET)
- Entity Framework Core (ORM)
- SQL Server (LocalDB)

---

## 🚀 Como executar o projeto localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Angular CLI](https://angular.io/cli)
- [.NET SDK](https://dotnet.microsoft.com/download) (versão compatível com o projeto, ex: .NET 8 ou 10)
- SQL Server (O projeto está configurado para usar o `(localdb)\mssqllocaldb` nativo do Visual Studio)

---

# ▶️ Passo 1: Rodando o Back-end (API)

1. Abra um terminal e navegue até a pasta da API:

```bash
cd TarefasApi


2. Restaure as dependências do projeto:

```bash
dotnet restore
````

3. Crie o banco de dados e as tabelas aplicando as Migrations:

```bash
dotnet ef database update
```

> **Nota:** Caso não tenha a ferramenta do EF Core instalada, execute:
>
> ```bash
> dotnet tool install --global dotnet-ef
> ```

4. Inicie o servidor:

```bash
dotnet run --launch-profile "https"
```

A API estará rodando em: https://localhost:7226 e https://localhost:5054
Você pode testar os endpoints acessando a interface gráfica do **Scalar** em:  
https://localhost:7226/scalar/v1

---

## ▶️ Passo 2: Rodando o Front-end (Angular)

1. Abra um novo terminal e navegue até a pasta do front-end:

```bash
cd tarefas-front
```

2. Instale as dependências do Node:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento do Angular:

```bash
ng serve
```

4. Abra o seu navegador e acesse:

http://localhost:4200

---

## 📁 Estrutura Básica do Front-end

A organização segue o padrão de componentes isolados para facilitar a manutenção:

- `app.component` → Dashboard principal (orquestra modais, toasts e filtros)
- `tarefa-list` → Componente de apresentação da listagem de cards
- `tarefa-form` → Componente com o formulário reativo para criação e edição
- `services/tarefa.ts` → Centraliza as chamadas HTTP (`HttpClient`) para a API

---

## ⚠️ Troubleshooting (Solução de Problemas)

Caso enfrente problemas ao rodar o projeto pela primeira vez, verifique estes pontos:

1. **Erro de CORS ou Conexão:** Certifique-se de que a API está rodando exatamente na porta `7226` e o Angular na porta `4200`. Se as portas divergirem, a comunicação será bloqueada. Caso necessário, ajuste a URL no `environment` (ou direto no `tarefa.ts`) e no `Program.cs`.
2. **Erro de Banco de Dados:** A string de conexão utiliza o `(localdb)\mssqllocaldb`. Se você estiver usando outro servidor SQL (ou Docker), atualize a propriedade `DefaultConnection` no arquivo `appsettings.json` da API antes de rodar as _migrations_.
3. **Erro de Certificado SSL/HTTPS:** Se a API não responder por bloqueio do navegador, confie no certificado de desenvolvimento do .NET rodando:
   `dotnet dev-certs https --trust`
