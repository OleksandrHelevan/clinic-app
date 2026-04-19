FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
RUN --mount=type=cache,target=/root/.m2 mvn -f common/pom.xml install -DskipTests

COPY booking-service/pom.xml ./booking-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f booking-service/pom.xml dependency:go-offline

COPY booking-service/src ./booking-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f booking-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/booking-service/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]