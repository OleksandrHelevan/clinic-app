FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app

COPY config-service/pom.xml ./pom.xml
RUN mvn dependency:go-offline -q

COPY config-service/src ./src
RUN mvn clean package -Dmaven.test.skip=true -q

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8888

ENTRYPOINT ["java", "-jar", "app.jar"]