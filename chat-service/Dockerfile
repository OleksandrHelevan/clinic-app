FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
RUN --mount=type=cache,target=/root/.m2 mvn -f common/pom.xml install -DskipTests

COPY chat-service/pom.xml ./chat-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f chat-service/pom.xml dependency:go-offline

COPY chat-service/src ./chat-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f chat-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/chat-service/target/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]