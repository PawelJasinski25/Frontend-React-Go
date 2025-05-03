FROM golang:1.24-alpine

RUN adduser -D appuser
USER appuser

WORKDIR /app
COPY . .
RUN go mod tidy && go build -o server .

EXPOSE 8080
CMD ["./server"]
