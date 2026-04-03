package com.hr.candidates.service;
import com.hr.candidates.model.Skill;
import com.hr.candidates.repository.SkillRepository;
import  lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }



    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }



    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
