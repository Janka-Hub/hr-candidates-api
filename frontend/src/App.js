import { useState, useEffect } from "react";

const API = "http://localhost:8080/api";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [editCandidate, setEditCandidate] = useState(null);

  useEffect(() => {
    fetchCandidates();
    fetchSkills();
  }, []);

  const fetchCandidates = () => {
    fetch(`${API}/candidates`).then(r => r.json()).then(setCandidates);
  };

  const fetchSkills = () => {
    fetch(`${API}/skills`).then(r => r.json()).then(setSkills);
  };

  const addCandidate = () => {
    if (!name || !email) return alert("Name and email are required!");
    fetch(`${API}/candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, contactNumber: contact, dateOfBirth: dob || null, skills: [] })
    }).then(r => r.json()).then(async (candidate) => {
      for (const skillId of selectedSkills) {
        await fetch(`${API}/candidates/${candidate.id}/skills/${skillId}`, { method: "PUT" });
      }
      fetchCandidates();
      setName(""); setEmail(""); setContact(""); setDob(""); setSelectedSkills([]);
    });
  };

  const deleteCandidate = (id) => {
    fetch(`${API}/candidates/${id}`, { method: "DELETE" }).then(fetchCandidates);
  };

  const addSkill = () => {
    if (!newSkillName) return;
    fetch(`${API}/skills`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkillName })
    }).then(() => { fetchSkills(); setNewSkillName(""); });
  };

  const toggleSkill = (id) => {
    setSelectedSkills(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const searchByName = () => {
    fetch(`${API}/candidates/search?name=${searchName}`).then(r => r.json()).then(setCandidates);
  };

  const searchBySkill = () => {
    fetch(`${API}/candidates/search/skill?skillName=${searchSkill}`).then(r => r.json()).then(setCandidates);
  };

  const openEdit = (candidate) => {
    setEditCandidate({
      ...candidate,
      skillIds: candidate.skills.map(s => s.id)
    });
  };

  const toggleEditSkill = async (skillId) => {
    const hasSkill = editCandidate.skillIds.includes(skillId);
    if (hasSkill) {
      await fetch(`${API}/candidates/${editCandidate.id}/skills/${skillId}`, { method: "DELETE" });
    } else {
      await fetch(`${API}/candidates/${editCandidate.id}/skills/${skillId}`, { method: "PUT" });
    }
    const updated = await fetch(`${API}/candidates/${editCandidate.id}`).then(r => r.json());
    setEditCandidate({ ...updated, skillIds: updated.skills.map(s => s.id) });
    fetchCandidates();
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>HR Candidates</h1>

      {editCandidate && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "white", padding: "30px", borderRadius: "8px", minWidth: "400px" }}>
            <h2>Edit Skills — {editCandidate.name}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
              {skills.map(s => (
                <span key={s.id}
                  onClick={() => toggleEditSkill(s.id)}
                  style={{
                    padding: "6px 14px", borderRadius: "12px", cursor: "pointer",
                    background: editCandidate.skillIds.includes(s.id) ? "#007bff" : "#eee",
                    color: editCandidate.skillIds.includes(s.id) ? "white" : "black"
                  }}>
                  {s.name}
                </span>
              ))}
            </div>
            <button onClick={() => setEditCandidate(null)}
              style={{ padding: "8px 16px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "40px" }}>
        <div style={{ flex: 1 }}>
          <h2>Add Candidate</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <input placeholder="Full name *" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Contact number" value={contact} onChange={e => setContact(e.target.value)} />
            <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
            <div>
              <b>Select skills:</b>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {skills.map(s => (
                  <span key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    style={{
                      padding: "4px 10px", borderRadius: "12px", cursor: "pointer",
                      background: selectedSkills.includes(s.id) ? "#007bff" : "#eee",
                      color: selectedSkills.includes(s.id) ? "white" : "black"
                    }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
            <button onClick={addCandidate} style={{ padding: "8px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
              Add Candidate
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2>Add Skill</h2>
          <input placeholder="Skill name" value={newSkillName} onChange={e => setNewSkillName(e.target.value)} />
          <button onClick={addSkill} style={{ marginLeft: "8px" }}>Add</button>
          <ul>
            {skills.map(s => <li key={s.id}>{s.name}</li>)}
          </ul>
        </div>
      </div>

      <h2>Search</h2>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <input placeholder="Search by name..." value={searchName} onChange={e => setSearchName(e.target.value)} />
          <button onClick={searchByName}>Search</button>
        </div>
        <div>
          <input placeholder="Search by skill..." value={searchSkill} onChange={e => setSearchSkill(e.target.value)} />
          <button onClick={searchBySkill}>Search</button>
        </div>
        <button onClick={fetchCandidates}>Show all</button>
      </div>

      <h2>Candidates ({candidates.length})</h2>
      <table border="1" cellPadding="8" width="100%" style={{ borderCollapse: "collapse" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Date of Birth</th>
            <th>Skills</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.contactNumber}</td>
              <td>{c.dateOfBirth}</td>
              <td>{c.skills?.map(s => s.name).join(", ")}</td>
              <td>
                <button onClick={() => openEdit(c)}
                  style={{ background: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
                  Edit
                </button>
              </td>
              <td>
                <button onClick={() => deleteCandidate(c.id)}
                  style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;