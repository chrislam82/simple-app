FROM python:3.10-alpine
WORKDIR /simple-app/frontend
COPY . .
ARG BACKEND_PORT
RUN ./load_env.sh $BACKEND_PORT
CMD ["python", "server.py"]
