package com.example.web;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * web 配置类
 */
@Configuration
public class WebConfig {
    /**
     * xssFilter注册
     */
    @Bean
    public FilterRegistrationBean xssFilterRegistration() {
        XssFilter xssFilter = new XssFilter();
        xssFilter.setUrlExclusion(Arrays.asList("/notice/update","/notice/add"));
        FilterRegistrationBean registration = new FilterRegistrationBean(xssFilter);
        registration.addUrlPatterns("/*");
        return registration;
    }
}
