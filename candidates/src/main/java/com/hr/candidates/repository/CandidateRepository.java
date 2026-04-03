package com.hr.candidates.repository;
import  com.hr.candidates.model.Candidate;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByNameContainingIgnoreCase(String name);

    List<Candidate> findBySkills_Name(String skillName);
}
