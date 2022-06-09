from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# https://stackoverflow.com/questions/45587087/docker-python-simplehhtpserver-not-working
# Basically use 0.0.0.0, not 127.0.0.1
def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
  server_address = ("0.0.0.0", int(os.environ['FRONTEND_PORT']))
  http = server_class(server_address, handler_class)
  print("starting python http.server...")
  http.serve_forever()

if __name__ == "__main__":
  run()
