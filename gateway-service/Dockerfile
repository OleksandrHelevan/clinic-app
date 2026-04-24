FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY security-lib/pom.xml ./security-lib/pom.xml
COPY security-lib/src ./security-lib/src
RUN --mount=type=cache,target=/root/.m2 mvn -f security-lib/pom.xml install -DskipTests

COPY gateway-service/pom.xml ./gateway-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f gateway-service/pom.xml dependency:go-offline

COPY gateway-service/src ./gateway-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f gateway-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/gateway-service/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]