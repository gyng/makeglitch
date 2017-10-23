glitchmake: index.template.html glitch.js
	sed -e '/SCRIPT_SRC/{r glitch.js' -e 'd}' index.template.html > index.html

clean:
	rm index.html