package com.hr.candidates.controller;

import com.hr.candidates.model.Candidate;
import com.hr.candidates.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService candidateService;

    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateService.getAllCandidates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
        return ResponseEntity.ok(candidateService.getCandidateById(id));
    }

    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        return ResponseEntity.ok(candidateService.createCandidate(candidate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidate(@PathVariable Long id) {
        candidateService.deleteCandidate(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Candidate> searchByName(@RequestParam String name) {
        return candidateService.searchByName(name);
    }

    @GetMapping("/search/skill")
    public List<Candidate> searchBySkill(@RequestParam String skillName) {
        return candidateService.searchBySkill(skillName);
    }

    @PutMapping("/{candidateId}/skills/{skillId}")
    public ResponseEntity<Candidate> addSkill(@PathVariable Long candidateId, @PathVariable Long skillId) {
        return ResponseEntity.ok(candidateService.addSkillToCandidate(candidateId, skillId));
    }

    @DeleteMapping("/{candidateId}/skills/{skillId}")
    public ResponseEntity<Candidate> removeSkill(@PathVariable Long candidateId, @PathVariable Long skillId) {
        return ResponseEntity.ok(candidateService.removeSkillFromCandidate(candidateId, skillId));
    }
}