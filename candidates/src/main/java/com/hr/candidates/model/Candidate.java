package com.hr.candidates.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "candidates")
public class Candidate {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public String name;

    @Column(nullable = false, unique = true)
    public String email;

    private String contactNumber;


    public LocalDate dateOfBirth;

    @ManyToMany
    @JoinTable(
        name = "candidate_skills",
        joinColumns = @JoinColumn(name = "candidate_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    public List<Skill> skills;
}
