# Pet Connect - Manual de Instalação e Execução

## Visão Geral

Pet Connect é uma aplicação para gestão de animais de estimação, que permite registrar, listar e gerenciar seus pets, além de acessar serviços relacionados.

## Tecnologias Utilizadas

- **Frontend**: React Native com Expo
- **Backend**: Node.js
- **Banco de Dados**: MongoDB

## Requisitos de Sistema

- Node.js (v16 ou superior) - [Download](https://nodejs.org/)
- NPM (geralmente instalado com o Node.js)
- MongoDB (instalado localmente ou acesso a uma instância) - [Download](https://www.mongodb.com/try/download/community)
- Git (para clonar o repositório)

## Configuração do Ambiente

### 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITÓRIO>
cd pet-connect
```

### 2. Instalação de Dependências

Na pasta raiz do projeto, instale as dependências:

```bash
npm install
```

### 3. Configuração do MongoDB

#### Instalação Local do MongoDB:

**MacOS (usando Homebrew)**:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows**:
- Baixe o instalador do [site oficial do MongoDB](https://www.mongodb.com/try/download/community)
- Siga as instruções de instalação
- Execute o MongoDB como um serviço do Windows

**Linux (Ubuntu)**:
```bash
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
```

## Execução da Aplicação

### 1. Iniciar o Backend

O projeto possui duas opções de servidor backend:

#### Opção 1: Servidor Node.js com MongoDB (Recomendado)

```bash
cd backend
node src/server.js
```

Você deverá ver uma mensagem como:
```
Servidor rodando em http://localhost:5001
Data e hora do início: yyyy-mm-ddTHH:MM:SS.SSSZ
MongoDB Conectado: localhost
```

#### Opção 2: Servidor de API simplificado (para testes rápidos)

Na pasta raiz do projeto:
```bash
node api-server.js
```

### 2. Iniciar o Frontend

Em outro terminal, a partir da pasta raiz do projeto:

```bash
npm start
```

Isso iniciará o Expo. Se a porta 8081 já estiver em uso, o Expo vai perguntar se você deseja usar outra porta (por exemplo, 8082). Digite "Y" para confirmar.

## Solução de Problemas Comuns

### Erro de Porta em Uso (EADDRINUSE)

Se o backend apresentar erro como:
```
Error: listen EADDRINUSE: address already in use 0.0.0.0:5001
```

**Soluções**:
1. Verificar se o servidor já está rodando em outro terminal
2. Encerrar o processo que está usando a porta:
   ```bash
   # Para macOS/Linux:
   lsof -i :5001
   kill -9 <PID_DO_PROCESSO>
   
   # Para Windows:
   netstat -ano | findstr :5001
   taskkill /PID <PID_DO_PROCESSO> /F
   ```
3. Alterar a porta do servidor no arquivo `config.env` ou diretamente no código

### Erro ao Conectar ao MongoDB

Se o backend não conseguir conectar ao MongoDB:

1. Verifique se o MongoDB está rodando:
   ```bash
   # MacOS:
   brew services list | grep mongo
   
   # Linux:
   sudo systemctl status mongodb
   
   # Windows:
   Verifique nos serviços do Windows (services.msc)
   ```

2. Verifique a string de conexão no arquivo `config.env`

### Problemas com Expo

Se o Expo não iniciar corretamente:

1. Limpe o cache:
   ```bash
   npx expo start -c
   ```

2. Se o problema persistir, tente:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## Acessando a Aplicação

### Versão Web
Acesse no navegador:
- http://localhost:8081 (ou a porta alternativa indicada no terminal)

### Versão Mobile (usando Expo)
1. Instale o aplicativo Expo Go no seu smartphone:
   - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS](https://apps.apple.com/app/expo-go/id982107779)
2. Escaneie o QR code exibido no terminal ou na página do Expo no navegador
3. **Importante**: Seu smartphone e computador devem estar na mesma rede Wi-Fi

## Rotas da API e Funcionalidades

### Backend (http://localhost:5001)
- `/api/users/register` - Registro de novo usuário
- `/api/users/login` - Login de usuário
- `/api/users/profile` - Obter perfil do usuário autenticado
- `/api/pets` - Listar e cadastrar pets
- `/api/services` - Listar serviços disponíveis
- `/api/product` - Listar e cadastrar produtos

### Frontend
- `/login` - Página de login
- `/register` - Página de registro de usuário
- `/` - Página inicial com os serviços
- `/profile` - Perfil do usuário
- `/pets` - Gerenciamento de pets

## Navegando pela Aplicação

1. Registre-se como novo usuário na tela de registro
2. Faça login com as credenciais cadastradas
3. Na tela principal, explore os serviços disponíveis
4. Acesse o menu "Meus Pets" para gerenciar seus animais de estimação
5. Use a seção de perfil para gerenciar suas informações pessoais

## Observações Importantes

1. Para desenvolvimento mobile, certifique-se de que seu dispositivo esteja na mesma rede Wi-Fi que o computador que executa o servidor.

2. Se estiver testando em um dispositivo físico, pode ser necessário substituir `localhost` pelo endereço IP da sua máquina nas solicitações de API (modifique os arquivos relevantes no frontend).

3. O sistema usa armazenamento local (`localStorage` na web e `SecureStore` no mobile) para manter as informações de login entre sessões.

4. Para encerrar todos os serviços, pressione Ctrl+C nos terminais onde o frontend e o backend estão rodando. 