FROM golang:1.17 AS builder

RUN mkdir /app
ADD . /app
WORKDIR /app
COPY . .

RUN go mod init modgo
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./...

FROM scratch
COPY --from=builder /app .
CMD ["./main"]

