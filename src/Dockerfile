FROM nginx:alpine

RUN mkdir /etc/nginx/logs
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/

COPY mime.conf /etc/nginx/
COPY nginx.conf /etc/nginx/


EXPOSE 80

