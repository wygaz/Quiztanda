
@echo off
echo Iniciando controle de versão do Quiztanda 4.4...

:: Iniciar o repositório Git (caso ainda não tenha sido iniciado)
git init

:: Adicionar todos os arquivos ao controle de versão
git add .

:: Fazer commit com mensagem da versão
git commit -m "Versão 4.4 - 15 frutas com 4 estados cada"

:: Conectar ao repositório remoto (apenas se ainda não estiver conectado)
git remote add origin https://github.com/wygaz/Quiztanda.git

:: Enviar os arquivos para o repositório remoto
git push -u origin main

:: Criar uma tag de versão e enviar
git tag v4.4
git push origin v4.4

echo Operação concluída com sucesso.
pause
