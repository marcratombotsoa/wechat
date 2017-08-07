package mg.wechat.security;

//import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
	
//	@Value("${cors.authorized.client}")
//	private String clientAppPath;
	
	/**
	 * {@inheritDoc}
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		String[] allowedOrigins = {"*"};
		registry.addMapping("/**")
		.allowedMethods("GET", "POST", "PUT", "DELETE")
		.allowedOrigins(allowedOrigins);
	}
	
	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
}
