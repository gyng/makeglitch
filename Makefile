glitchmake: index.template.html glitch.js
	sed s/glitchTimeout\(\)/window\.requestAnimationFrame\(glitchRaf\)/ glitch.js > glitch.turbo.js.tmp
	sed -e '/SCRIPT_SRC/{r glitch.js' -e 'd}' index.template.html > index.html.tmp
	sed -e '/SCRIPT_TURBO_SRC/{r glitch.turbo.js.tmp' -e 'd}' index.html.tmp > index.html

clean:
	rm index.html
	rm glitch.turbo.js.tmp
	rm index.html.tmp
