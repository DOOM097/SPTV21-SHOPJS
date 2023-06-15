/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.History;
import entity.Model;
import entity.Role;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsontools.UserJsonBuilder;
import jsontools.RoleJsonBuilder;
import session.HistoryFacade;
import session.ModelFacade;
import session.RoleFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author user
 */
@WebServlet(name = "AdminServlet", urlPatterns = {
    "/getRoles",
    "/getUsersMap",
    "/setUserRole",
    "/getIncome",
    "/getIncomePerMonth"
    
    
})
@MultipartConfig
public class AdminServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private HistoryFacade historyFacade;
    
    private PasswordProtected pp = new PasswordProtected();
    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        if(session == null){
            job.add("info", "Вы не авторизованы");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
            job.add("info", "Вы не авторизованы");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        if(!userRolesFacade.isRole("ADMINISTRATOR",authUser)){
            job.add("info", "У вас нет необходимых разрешений");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/getRoles":
                List<Role> listRoles = roleFacade.findAll();
                JsonArrayBuilder jab = Json.createArrayBuilder();
                for(int i = 0; i < listRoles.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listRoles.get(i).getId());
                    jsonRoleBuilder.add("roleName", listRoles.get(i).getRoleName());
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("roles", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getUsersMap":
                List<User> listUsers = userFacade.findAll();
                jab = Json.createArrayBuilder();
                
                UserJsonBuilder ujb = new UserJsonBuilder();
                for (int i = 0; i < listUsers.size(); i++) {
                    JsonObjectBuilder jsonUserRoleBuilder = Json.createObjectBuilder();
                    jsonUserRoleBuilder.add("user", ujb.getJsonUser(listUsers.get(i)));
                    jsonUserRoleBuilder.add("role", userRolesFacade.getRoleNameUser(listUsers.get(i)));
                    jab.add(jsonUserRoleBuilder.build());
                }
                job.add("status", true);
                job.add("usersMap",jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                
            case "/getIncome":
                int income=0;
                List<History> incomeModel= historyFacade.findAll();
                for (int i = 0; i < incomeModel.size(); i++) {
                income+=incomeModel.get(i).getModel().getPrice();
                }
                job.add("income", income);
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                }
                break;
            case "/getIncomePerMonth":
                int incomePerMonth=0;
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jo = jsonReader.readObject();
                String month = jo.getString("month");
                List<History> history= historyFacade.findAll();
                for (int i = 0; i < history.size(); i++) {
                    Date date=history.get(i).getPurchaseModel();
                    boolean toSum= summator(date,Integer.parseInt(month)-1,2022);
                    if (history.get(i)!=null & toSum){
                        incomePerMonth+=history.get(i).getModel().getPrice();
                    }
                }
                job.add("incomePerMonth", incomePerMonth);
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                }
            case "/setUserRole":
                try {
                    JsonReader jsonReader1 = Json.createReader(request.getReader());
                    JsonObject jo1 = jsonReader1.readObject();
                    String userId = jo1.getString("userId","");
                    String roleId = jo1.getString("roleId","");
                    User user = userFacade.find(Long.parseLong(userId));
                    if("admin".equals(user.getUsername())){
                        job.add("status",false);
                        job.add("info", "Этому пользователю изменить роль нет возможности");
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                        break;
                    }
                    Role role = roleFacade.find(Long.parseLong(roleId));
                    userRolesFacade.setRoleToUser(role,user);
                        job.add("status",true);
                        job.add("user", new UserJsonBuilder().getJsonUser(user));
                        job.add("role", new RoleJsonBuilder().getJsonRole(role));
                } catch (IOException | NumberFormatException e) {
                    job.add("status",false);
                }
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                
                break;
                
        }
        
    }
        private boolean summator(Date date, int chosenMonth,int years) {
        Calendar cal=Calendar.getInstance();
        cal.setTime(date);
        int month=cal.get(Calendar.MONTH);
        int year=cal.get(Calendar.YEAR);
        if (month==chosenMonth & year==years) {
            return true;
        }else{
            return false;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
