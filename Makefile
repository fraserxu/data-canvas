NODE_BIN = node_modules/.bin
SRC_DIR = src
DIST_DIR = dist

GITHUB_REPO ?= https://$(token):@github.com/fraserxu/data-canvas-shanghai.git

deploy:
	git config user.name 'fraserxu on codeship' && \
	git config user.email 'xvfeng123@gmail.com' && \
	git config --global push.default matching && \
	git checkout -b gh-pages && \
	git reset --hard origin/master && \
	make install && \
	mkdir -p dist && \
	make build && \
	git add -Af dist && \
	git commit -am 'gh-pages update' && \
	git remote set-url origin $(GITHUB_REPO) && \
	git push -ufq origin gh-pages

install: 
	npm install

build:
	$(NODE_BIN)/browserify $(SRC_DIR)/main.js -t 6to5ify --outfile $(DIST_DIR)/main.js | $(NODE_BIN)/uglifyjs -mc > $(DIST_DIR)/main.js

watch:
	$(NODE_BIN)/watchify $(SRC_DIR)/main.js -t 6to5ify -o $(DIST_DIR)/main.js -dv & \
	http-server .

clean:
	rm -f $(DIST_DIR)/main.js

.PHONY: deploy install build watch clean
