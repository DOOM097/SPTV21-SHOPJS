/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsontools;

import entity.User;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author user
 */
public class UserJsonBuilder {
    public JsonObject getJsonUser(User user){
        JsonObjectBuilder job=Json.createObjectBuilder();
        job.add("id", user.getId());
        job.add("firstname", user.getFirstName());
        job.add("lastname", user.getLastName());
        job.add("phone", user.getPhone());
        job.add("username", user.getUsername());
        job.add("money", user.getMoney());
        return job.build();
    }
}
