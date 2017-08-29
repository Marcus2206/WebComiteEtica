
import java.security.Principal;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.ManagedBean;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.context.*;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author rasec
 */
@ManagedBean  
 @RequestScoped  
public class AuthBackingBean {
    private static Logger log = Logger.getLogger(AuthBackingBean.class.getName());  
        
      private String username;  
      private String password;  
        
      public String login() {  
           FacesContext context = FacesContext.getCurrentInstance();  
           HttpServletRequest request = (HttpServletRequest) context  
                                              .getExternalContext().getRequest();  
             
           try {  
                request.login(username, password);  
           } catch (ServletException e) {  
                context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_WARN, "Login failed!", null));  
                return "login";  
           }  
             
           //you can fetch user from database for authenticated principal and do some action  
           Principal principal = request.getUserPrincipal();  
           log.info("Authenticated user: " + principal.getName());  
             
             
           if(request.isUserInRole("ADMIN")) {  
                return "/admins/admins?faces-redirect=true";  
           } else {  
                return "/users/users?faces-redirect=true";  
           }  
      }  
        
      public String logout() {  
           String result="/index?faces-redirect=true";  
             
           FacesContext context = FacesContext.getCurrentInstance();  
           HttpServletRequest request = (HttpServletRequest)context.getExternalContext().getRequest();  
             
           try {  
                request.logout();  
           } catch (ServletException e) {  
                log.log(Level.SEVERE, "Failed to logout user!", e);  
                result = "/loginError?faces-redirect=true";  
           }  
             
           return result;  
      }  
   
      public String getUsername() {  
           return username;  
      }  
   
      public void setUsername(String username) {  
           this.username = username;  
      }  
   
      public String getPassword() {  
           return password;  
      }  
   
      public void setPassword(String password) {  
           this.password = password;  
      }  
}
