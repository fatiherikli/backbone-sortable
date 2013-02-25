# https://gist.github.com/rgrove/1116056

CSS_FILES = $(filter-out %-min.css,$(wildcard src/*.css))
 
JS_FILES = $(filter-out %-min.js,$(wildcard src/*.js))
 
# Command to run to execute the YUI Compressor.
YUI_COMPRESSOR = java -jar build/yuicompressor-2.4.jar
 
# Flags to pass to the YUI Compressor for both CSS and JS.
YUI_COMPRESSOR_FLAGS = --charset utf-8
 
CSS_MINIFIED = $(CSS_FILES:.css=-min.css)
JS_MINIFIED = $(JS_FILES:.js=-min.js)
 
minify: minify-css minify-js
minify-css: $(CSS_FILES) $(CSS_MINIFIED)
minify-js: $(JS_FILES) $(JS_MINIFIED)
 
%-min.css: %.css
	@echo '==> Minifying $<'
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type css $< >$@
	@echo
 
%-min.js: %.js
	@echo '==> Minifying $<'
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type js $< >$@
	@echo
 
clean:
	rm -f $(CSS_MINIFIED) $(JS_MINIFIED)
