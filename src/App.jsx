
import React, { useState, useEffect } from 'react';
import TopPanel from './components/TopPanel';
import ShiftInfo from './components/ShiftInfo';
import MaterialsPanel from './components/MaterialsPanel';
import SummaryTable from './components/SummaryTable';

const INITIAL_BATCH_STATE = {
  id: null,
  name: '',
  createdAt: null,
  shiftData: {
    date: new Date().toISOString().split('T')[0],
    shiftNumber: '',
    extruder: '',
    type: 'day'
  },
  teamMembers: [],
  materials: [],
  waste: 0
};

function App() {
  // Load from local storage or start empty
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('extruder_batches');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentBatchId, setCurrentBatchId] = useState(null);

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('extruder_batches', JSON.stringify(batches));
  }, [batches]);

  // Select the last batch by default if none selected and batches exist
  useEffect(() => {
    if (!currentBatchId && batches.length > 0) {
      setCurrentBatchId(batches[batches.length - 1].id);
    }
  }, [batches, currentBatchId]);

  const currentBatch = batches.find(b => b.id === currentBatchId) || null;

  const handleAddBatch = (name) => {
    const newBatch = {
      ...INITIAL_BATCH_STATE,
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      // Copy some defaults from previous batch if exists for convenience
      shiftData: batches.length > 0
        ? { ...batches[batches.length - 1].shiftData }
        : { ...INITIAL_BATCH_STATE.shiftData }
    };
    setBatches([...batches, newBatch]);
    setCurrentBatchId(newBatch.id);
  };

  const handleDeleteBatch = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту партию?')) {
      const newBatches = batches.filter(b => b.id !== id);
      setBatches(newBatches);
      if (currentBatchId === id) {
        setCurrentBatchId(newBatches.length > 0 ? newBatches[newBatches.length - 1].id : null);
      }
    }
  };

  const updateCurrentBatch = (updater) => {
    if (!currentBatchId) return;
    setBatches(batches.map(b => {
      if (b.id === currentBatchId) {
        return updater(b);
      }
      return b;
    }));
  };

  // Shift Info Handlers
  const handleUpdateShift = (field, value) => {
    updateCurrentBatch(b => ({
      ...b,
      shiftData: { ...b.shiftData, [field]: value }
    }));
  };

  const handleAddTeamMember = (name) => {
    updateCurrentBatch(b => ({
      ...b,
      teamMembers: [...b.teamMembers, name]
    }));
  };

  const handleRemoveTeamMember = (index) => {
    updateCurrentBatch(b => ({
      ...b,
      teamMembers: b.teamMembers.filter((_, i) => i !== index)
    }));
  };

  // Materials Handlers
  const handleAddMaterial = () => {
    updateCurrentBatch(b => ({
      ...b,
      materials: [...b.materials, { name: '', quantity: 0 }]
    }));
  };

  const handleUpdateMaterial = (index, field, value) => {
    updateCurrentBatch(b => {
      const newMaterials = [...b.materials];
      newMaterials[index] = { ...newMaterials[index], [field]: value };
      return { ...b, materials: newMaterials };
    });
  };

  const handleRemoveMaterial = (index) => {
    updateCurrentBatch(b => ({
      ...b,
      materials: b.materials.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateWaste = (value) => {
    updateCurrentBatch(b => ({
      ...b,
      waste: value
    }));
  };

  return (
    <div className="app-container">
      <header className="sticky-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Портал Экструдера</h1>
            <p>Ввод и управление данными смены</p>
          </div>
          <TopPanel
            batches={batches}
            currentBatchId={currentBatchId}
            onAddBatch={handleAddBatch}
            onDeleteBatch={handleDeleteBatch}
            onSelectBatch={setCurrentBatchId}
          />
        </div>
      </header>

      <main className="main-content">
        {currentBatch ? (
          <div className="content-grid">
            <div className="space-y-6">
              <ShiftInfo
                shiftData={currentBatch.shiftData}
                onUpdate={handleUpdateShift}
                teamMembers={currentBatch.teamMembers}
                onAddMember={handleAddTeamMember}
                onRemoveMember={handleRemoveTeamMember}
              />
              <MaterialsPanel
                materials={currentBatch.materials}
                onUpdateMaterial={handleUpdateMaterial}
                onAddMaterial={handleAddMaterial}
                onRemoveMaterial={handleRemoveMaterial}
                waste={currentBatch.waste}
                onUpdateWaste={handleUpdateWaste}
              />
            </div>

            <div>
              <SummaryTable batch={currentBatch} />
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Партия не выбрана</h3>
            <p>Создайте новую партию или выберите существующую для ввода данных.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

