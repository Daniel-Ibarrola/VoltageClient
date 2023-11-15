.DEFAULT_GOAL: help

help:
	@echo "Available commands:"
	@echo
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build: ## Build the development environment
	docker compose build

up: ## Start the development server on port 5173
	docker compose up

test: ## Run the tests
	docker compose exec voltage-client npm run test

down: ## Remove all containers
	docker compose down --remove-orphans

logs: ## View logs
	docker compose logs --tail=25 grapher
