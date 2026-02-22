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
        basePackages = "com.clinicapp.medicalrecordmodule.infrastructure.persistence",
        entityManagerFactoryRef = "medicalRecordEntityManagerFactory",
        transactionManagerRef = "medicalRecordTransactionManager"
)
public class MedicalRecordDataSourceConfig {

    @Bean("medicalRecordDataSourceProperties")
    @ConfigurationProperties("spring.datasource.medical-record")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean("medicalRecordDataSource")
    public DataSource dataSource(@Qualifier("medicalRecordDataSourceProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    @Bean("medicalRecordEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("medicalRecordDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.clinicapp.medicalrecordmodule.domain.medicalrecord");
        factory.setPersistenceUnitName("medicalRecord");

        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        factory.setJpaVendorAdapter(adapter);

        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.hbm2ddl.auto", "update");
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        jpaProps.put("hibernate.jdbc.time_zone", "UTC");
        factory.setJpaPropertyMap(jpaProps);

        return factory;
    }

    @Bean("medicalRecordTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("medicalRecordEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }
}
