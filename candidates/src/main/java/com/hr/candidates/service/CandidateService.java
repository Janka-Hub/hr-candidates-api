package com.hr.candidates.service;

import com.hr.candidates.model.Candidate;
import com.hr.candidates.model.Skill;
import com.hr.candidates.repository.CandidateRepository;
import com.hr.candidates.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final SkillRepository skillRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id).orElseThrow();
    }

    public Candidate createCandidate(Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    public void deleteCandidate(Long id) {
        candidateRepository.deleteById(id);
    }

    public List<Candidate> searchByName(String name) {
        return candidateRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Candidate> searchBySkill(String skillName) {
        return candidateRepository.findBySkills_Name(skillName);
    }

    public Candidate addSkillToCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();
        Skill skill = skillRepository.findById(skillId).orElseThrow();
        candidate.getSkills().add(skill);
        return candidateRepository.save(candidate);
    }

    public Candidate removeSkillFromCandidate(Long candidateId, Long skillId) {
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();
        candidate.getSkills().removeIf(s -> s.getId().equals(skillId));
        return candidateRepository.save(candidate);
    }
}