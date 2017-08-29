<%-- 
    Document   : logout
    Created on : 28-ago-2017, 12:17:49
    Author     : rasec
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    session.invalidate();
    response.sendRedirect("/WebComiteEtica");
%>
