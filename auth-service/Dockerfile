FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY security-lib/pom.xml ./security-lib/pom.xml
COPY security-lib/src ./security-lib/src
RUN --mount=type=cache,target=/root/.m2 mvn -f security-lib/pom.xml install -DskipTests

COPY auth-service/pom.xml ./auth-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -U -f auth-service/pom.xml dependency:go-offline

COPY auth-service/src ./auth-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f auth-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/auth-service/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]