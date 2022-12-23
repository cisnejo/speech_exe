to set the current flask app in the command line:
 $env:FLASK_APP = "server"
then run "flask shell"

for git add-commit
	git config --global alias.add-commit '!git add -A && git commit'
then to use
	git add-commit -m 'My commit message'