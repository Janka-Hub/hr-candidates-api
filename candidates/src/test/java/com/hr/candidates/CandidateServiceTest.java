package com.hr.candidates;

import com.hr.candidates.model.Candidate;
import com.hr.candidates.repository.CandidateRepository;
import com.hr.candidates.service.CandidateService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository;

    @InjectMocks
    private CandidateService candidateService;

    @Test
    void getAllCandidates_returnsAll() {
        Candidate c = new Candidate();
        c.setName("Petar");
        when(candidateRepository.findAll()).thenReturn(List.of(c));

        List<Candidate> result = candidateService.getAllCandidates();

        assertEquals(1, result.size());
        assertEquals("Petar", result.get(0).getName());
    }

    @Test
    void getCandidateById_returnsCandidate() {
        Candidate c = new Candidate();
        c.setId(1L);
        when(candidateRepository.findById(1L)).thenReturn(Optional.of(c));

        Candidate result = candidateService.getCandidateById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void createCandidate_savesAndReturns() {
        Candidate c = new Candidate();
        c.setName("Ana");
        when(candidateRepository.save(c)).thenReturn(c);

        Candidate result = candidateService.createCandidate(c);

        assertEquals("Ana", result.getName());
        verify(candidateRepository, times(1)).save(c);
    }

    @Test
    void deleteCandidate_callsRepository() {
        candidateService.deleteCandidate(1L);
        verify(candidateRepository, times(1)).deleteById(1L);
    }

    @Test
    void searchByName_returnsMatching() {
        Candidate c = new Candidate();
        c.setName("Marko");
        when(candidateRepository.findByNameContainingIgnoreCase("mar"))
                .thenReturn(List.of(c));

        List<Candidate> result = candidateService.searchByName("mar");

        assertEquals(1, result.size());
        assertEquals("Marko", result.get(0).getName());
    }
}