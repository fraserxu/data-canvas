NODE_BIN = node_modules/.bin
SRC_DIR = src
DIST_DIR = dist
SASS_DIR = assets/scss
NODE_BIN = node_modules/.bin

GITHUB_REPO ?= https://$(token):@github.com/fraserxu/data-canvas.git

deploy:
	git config user.name 'fraserxu on codeship' && \
	git config user.email 'xvfeng123@gmail.com' && \
	git config --global push.default matching && \
	git checkout -b gh-pages && \
	git reset --hard origin/master && \
	make install && \
	mkdir -p dist && \
	make install && \
	make build && \
	git add -Af dist && \
	git commit -am 'gh-pages update' && \
	git remote set-url origin $(GITHUB_REPO) && \
	git push -ufq origin gh-pages

install:
	npm install

build:
	$(NODE_BIN)/browserify $(SRC_DIR)/main.js -t 6to5ify | $(NODE_BIN)/uglifyjs -mc > $(DIST_DIR)/main.js
	make build-css

watch:
	$(NODE_BIN)/watchify $(SRC_DIR)/main.js -t 6to5ify -o $(DIST_DIR)/main.js -dv & \
	make watch-css & \
	http-server .

build-css:
	$(NODE_BIN)/node-sass $(SASS_DIR)/style.scss -o $(DIST_DIR)/
	$(NODE_BIN)/autoprefixer dist/*.css

watch-css:
	$(NODE_BIN)/watch 'make build-css' $(SASS_DIR)

clean:
	rm -f $(DIST_DIR)/main.js

surge:
	rm -rf surge
	mkdir -p surge
	make build
	cp index.html ./surge
	cp -r dist ./surge
	surge surge

.PHONY: deploy install build watch clean surge
