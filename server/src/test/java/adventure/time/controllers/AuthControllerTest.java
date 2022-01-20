package adventure.time.controllers;

import adventure.time.models.AppUser;
import adventure.time.security.AppUserService;
import adventure.time.security.JwtConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest {

    @Autowired
    AuthController controller;

    @MockBean
    AuthenticationManager authenticationManager;

    @MockBean
    JwtConverter converter;

    @MockBean
    AppUserService appUserService;

    @Autowired
    MockMvc mvc;



    @Test
    void authenticateShouldReturn403WhenWrongCredentialsOrNotFound() throws Exception {

        Map<String, String> credentials = Map.of("username", "john@smith.com", "password", "wrongPassword");

        ObjectMapper jsonMapper = new ObjectMapper();
        String authorizationJson = jsonMapper.writeValueAsString(credentials);

        var request = post("/authenticate")
                .contentType(MediaType.APPLICATION_JSON)
                .content(authorizationJson);

        mvc.perform(request)
                .andExpect(status().isForbidden());

    }
}