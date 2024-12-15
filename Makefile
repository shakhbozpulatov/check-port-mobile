deploy:
	git pull origin main
	yarn
	yarn build
	pm2 restart ecosystem.config.cjs