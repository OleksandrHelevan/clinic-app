FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder

WORKDIR /app

COPY common/pom.xml ./common/pom.xml
COPY common/src ./common/src
RUN --mount=type=cache,target=/root/.m2 mvn -f common/pom.xml install -DskipTests

COPY patient-service/pom.xml ./patient-service/pom.xml
RUN --mount=type=cache,target=/root/.m2 mvn -f patient-service/pom.xml dependency:go-offline

COPY patient-service/src ./patient-service/src
RUN --mount=type=cache,target=/root/.m2 mvn -f patient-service/pom.xml clean package -DskipTests


FROM eclipse-temurin:21-jre-jammy

WORKDIR /app
COPY --from=builder /app/patient-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]