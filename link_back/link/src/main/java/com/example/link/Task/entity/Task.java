package com.example.link.Task.entity;

import com.example.link.Project.entity.Project;
import com.example.link.Task.TaskPriority;
import com.example.link.Task.TaskStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter @Setter @Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int taskId;

    private int assignedUser;

    @Column(length = 256)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String startDate;
    private String deadline;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'") // 'Default' 처럼 single quotation 으로 감싸줘야 적용됨 아니면 ddl 타이밍에 깨지고 테이블 생성 안 됨
    private TaskPriority taskPriority = TaskPriority.NONE;

    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'")
    private TaskStatus status = TaskStatus.NONE;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

}
