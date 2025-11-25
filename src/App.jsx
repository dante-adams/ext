
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
    if (window.confirm('Are you sure you want to delete this batch?')) {
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
    <div className="app-container min-h-screen pb-20">
      <header className="main-header mb-8">
        <h1>Extruder Portal</h1>
        <p className="text-slate-400 mt-2">Shift Data Entry & Management</p>
      </header>

      <TopPanel
        batches={batches}
        currentBatchId={currentBatchId}
        onAddBatch={handleAddBatch}
        onDeleteBatch={handleDeleteBatch}
        onSelectBatch={setCurrentBatchId}
      />

      {currentBatch ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
            <SummaryTable batches={batches} />
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
          <h3 className="text-xl text-slate-300 font-medium mb-2">No Batch Selected</h3>
          <p className="text-slate-500">Create a new batch or select an existing one to start entering data.</p>
        </div>
      )}
    </div>
  );
}

export default App;

