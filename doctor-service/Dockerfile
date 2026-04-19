FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
RUN --mount=type=cache,target=/root/.m2 mvn -f common/pom.xml install -DskipTests

COPY doctor-service/pom.xml ./doctor-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f doctor-service/pom.xml dependency:go-offline

COPY doctor-service/src ./doctor-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f doctor-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/doctor-service/target/*.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]