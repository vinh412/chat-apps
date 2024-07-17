package com.vinhdd.chatapi.exception;

import com.vinhdd.chatapi.payload.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RestControllerExceptionHandler {

    @ExceptionHandler(BadRequestException.class)
    @ResponseBody
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ResponseEntity<ApiResponse> resolveException(BadRequestException exception) {
        ApiResponse apiResponse = exception.getApiResponse();
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}
