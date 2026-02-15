import React, { useEffect, useState } from 'react';
import Card from '../components/EventCard';
import { Trash2, Edit, Plus, X } from 'lucide-react'; // Make sure to install lucide-react if needed

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [form, setForm] = useState({
    title: "",
    date: "",
    image: "",
    description: ""
  });

  const API_URL = "http://localhost:5050/projects";

  // 1. FETCH EVENTS
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const response = await fetch(API_URL);
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
  };

  // 2. HANDLE FORM INPUT
  const updateForm = (value) => {
    return setForm((prev) => ({ ...prev, ...value }));
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      date: project.date,
      image: project.image || "",
      description: project.description
    });
    setEditingId(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. SUBMIT (CREATE or UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing
      await fetch(`${API_URL}/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // Create new
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    // Reset
    setForm({ title: "", date: "", image: "", description: "" });
    setEditingId(null);
    setShowForm(false);
    fetchProjects();
  };

  // 4. DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchProjects();
    }
  };

  return (
    <div>
      <h1 className='text-center py-5 text-4xl font-bold text-primary'>Projects</h1>
      
      {/* --- ADMIN ADD BUTTON --- */}
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title: "", date: "", image: "", description: "" })}}
          className="btn-primary"
        >
          {<><Plus size={18} className='mr-1.5'/> Add Project</>}
        </button>
      </div>

      {/* --- INPUT FORM (Conditional) --- */}
      {showForm && (
        // 1. THE BACKDROP (Controls position & centering)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          
          {/* 2. THE CARD (Controls look & feel) */}
          <div className="w-full max-w-2xl p-6 bg-tertiary rounded-2xl border border-secondary/50 relative shadow-xl">
            
            <h2 className="text-primary text-xl mb-4 font-bold">
              {editingId ? "Edit Project" : "New Project"}
            </h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
              <input 
                type="text" placeholder="Project Title" required 
                className="placeholder:text-secondary p-3 rounded-lg bg-black/30 border border-primary/10 text-primary focus:border-accent outline-none"
                value={form.title} onChange={(e) => updateForm({ title: e.target.value })}
              />
              <input 
                type="text" placeholder='Start Date - End Date' required 
                className="placeholder:text-secondary p-3 rounded-lg bg-black/30 border border-primary/10 text-primary focus:border-accent outline-none custom-date"
                value={form.date} onChange={(e) => updateForm({ date: e.target.value })}
              />
              <input 
                type="text" placeholder="Image URL (optional)" 
                className="placeholder:text-secondary p-3 rounded-lg bg-black/30 border border-primary/10 text-primary focus:border-accent outline-none"
                value={form.image} onChange={(e) => updateForm({ image: e.target.value })}
              />
              <textarea 
                placeholder="Description" required rows="3"
                className="placeholder:text-secondary p-3 rounded-lg bg-black/30 border border-primary/10 text-primary resize-none focus:border-accent outline-none"
                value={form.description} onChange={(e) => updateForm({ description: e.target.value })}
              />
              {/* Added a cancel button for better UX since it's a modal */}
              <div className="flex gap-3 justify-end">
                  <button 
                      type="button" 
                      onClick={() => setShowForm(false)}
                      className="px-4 text-secondary hover:text-white transition-colors"
                  >
                      Cancel
                  </button>
                  <button type="submit" className="btn-primary rounded m-0">
                    {editingId ? "Save Changes" : "Create Project"}
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- EVENTS LIST --- */}
      <div className='flex flex-col max-w-5xl mx-auto gap-6 px-4 pb-20'>
        {projects.map((project, index) => (
          <div key={project._id || index} className="relative group/wrapper">
            
            {/* The Actual Card Component */}
            <Card 
              title={project.title} 
              date={project.date} 
              image={project.image}
              index={index}
            > 
              <p>{project.description}</p> 
            </Card>

            {/* Admin Controls (Appears on Hover) */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/wrapper:opacity-100 transition-opacity duration-300 z-20">
              <button 
                onClick={() => handleEdit(project)}
                className="p-2 hover:text-accent text-secondary rounded-full shadow-lg"
                title="Edit"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => handleDelete(project._id)}
                className="p-2 hover:text-red-500 text-secondary rounded-full shadow-lg"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>

          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center text-secondary/50 py-10">
            No projects found. Click "Add Project" to create one.
          </div>
        )}
      </div>
      
    </div>
  );
}

export default Projects