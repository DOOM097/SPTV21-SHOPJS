/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsontools;

import entity.Role;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author user
 */
public class RoleJsonBuilder {
    public JsonObject getJsonRole(Role role){
        JsonObjectBuilder job=Json.createObjectBuilder();
        job.add("id", role.getId());
        job.add("roleName", role.getRoleName());
        return job.build();
    }
}
