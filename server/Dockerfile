FROM golang:1.24-alpine

RUN adduser -D appuser
USER appuser

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY main.go controllers/ models/ routes/ ./
RUN go build -o server .

EXPOSE 8080
CMD ["./server"]
