FROM python:2.7-alpine
RUN apk update && apk upgrade && apk add bash curl
RUN pip install flask elasticsearch flask-cors geocoder
COPY . ./app
WORKDIR app
ENTRYPOINT ["sh", "start.sh"]
CMD ["app.py"]
