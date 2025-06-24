# Node build stage for React/Vite
FROM node:18-alpine as node_builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


# PHP-Apache stage
FROM php:8.2-apache
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl && \
    docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd && \
    a2enmod rewrite

# Set DocumentRoot to /public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . .

# Copy built Vite assets
COPY --from=node_builder /app/public/build ./public/build

# Install PHP dependencies
#RUN composer install --no-dev --optimize-autoloader

RUN composer install --no-dev --optimize-autoloader \
    && php artisan migrate \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \

# Permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html && \
    chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80
