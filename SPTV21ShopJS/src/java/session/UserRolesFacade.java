/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Role;
import entity.User;
import entity.UserRoles;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author angel
 */
@Stateless
public class UserRolesFacade extends AbstractFacade<UserRoles> {
    @EJB RoleFacade roleFacade;
    @PersistenceContext(unitName = "ShoesShopPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UserRolesFacade() {
        super(UserRoles.class);
    }
    
    
    public String getRoleNameUser(User user) {
        try {
            List<String> listRoleName = em.createQuery("SELECT ur.role.roleName FROM UserRoles ur WHERE ur.user = :user")
                    .setParameter("user", user)
                    .getResultList();
            if(listRoleName.contains("ADMINISTRATOR")){
                return "ADMINISTRATOR";
            }else if(listRoleName.contains("MANAGER")){
                return "MANAGER";
            }else if(listRoleName.contains("USER")){
                return "USER";
            }else{
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
    public Role getRoleUser(User user){
        try {
            List<Role> listRoles = em.createQuery("SELECT ur.role FROM UserRoles ur WHERE ur.user = :user")
                    .setParameter("user", user)
                    .getResultList();
            Role roleAdmin = roleFacade.findByRoleName("ADMINISTRATOR");
            Role roleManager = roleFacade.findByRoleName("MANAGER");
            Role roleUser = roleFacade.findByRoleName("USER");
            
            if(listRoles.contains(roleAdmin)){
                return roleAdmin;
            }else if(listRoles.contains(roleManager)){
                return roleManager;
            }else if(listRoles.contains(roleUser)){
                return roleUser;
            }else{
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public void setRoleToUser(Role role, User user) {
        removeRolesToUser(user);
        UserRoles userRoles=null;
        if("ADMINISTRATOR".equals(role.getRoleName())){
            Role roleUSER = roleFacade.findByRoleName("USER");
            userRoles = new UserRoles();
            userRoles.setRole(roleUSER);
            userRoles.setUser(user);
            this.create(userRoles);
            Role roleMANAGER = roleFacade.findByRoleName("MANAGER");
            userRoles = new UserRoles();
            userRoles.setRole(roleMANAGER);
            userRoles.setUser(user);
            this.create(userRoles);
            Role roleADMINISTRATOR = roleFacade.findByRoleName("ADMINISTRATOR");
            userRoles = new UserRoles();
            userRoles.setRole(roleADMINISTRATOR);
            userRoles.setUser(user);
            this.create(userRoles);
        }
        if("MANAGER".equals(role.getRoleName())){
            Role roleUSER = roleFacade.findByRoleName("USER");
            userRoles = new UserRoles();
            userRoles.setRole(roleUSER);
            userRoles.setUser(user);
            this.create(userRoles);
            Role roleMANAGER = roleFacade.findByRoleName("MANAGER");
            userRoles = new UserRoles();
            userRoles.setRole(roleMANAGER);
            userRoles.setUser(user);
            this.create(userRoles);
        }
        if("USER".equals(role.getRoleName())){
           Role roleUSER = roleFacade.findByRoleName("USER");
            userRoles = new UserRoles();
            userRoles.setRole(roleUSER);
            userRoles.setUser(user);
            this.create(userRoles);
        }
        
    }

    private void removeRolesToUser(User user) {
        em.createQuery("DELETE FROM UserRoles ur WHERE ur.user = :user")
                .setParameter("user", user)
                .executeUpdate();
    }

    public boolean isRole(String roleName, User user) {
        List<String> listRoleNames = em.createQuery("SELECT ur.role.roleName FROM UserRoles ur WHERE ur.user = :user")
                .setParameter("user", user)
                .getResultList();
        if(listRoleNames.contains(roleName)){
            return true;
        }else{
            return false;
        }
        
    }
}
