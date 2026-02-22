package com.clinicapp.clinicmodule.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.clinicapp.patientmodule.infrastructure.persistence",
        entityManagerFactoryRef = "patientEntityManagerFactory",
        transactionManagerRef = "patientTransactionManager"
)
public class PatientDataSourceConfig {

    @Bean("patientDataSourceProperties")
    @ConfigurationProperties("spring.datasource.patient")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean("patientDataSource")
    public DataSource dataSource(@Qualifier("patientDataSourceProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    @Bean("patientEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("patientDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.clinicapp.patientmodule.domain.patient");
        factory.setPersistenceUnitName("patient");

        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        factory.setJpaVendorAdapter(adapter);

        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.hbm2ddl.auto", "update");
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        jpaProps.put("hibernate.jdbc.time_zone", "UTC");
        factory.setJpaPropertyMap(jpaProps);

        return factory;
    }

    @Bean("patientTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("patientEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }
}
