glitchmake: index.template.html glitch.js
	sed s/_o/{}/ glitch.js > glitch.images.js.tmp
	sed s/_o/{G_T:true}/ glitch.js > glitch.images.text.js.tmp
	sed s/_o/{TURBO:true}/ glitch.js > glitch.turbo.images.js.tmp
	sed s/_o/{G_T:true,TURBO:true}/ glitch.js > glitch.turbo.images.text.js.tmp
	sed -e '/SCRIPT_IMG_SRC/{r glitch.images.js.tmp' -e 'd}' index.template.html > index.html.0.tmp
	sed -e '/SCRIPT_IMG_TEXT_SRC/{r glitch.images.text.js.tmp' -e 'd}' index.html.0.tmp > index.html.1.tmp
	sed -e '/SCRIPT_TURBO_IMG_SRC/{r glitch.turbo.images.js.tmp' -e 'd}' index.html.1.tmp > index.html.2.tmp
	sed -e '/SCRIPT_TURBO_IMG_TEXT_SRC/{r glitch.turbo.images.text.js.tmp' -e 'd}' index.html.2.tmp > index.html

clean:
	rm index.html
	rm glitch.turbo.js.tmp
	rm index.html.tmp

cleantmp:
	rm glitch.turbo.js.tmp
	rm index.html.tmp
