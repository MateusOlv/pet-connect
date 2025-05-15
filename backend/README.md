# Backend Pet Connect

Backend da aplicação Pet Connect desenvolvido com Node.js, Express e MongoDB.

## Estrutura do Projeto

```
backend/
  ├── src/
  │   ├── config/         # Configurações (banco de dados, etc)
  │   ├── controllers/    # Controladores que processam as requisições
  │   ├── middleware/     # Middlewares (autenticação, etc)
  │   ├── models/         # Modelos do MongoDB
  │   ├── routes/         # Rotas da API
  │   └── server.js       # Arquivo principal do servidor
  ├── config.env          # Variáveis de ambiente
  ├── package.json
  └── README.md
```

## Modelos de Dados

O sistema implementa os seguintes modelos conforme o diagrama UML:

1. **User**: Usuários da plataforma (donos de pets)
2. **Pet**: Animais de estimação vinculados a um usuário
3. **Service**: Serviços disponíveis para agendamento
4. **ServiceProvider**: Provedores de serviços (pet shops, clínicas, etc)

## Funcionalidades Implementadas

- Autenticação de usuários (registro e login)
- Gerenciamento de pets (criar, listar, atualizar, excluir)
- Gerenciamento de serviços (listar, agendar, cancelar)
- Gerenciamento de provedores de serviços

## Rotas da API

### Usuários
- `POST /api/users/register` - Registrar novo usuário
- `POST /api/users/login` - Login de usuário
- `GET /api/users/profile` - Obter perfil do usuário (requer autenticação)
- `PUT /api/users/profile` - Atualizar perfil do usuário (requer autenticação)

### Pets
- `POST /api/pets` - Cadastrar novo pet (requer autenticação)
- `GET /api/pets` - Listar todos os pets do usuário (requer autenticação)
- `GET /api/pets/:id` - Obter detalhes de um pet (requer autenticação)
- `PUT /api/pets/:id` - Atualizar informações de um pet (requer autenticação)
- `DELETE /api/pets/:id` - Excluir um pet (requer autenticação)

### Serviços
- `GET /api/services` - Listar todos os serviços disponíveis
- `GET /api/services/:id` - Obter detalhes de um serviço
- `GET /api/services/user/scheduled` - Listar serviços agendados pelo usuário (requer autenticação)
- `POST /api/services/:id/schedule` - Agendar um serviço para um pet (requer autenticação)
- `POST /api/services/:id/cancel` - Cancelar um agendamento (requer autenticação)

### Provedores de Serviço
- `GET /api/providers` - Listar todos os provedores de serviço
- `GET /api/providers/:id` - Obter detalhes de um provedor de serviço
- `POST /api/providers` - Criar um novo provedor de serviço (função administrativa)
- `POST /api/providers/:id/services` - Adicionar um serviço a um provedor (função administrativa)
- `DELETE /api/providers/:providerId/services/:serviceId` - Remover um serviço de um provedor (função administrativa)

## Instalação e Execução

1. Instale as dependências:
   ```
   npm install
   ```

2. Configure o MongoDB:
   - Certifique-se de ter o MongoDB instalado e rodando
   - Edite o arquivo `config.env` com a URL de conexão

3. Execute o servidor em modo de desenvolvimento:
   ```
   npm run dev
   ```

4. Execute o servidor em modo de produção:
   ```
   npm start
   ```

## Integração com o Frontend

O backend foi projetado para ser facilmente integrado ao frontend React Native existente. As rotas da API correspondem às necessidades do aplicativo móvel, permitindo:

- Autenticação de usuários
- Cadastro e gerenciamento de pets
- Agendamento de serviços

Para testar a API, você pode usar ferramentas como Postman ou Insomnia, enviando requisições para `http://localhost:5000/` (ou o endereço configurado no servidor). 