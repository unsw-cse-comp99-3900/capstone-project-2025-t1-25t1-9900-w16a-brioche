# Use an official Node.js runtime as a parent image (Version 22)
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Generate self-signed certificate for localhost with 2048 bit key
RUN mkdir /app/certs && \
    node -e "const selfsigned = require('selfsigned'); const fs = require('fs'); const pems = selfsigned.generate([{ name: 'commonName', value: 'localhost' }], { days: 365, keySize: 2048 }); fs.writeFileSync('/app/certs/localhost.pem', pems.cert); fs.writeFileSync('/app/certs/localhost.key', pems.private);"

# Copy the rest of the application code
COPY . .

# Hardcode environment variables from .env
# Note: Storing secrets directly in the image is not recommended for production.
# Consider using Docker secrets or environment variables via docker-compose for better security.
ENV VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29taWMtZHJha2UtODQuY2xlcmsuYWNjb3VudHMuZGV2JA
ENV VITE_GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyCNl8ubVsNoTcUqR8pN_uF3bMpL1Hwu_h0
# If the frontend needs to know the backend URL:
ENV VITE_API_BASE_URL=http://backend:5080

# Build the React application
# RUN pnpm run build
# Explicitly run tsc and vite using pnpm exec to ensure correct path resolution
RUN pnpm exec tsc -b && pnpm exec vite build

# Use a lightweight web server to serve the static files
FROM nginx:alpine

# Create directory for certificates
RUN mkdir -p /etc/nginx/certs

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the generated self-signed certificates from the build stage
COPY --from=build /app/certs/localhost.pem /etc/nginx/certs/localhost.pem
COPY --from=build /app/certs/localhost.key /etc/nginx/certs/localhost.key

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 443 for HTTPS
EXPOSE 443

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"] 