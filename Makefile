.DEFAULT_GOAL: help

help:
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build: ## Build the development environment
	docker compose build

dev: ## Start the development server on port 5173
	docker compose up

test: ## Run the tests
	docker compose exec voltage npm run test

prod: ## Build and host the app with nginx
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d

down: ## Remove all containers
	docker compose down --remove-orphans

logs: ## View logs
	docker compose logs --tail=25 grapher
