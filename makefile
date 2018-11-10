.PHONY: default lint test build

default: deps-node


test-watch: deps-node
	docker-compose run --rm app npm run test:watch

test: deps-node
	docker-compose run --rm app npm test

lint: deps-node
	docker-compose run app npm run lint

build: deps-node
	docker-compose run --rm app npm run build

demo: deps-node
	docker-compose run --rm app npm run build:demo

demo-dev: deps-node
	node node_modules/webpack-dev-server/bin/webpack-dev-server --config webpack.config.demo.js  --host=0.0.0.0 --content-base=demo/dist --hot --inline --watch


################################################################################
# Node

.PHONY: deps-node clean-deps-node
NODE_BINS = node_modules/.bin

$(NODE_BINS): node_modules

node_modules: package.json
	npm install -q --no-optional --unsafe-perm
	@touch node_modules
	@touch $(NODE_BINS)

deps-node: $(NODE_BINS)


