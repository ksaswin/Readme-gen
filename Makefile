# Project related variables
APP_NAME:=readme-ui
DOCKER_BUILD_TARGET:=readme-ui:latest

# Build and test tools abstraction.
NPM_BIN:=$(shell which npm)
NPM_INSTALL_CMD:=install
DOCKER_BIN:=$(shell which docker)
PWD:=$(shell pwd)
RM:=$(shell which rm)


# target: help           - display this help.
.PHONY: help
help:
	@egrep '^# target' [Mm]akefile

# target: env            - configure development and build environment.
.PHONY: env
env: env-ui

node_modules: ;

package-lock.json: package.json node_modules
	$(NPM_BIN) $(NPM_INSTALL_CMD) && touch package-lock.json

.PHONY: env-ui
env-ui: package-lock.json

# target: host-ui        - hosts UI server and watches UI code for changes.
.PHONY: host-ui
host-ui: env-ui
	$(NPM_BIN) run dev -- --host

# target: docker-build   - builds the docker image.
.PHONY: docker-build
docker-build:
	$(DOCKER_BIN) build -t $(DOCKER_BUILD_TARGET) $(PWD)

# target: host-docker-ui - hosts UI server within a docker container and watches UI code for changes.
.PHONY: host-docker-ui
host-docker-ui: docker-build
	$(DOCKER_BIN) run --rm -it -p 5173:5173 -v $(PWD):/app --name $(APP_NAME) $(DOCKER_BUILD_TARGET)

.PHONY: docker-dev
docker-dev: env-ui
	$(NPM_BIN) run docker-dev

# target: build          - builds the UI.
.PHONY: build
build: env-ui
	$(NPM_BIN) run build

# target: preview        - previews the app after build.
.PHONY: preview
preview: build
	$(NPM RUN) preview

# target: test           - lint and test with watch mode.
.PHONY: test
test: env-ui
	export $$(cat .env | xargs) && $(NPM_BIN) run lint && $(NPM_BIN) run test:unit

.PHONY: test-ci
test-ci: env-ui
	export $$(cat .env | xargs) && $(NPM_BIN) run lint && $(NPM_BIN) run test:unit:ci

# target: test-e2e       - runs the e2e tests in interactive mode.
.PHONY: test-e2e
test-e2e: env-ui
	$(NPP_BIN) run test:e2e

.PHONY: test-e2e-ci
test-e2e-ci: env-ui
	$(NPM_BIN) run test:e2e:ci

# target: clean          - clean up docker images created.
.PHONY: clean
clean:
	$(DOCKER_BIN) image rm $(DOCKER_BUILD_TARGET)

# target: distclean      - clean up.
.PHONY: distclean
distclean:
	$(RM) -rf node_modules dist coverage npm-debug.log
