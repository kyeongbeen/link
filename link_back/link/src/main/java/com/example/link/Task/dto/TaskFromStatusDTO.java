package com.example.link.Task.dto;

import lombok.*;


@Data
@Getter @Setter @Builder
public class TaskFromStatusDTO {

    private int totalTasks; // 총 작업 갯수
    private int finishedTasks; // 완료된 작업 갯수
    private int delayedTasks; // 지연된 작업 갯수
    private int ongoingTasks; // 진행중인 작업 갯수
    private int incompleteTasks; // 미완료 작업 갯수


//  - 완료된 작업d
//	- 미완료 작업
//	- 지연된 작업d
//	- 총 작업d
//	- 진행중인 작업
//	- 담당자별 예정된 작업
}
