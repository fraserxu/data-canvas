NODE_BIN = node_modules/.bin
SRC_DIR = src
DIST_DIR = dist

install: 
	npm install

build:
	$(NODE_BIN)/browserify $(SRC_DIR)/main.js -t 6to5ify --outfile $(DIST_DIR)/main.js

watch:
	$(NODE_BIN)/watchify $(SRC_DIR)/main.js -t 6to5ify -o $(DIST_DIR)/main.js -dv & \
	http-server .

clean:
	rm -f $(DIST_DIR)/main.js

.PHONY: install build watch clean
