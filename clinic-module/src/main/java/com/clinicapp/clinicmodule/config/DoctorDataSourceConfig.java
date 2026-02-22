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
        basePackages = "com.clinicapp.doctormodule.infrastructure.persistence",
        entityManagerFactoryRef = "doctorEntityManagerFactory",
        transactionManagerRef = "doctorTransactionManager"
)
public class DoctorDataSourceConfig {

    @Bean("doctorDataSourceProperties")
    @ConfigurationProperties("spring.datasource.doctor")
    public DataSourceProperties dataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean("doctorDataSource")
    public DataSource dataSource(@Qualifier("doctorDataSourceProperties") DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }

    @Bean("doctorEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("doctorDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
        factory.setDataSource(dataSource);
        factory.setPackagesToScan("com.clinicapp.doctormodule.domain.doctor");
        factory.setPersistenceUnitName("doctor");

        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        factory.setJpaVendorAdapter(adapter);

        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.hbm2ddl.auto", "update");
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        jpaProps.put("hibernate.jdbc.time_zone", "UTC");
        factory.setJpaPropertyMap(jpaProps);

        return factory;
    }

    @Bean("doctorTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("doctorEntityManagerFactory") LocalContainerEntityManagerFactoryBean entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory.getObject());
    }
}
