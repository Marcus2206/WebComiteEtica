<%-- 
    Document   : login
    Created on : 27-ago-2017, 18:27:18
    Author     : rasec
--%>
<!--

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>-->

<div class="container" >
    <div class="row">
        <div class="col-md-12">
            <h3>Logeo jsp</h3>

                                    <form class="form">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <input type="text" class="form-control" value="{authBackingBean.username}" placeholder="username" required=""/>
                                            </div> 
                        
                                            <div class="form-group">
                                                <input type="password" class="form-control" ng-model="password" placeholder="password" required=""/>
                                            </div>
                        
                                            <div class="form-group">
                                                <button type="submit" class="btn btn-success">Login</button>
                                                <span class="text-danger">{{ error}}</span>
                                            </div>
                        
                                        </div>
                                    </form>

<!--            <form method="post" action="j_security_check">
                <input type="text" name="j_username" value=""/>
                <input type="password" name="j_password"/>
                <input type="submit" value="Submit" >
                <input type="reset" value="Reset" >
                <%
//                    String url = "http://localhost:8070/RestComiteEtica/j_security_check?j_username=cmedina&j_password=123";
//                    String redirectUrl = response.encodeRedirectURL(url);
//                    response.sendRedirect(redirectUrl);
                %>
            </form>-->
        </div>
    </div>
</div>
<!--    </body>
</html>-->
