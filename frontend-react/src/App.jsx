import { useState, useEffect } from 'react';
import { 
  Users, UserPlus, GraduationCap, CalendarDays, 
  Trash2, Search, X, User, Activity 
} from 'lucide-react';
import { studentService } from './services/api';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ total: 0, byYear: [] });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    dateNaissance: ''
  });

  // Fetch data
  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsData, countData, byYearData] = await Promise.all([
        studentService.getAllStudents(),
        studentService.getStudentCount(),
        studentService.getStudentsByYear()
      ]);
      setStudents(studentsData);
      setStats({ total: countData, byYear: byYearData });
    } catch (error) {
      console.error("Error loading data:", error);
      // Fallback for development if API is offline
      if (students.length === 0) {
        console.warn("Using sample data, unable to reach API");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert to Date to format it properly as required by API
      const dateObj = new Date(formData.dateNaissance);
      
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        dateNaissance: dateObj.toISOString() // Formats as 2000-01-01T00:00:00.000Z
      };

      await studentService.saveStudent(payload);
      setIsModalOpen(false);
      setFormData({ nom: '', prenom: '', dateNaissance: '' });
      loadData(); // Refresh list
    } catch (error) {
      console.error("Error saving student:", error);
      alert("Failed to save student. Ensure backend is running and CORS is configured.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      try {
        await studentService.deleteStudent(id);
        loadData(); // Refresh list
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Format Date for Display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    // Handle both Unix timestamp format and ISO strings
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <GraduationCap className="header-icon" />
        <h1>Student Portal Hub</h1>
      </header>

      {/* Dashboard Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={28} />
          </div>
          <div className="stat-info">
            <h3>Total Étudiants</h3>
            <p>{stats.total}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{color: '#10B981', background: 'rgba(16, 185, 129, 0.1)'}}>
            <Activity size={28} />
          </div>
          <div className="stat-info">
            <h3>Statut API</h3>
            <p style={{fontSize: '1rem', marginTop: '0.75rem', color: '#10B981'}}>En ligne</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-header">
          <h2><Users size={20} /> Annuaire des Étudiants</h2>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={18} />
            Ajouter un étudiant
          </button>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="empty-state">Chargement des données...</div>
          ) : students.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Date de Naissance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>#{student.id}</td>
                    <td><strong>{student.nom}</strong></td>
                    <td>{student.prenom}</td>
                    <td>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)'}}>
                        <CalendarDays size={14} />
                        {formatDate(student.dateNaissance)}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(student.id)}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <Search className="empty-icon" size={48} />
              <h3>Aucun étudiant trouvé</h3>
              <p>Commencez par ajouter un nouvel étudiant.</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') setIsModalOpen(false);
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2><User size={20} /> Nouvel Étudiant</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input 
                    type="text" 
                    id="nom"
                    name="nom" 
                    className="form-control"
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Ex: Dupont"
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input 
                    type="text" 
                    id="prenom"
                    name="prenom" 
                    className="form-control"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Ex: Jean"
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dateNaissance">Date de naissance</label>
                  <input 
                    type="date" 
                    id="dateNaissance"
                    name="dateNaissance" 
                    className="form-control"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
