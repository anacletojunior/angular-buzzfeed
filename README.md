# Quiz BuzzFeed - Para Qual País Você Deveria Viajar?

Um quiz no estilo BuzzFeed que sugere algo sobre você de acordo com suas respostas. Desenvolvido com Angular.

## Funcionalidades

- Interface responsiva para celulares, tablets e desktop
- Questões com opções aleatórias em cada tentativa
- Contador de progresso das perguntas
- Suporte a atualização remota de perguntas através de API
- Fallback para dados locais caso a API esteja indisponível

## Configuração do Ambiente

Para rodar o projeto, você precisará configurar as variáveis de ambiente:

1. Copie o arquivo `src/environments/environment.example.ts` para `src/environments/environment.ts`
2. Adicione suas credenciais de API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID',
  apiKey: 'YOUR_ACCESS_KEY'
};
```

> **IMPORTANTE**: Nunca comite o arquivo `environment.ts` com suas credenciais reais!

## Configuração para a Vercel

Para implantar na Vercel com segurança:

1. No dashboard da Vercel, vá para as configurações do seu projeto
2. Na seção "Environment Variables", adicione:
   - `ANGULAR_APP_API_URL`: seu endpoint da API
   - `ANGULAR_APP_API_KEY`: sua chave de API

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar localmente
ng serve

# Construir para produção
ng build
```

## Contribuição

Contribuições são bem-vindas! Por favor, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Envie para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Autor

- [@anacletojunior](https://github.com/anacletojunior)
