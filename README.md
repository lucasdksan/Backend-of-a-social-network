# Sistema de autenticação com typescript :floppy_disk: :iphone: :lock:

## Resumo:{

Esse backend foca no sistema de autenticação utilizando typescript, knex e MySQL com banco de dados para o armazenamento das informações dos usuários.
 
A pasta @types contém algumas configurações typescript para algumas ferramentas (express e nodemailer-express-handlebar).
 
## A pasta config possui os arquivos de configurações em json:
o arquivo auth.json contém o "segredo/chave de segurança" do token, isso para garantir que os token dos usuários são exclusivamente desse backend. Já o arquive mail.json contém as informações para o envio de email para recuperação de senha.
 
A pasta controller contém os arquivos para reproduzir os comandos base desse backend. authController.ts reproduz os comandos de criação de usuário, autenticação usuário, mudança de senha e a criação de um token para fazer o reset da senha. o arquivo projectController.ts e o tasks.ts servem para controlar as "atividades" de cada usuário.

Database é uma pasta que contém as migrations e a conexão com o banco de dados.
Connection.ts é responsável pela conexão com o banco de dados, no caso o MySQL.

O arquivo auth.ts faz a verificação do token do usuário.

Além dessas aplicações apresentadas esse backend tem a funcionalidade de enviar o email para o usuário fazer o reset da senha. O conteúdo deste email é simplesmente o token para esse ato de password reset.

A pasta utils contém os arquivos de server para auxiliar o processo, para ser mais específico, contém algumas abstrações que grande repetição nos controllers.

* Comparing é um código que faz uma comparação de informações enviadas com as do banco de dados.
* Crypt faz a encriptação da senha do usuário para armazenar o armazenamento.
* token é o arquivo que produz o token para a confirmação.

routes.ts e server.ts são utilizados para dar a vida ao backend.

}: //Fim do Resumo

## Algumas explicações pontuais:{

Arquivo authController.ts
É uma classe que contém 4 métodos.

create é o método para registrar o usuário no banco de dados. Recebe no corpo da solicitação o nome do usuário, email, senha e whatsapp. A newpassord é uma constante que contém a senha do usuário criptografada.
Authenticate faz o serviço de autenticação pegando o e-mail e senha do usuário. Como no método de criação a senha é criptografada, a constante find é responsável por reverter essa ação, assim dando continuidade na verificação.
ForgotPassword já se concentra na criação do token e no envio dessas informações para o e-mail do usuário. É acionado quando há uma solicitação de alteração de senha.
O resetPassword já faz a verificação dos token, para caso seja o mesmo, a troca de senha seja feita.

}
