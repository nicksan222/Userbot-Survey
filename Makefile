build-dev:
	@docker compose -f docker-compose.dev.yml build --no-cache

dev: 
	@docker compose -f docker-compose.dev.yml up

down:
	@docker compose -f docker-compose.dev.yml down

sh-backend:
	docker-compose exec backend sh

sh-frontend:
	docker-compose exec frontend sh
