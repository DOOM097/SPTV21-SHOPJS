
package servlets;

import entity.History;
import entity.Model;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsontools.UserJsonBuilder;
import jsontools.ModelJsonBuilder;
import session.HistoryFacade;
import session.ModelFacade;
import session.UserFacade;
import session.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author user
 */
@WebServlet(name = "UserServlet", urlPatterns = {
    "/editProfile",
    "/buyShoe",
    "/getListBuyModels",
    "/getListModel"
    
})
public class UserServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private HistoryFacade historyFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private ModelFacade modelFacade;
    
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
        if(!userRolesFacade.isRole("USER",authUser)){
            job.add("info", "У вас нет необходимых разрешений");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/getListBuyModels"://Выдача списка обуви
                List<Model> models = modelFacade.findAll();
                ModelJsonBuilder mjb = new ModelJsonBuilder();
                if(!models.isEmpty()) {
                    job.add("status", true)
                        .add("options", mjb.getJsonArrayModel(models));
                }
                try(PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getListModel":
                List<Model> listShoes = modelFacade.findAll();
                if(listShoes.isEmpty()){
                    job.add("listShoes", "");
                    job.add("status", true).add("info", "Список обуви пуст!");
                    try (PrintWriter out = response.getWriter()) {
                      out.println(job.build().toString());
                    } 
                    break;
                }
                mjb = new ModelJsonBuilder();
                job.add("listShoes", mjb.getJsonArrayModel(listShoes));
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                } 
                break;
            case "/buyShoe":
                JsonReader jsonReader = Json.createReader(request.getReader());//Покупка обуви
                JsonObject jo = jsonReader.readObject();
                String id = jo.getString("id");
                Model currentModel = modelFacade.find(Long.parseLong(id));
                if(Integer.parseInt(authUser.getMoney())<currentModel.getPrice()){
                    job.add("info", "У вас не хватает средств");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    }
                    break;
                }
                currentModel.setAmount(currentModel.getAmount()-1);
                authUser.setMoney(Integer.toString(Integer.parseInt(authUser.getMoney())-currentModel.getPrice()));
                History history = new History();
                history.setModel(currentModel);
                history.setPurchaseModel(Calendar.getInstance().getTime());
                history.setUser(authUser);
                modelFacade.edit(currentModel);
                userFacade.edit(authUser);
                historyFacade.create(history);
                job.add("info", "Обувь "+currentModel.getName()+" успешно куплена");
                job.add("status", true);
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                break;
            case "/editProfile":
                JsonReader jsonReader1 = Json.createReader(request.getReader());//Изменнение профиля
                JsonObject jo1 = jsonReader1.readObject();
                int id1 = jo1.getInt("id");
                String newFirstname = jo1.getString("newFirstname","");
                String newLastname = jo1.getString("newLastname","");
                String newPhone = jo1.getString("newPhone","");
                String newMoney = jo1.getString("newMoney","");
                User newUser = userFacade.find((long)id1);
                if(newUser == null){
                    job.add("info", "Нет такого пользователя");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                       out.println(job.build().toString());
                    }
                }
                newUser.setFirstName(newFirstname);
                newUser.setLastName(newLastname);
                newUser.setPhone(newPhone);
                newUser.setMoney(Integer.toString(Integer.parseInt(authUser.getMoney())+Integer.parseInt(newMoney)));
                userFacade.edit(newUser);
                session.setAttribute("authUser", newUser);
                job.add("info", "Профиль пользователя "+newUser.getUsername()+" успешно изменен");
                job.add("status", true);
                job.add("user", new UserJsonBuilder().getJsonUser(newUser));
                try (PrintWriter out = response.getWriter()) {
                   out.println(job.build().toString());
                } 
                
                break;
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
