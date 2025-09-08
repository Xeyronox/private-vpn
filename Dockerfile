# 🐳 DOCKER: Multi-stage production-optimized container
# 🔒 SECURITY: Rootless, hardened container with minimal attack surface
# 🚀 OPTIMIZE: Multi-stage build for minimal image size

# 🔁 REFACTOR: Build stage - Node.js with development tools
FROM node:18-alpine AS builder

# 🔐 SECURITY: Create non-root user for build process
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# 🚀 OPTIMIZE: Set working directory
WORKDIR /app

# 🔁 REFACTOR: Copy package files for dependency caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./

# 🚀 OPTIMIZE: Install dependencies with npm ci for faster, reproducible builds
RUN npm ci --only=production --no-audit --no-fund

# 🔒 SECURITY: Copy source code with proper ownership
COPY --chown=nextjs:nodejs . .

# 🚀 OPTIMIZE: Build the application
RUN npm run build

# 🔐 SECURITY: Remove development dependencies and clean cache
RUN npm prune --production && \
    npm cache clean --force

# 🐳 DOCKER: Production stage - Minimal nginx container
FROM nginx:1.25-alpine AS production

# 🔒 SECURITY: Install security updates and required packages
RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
        ca-certificates \
        curl \
        tzdata && \
    rm -rf /var/cache/apk/*

# 🔐 SECURITY: Create non-root user for nginx
RUN addgroup -g 1001 -S nginx && \
    adduser -S nginx -u 1001 -G nginx

# 🚀 OPTIMIZE: Copy nginx configuration
COPY <<EOF /etc/nginx/nginx.conf
# 🔒 SECURITY: Hardened nginx configuration
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # 🔐 SECURITY: Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none';" always;
    
    # 🚀 OPTIMIZE: Performance optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;
    
    # 🔁 REFACTOR: Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
    
    # 🚀 OPTIMIZE: Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone \$binary_remote_addr zone=login:10m rate=1r/s;
    
    server {
        listen 8080;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;
        
        # 🔐 SECURITY: Hide nginx version
        server_tokens off;
        
        # 🚀 OPTIMIZE: Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header X-Frame-Options "SAMEORIGIN" always;
            add_header X-Content-Type-Options "nosniff" always;
        }
        
        # 🔁 REFACTOR: SPA routing
        location / {
            try_files \$uri \$uri/ /index.html;
            
            # 🔒 SECURITY: Rate limiting for general requests
            limit_req zone=api burst=20 nodelay;
            
            # 🚀 OPTIMIZE: Security headers for HTML
            add_header X-Frame-Options "SAMEORIGIN" always;
            add_header X-Content-Type-Options "nosniff" always;
            add_header X-XSS-Protection "1; mode=block" always;
        }
        
        # 🔐 SECURITY: Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
        
        # 🔒 SECURITY: Block common attack vectors
        location ~ /\. {
            deny all;
            access_log off;
            log_not_found off;
        }
        
        location ~ ~$ {
            deny all;
            access_log off;
            log_not_found off;
        }
    }
}
EOF

# 🚀 OPTIMIZE: Copy built application from builder stage
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# 🔐 SECURITY: Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# 🔒 SECURITY: Switch to non-root user
USER nginx

# 🚀 OPTIMIZE: Expose port 8080 (non-privileged)
EXPOSE 8080

# 🔁 REFACTOR: Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/health || exit 1

# 🐳 DOCKER: Start nginx
CMD ["nginx", "-g", "daemon off;"]

# 🔐 SECURITY: Container metadata
LABEL maintainer="Xeyronox <xeyronox@outlook.com>"
LABEL description="SecureVault VPN - Production container"
LABEL version="1.0.0"
LABEL security.scan="enabled"