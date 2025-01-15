package com.example.link.Task.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter @Getter @Builder
public class TaskFromPriorityDTO {
//    HIGH, MEDIUM, LOW, NONE
    private int high;
    private int medium;
    private int low;
    private int none;
}
