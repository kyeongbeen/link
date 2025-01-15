package com.example.link.Task.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskFromRepresentativeDTO {
    private int userId;
    private String userName;
    private int taskNumber;
}
