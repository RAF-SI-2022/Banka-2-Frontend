# Source:
# https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

RUN ["mkdir", "-p", "/usr/local/app"]

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the production build of the application
RUN npm run dev


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Add try_files (see https://angular.io/guide/deployment#server-configuration)
RUN sed -i $'12 a \\n' /etc/nginx/conf.d/default.conf
RUN sed -i '14i\\    # Route everything to Angular' /etc/nginx/conf.d/default.conf
RUN sed -i '15i\\    try_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/banka2-front /usr/share/nginx/html

# Expose port 80
EXPOSE 80