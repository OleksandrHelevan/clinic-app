FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY discovery-service/pom.xml ./discovery-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f discovery-service/pom.xml dependency:go-offline

COPY discovery-service/src ./discovery-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f discovery-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/discovery-service/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]