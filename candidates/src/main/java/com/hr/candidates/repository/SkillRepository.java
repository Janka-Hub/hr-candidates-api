package com.hr.candidates.repository;
import com.hr.candidates.model.Skill;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
}
