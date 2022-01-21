package adventure.time.controllers;

import adventure.time.domain.Result;
import adventure.time.domain.ResultType;
import adventure.time.models.AppUser;
import adventure.time.security.AppUserService;
import adventure.time.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.ValidationException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtConverter converter;
    private final AppUserService appUserService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtConverter converter,
                          AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.converter = converter;
        this.appUserService = appUserService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody Map<String, String> credentials) {

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

        Authentication authentication = authenticationManager.authenticate(authToken);
        System.out.println("passed auth manager");
        if (authentication.isAuthenticated()) {
            String jwtToken = converter.getTokenFromUser((User) authentication.getPrincipal());

            HashMap<String, String> map = new HashMap<>();
            map.put("jwt_token", jwtToken);

            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<Map<String, String>> refreshToken(UsernamePasswordAuthenticationToken principal) {
        User user = new User(principal.getName(), principal.getName(), principal.getAuthorities());
        String jwtToken = converter.getTokenFromUser(user);

        HashMap<String, String> map = new HashMap<>();
        map.put("jwt_token", jwtToken);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/register")
    public  ResponseEntity<Object> register (@RequestBody Map<String, String> credentials) {
        try {
            AppUser result = appUserService.create(credentials.get("username"), credentials.get("password"));
            return new ResponseEntity<>( HttpStatus.CREATED);
        } catch (ValidationException ex) {
            Result<AppUser> result = new Result<>();
            result.addMessage(ex.getMessage(), ResultType.INVALID);
            return ErrorResponseController.build(result);
        }
    }

    /**
     * TODO
     * add /register
     * add 3rd party authentication
     */

}