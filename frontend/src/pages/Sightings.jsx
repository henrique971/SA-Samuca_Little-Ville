import { useState, useEffect } from "react";
import api from "../services/api";

export default function Sightings() {
  const [sightings, setSightings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSighting, setEditingSighting] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", lat: "", lng: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSightings();
  }, []);

  async function loadSightings() {
    try {
      const res = await api.get("/sightings");
      setSightings(res.data);
    } catch (error) {
      console.error("Erro ao carregar avistamentos:", error);
    }
  }

  function openCreate() {
    setEditingSighting(null);
    setForm({ title: "", description: "", lat: "", lng: "" });
    setShowModal(true);
  }

  function handleEdit(sighting) {
    setEditingSighting(sighting);
    setForm({
      title: sighting.title,
      description: sighting.description,
      lat: String(sighting.lat),
      lng: String(sighting.lng),
    });
    setShowModal(true);
  }

  async function handleDelete(id) {
    if (!window.confirm("Tem certeza que deseja deletar este avistamento?")) return;
    try {
      await api.delete(`/sightings/${id}`);
      loadSightings();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao deletar");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSighting) {
        await api.put(`/sightings/${editingSighting.id}`, {
          title: form.title,
          description: form.description,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        });
      } else {
        await api.post("/sightings", {
          title: form.title,
          description: form.description,
          lat: parseFloat(form.lat),
          lng: parseFloat(form.lng),
        });
      }
      setShowModal(false);
      setForm({ title: "", description: "", lat: "", lng: "" });
      setEditingSighting(null);
      loadSightings();
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao salvar");
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    setShowModal(false);
    setEditingSighting(null);
    setForm({ title: "", description: "", lat: "", lng: "" });
  }

  return (
    <>
      <div className="page-header">
        <h1>📋 Avistamentos</h1>
        <p>Gerencie todos os registros de avistamentos de Little Ville</p>
      </div>

      <div className="section-header">
        <h2>Lista Completa</h2>
        <button className="btn btn-primary btn-sm" onClick={openCreate}>
          + Novo Avistamento
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descrição</th>
              <th>Lat</th>
              <th>Lng</th>
              <th>Data</th>
              <th>Registrado por</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sightings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: 32, color: "var(--text-muted)" }}>
                  Nenhum avistamento registrado. Clique em "+ Novo Avistamento" para começar! 👣
                </td>
              </tr>
            ) : (
              sightings.map((s) => (
                <tr key={s.id}>
                  <td style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>#{s.id}</td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>{s.title}</td>
                  <td>{s.description.length > 40 ? s.description.substring(0, 40) + "..." : s.description}</td>
                  <td>{s.lat.toFixed(4)}</td>
                  <td>{s.lng.toFixed(4)}</td>
                  <td>{new Date(s.date).toLocaleDateString("pt-BR")}</td>
                  <td>{s.user?.name || "—"}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => handleEdit(s)}>✏️ Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(s.id)}>🗑️ Deletar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingSighting ? "✏️ Editar Avistamento" : "📌 Novo Avistamento"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  placeholder="Ex: Pé Grande avistado na floresta"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <input
                  type="text"
                  placeholder="Descreva o que foi avistado..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="-23.5505"
                    value={form.lat}
                    onChange={(e) => setForm({ ...form, lat: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="-46.6333"
                    value={form.lng}
                    onChange={(e) => setForm({ ...form, lng: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Salvando..." : editingSighting ? "Atualizar" : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
