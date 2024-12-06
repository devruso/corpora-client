
# Corpora Frontend

Frontend do projeto **Corpora**, desenvolvido com Vite, React.js e TypeScript, focado na gestão de empresas e autenticação OAuth integrada com o backend.

## 🛠️ Tecnologias Utilizadas

- **Vite**: Ferramenta moderna para desenvolvimento rápido e eficiente.
- **React.js** com **TypeScript**: Para criação de componentes reutilizáveis e tipagem segura.
- **React Router**: Gerenciamento de rotas para navegação.
- **Context API**: Controle global de estado, incluindo dados do usuário autenticado.
- **shadcn/ui**: Utilizado pela facilidade de criar componentes bonitos, bem estruturados e de alta qualidade visual, acelerando o desenvolvimento.
- **TailwindCSS**: Estilização ágil e responsiva.
- **Local Storage**: Armazenamento de tokens para sessões persistentes.

## 🚀 Funcionalidades

- Autenticação de usuários com JWT e Google OAuth.
- Dashboard com CRUD de empresas:
  - Adicionar, editar e excluir empresas.
  - Listar empresas vinculadas ao usuário autenticado.
- Formulários com validação automática e responsividade.
- Compartilhamento de dados globais pela aplicação utilizando Context API.

## 📦 Estrutura do Projeto

```plaintext
src/
├── assets/         # Imagens e arquivos estáticos
├── components/     # Componentes reutilizáveis
├── contexts/        # Configuração da Context API
├── pages/          # Páginas da aplicação
│   ├── Home.tsx
│   ├── Login.tsx
├── hooks/       # Comunicação com o backend
├── hooks/       # Comunicação com o backend
├── interfaces/  # Tipos transitados na aplicação
├── interfaces/  # Tipos transitados na aplicação
├── lib/         # Tailwind Merge
├── pages/       # Páginas da aplicação
├── routes/      # Configuração de rotas
├── services/    # Implementação de regra de negocios
├── App.tsx         # Componente principal da aplicação
├── main.tsx        # Ponto de entrada do React
├── index.css       # Estilos globais
```

## ⚙️ Configuração e Execução

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/devruso/corpora-client.git
   cd corpora-frontend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configuração do ambiente**:  
   Configure as variáveis de ambiente corretamente no backend e rode o sistema antes de usar o front end.


4. **Execute o projeto**:
   ```bash
   npm run dev
   ```

5. Acesse no navegador:
   ```
   http://localhost:3001
   ```

## 🧰 Decisões Técnicas

- **Arquitetura Componentizada:**  
  Divisão clara entre páginas, componentes reutilizáveis e lógica de negócio, facilitando escalabilidade e manutenção.

- **Gerenciamento de Estado Global:**  
  A **Context API** foi utilizada para armazenar informações globais, como dados do usuário autenticado, permitindo acesso em qualquer componente.

- **Comunicação com Backend:**  
  Configuração do Axios centralizada em `hooks/` para as requisições.

- **Persistência de Sessão:**  
  Armazenamento do token JWT no `localStorage`, com validações automáticas para proteger rotas privadas.

## 🖌️ Estilo Visual

- **Fontes Padrão:** Montserrat para título e Open Sans para corpo de texto.
- **Cores Personalizadas:** Configuradas no Tailwind para criar uma identidade visual única e consistente com o projeto.
- **shadcn/ui:** Utilizado pela facilidade de criar componentes bonitos, bem estruturados e altamente adaptáveis.

## 🛡️ Autenticação OAuth

A integração com o Google foi realizada utilizando o OAuth 2.0. Configure as credenciais no backend para garantir a integração.

## 🌟 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/sua-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "feat: descrição da sua feature"
   ```
4. Faça um push para a branch:
   ```bash
   git push origin feature/sua-feature
   ```
5. Abra um Pull Request.

---

Desenvolvido com 💻 por [Jamilson Júnior](https://github.com/devruso)
