import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

const TopPanel = ({ batches, currentBatchId, onAddBatch, onDeleteBatch, onSelectBatch }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newBatchName, setNewBatchName] = useState('');

    const handleAdd = () => {
        if (newBatchName.trim()) {
            onAddBatch(newBatchName);
            setNewBatchName('');
            setIsAdding(false);
        }
    };

    return (
        <div className="batch-panel">
            <div className="batch-controls">
                {!isAdding ? (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn btn-primary"
                    >
                        <Plus size={18} /> Новая Партия
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newBatchName}
                            onChange={(e) => setNewBatchName(e.target.value)}
                            placeholder="Название партии"
                            className="batch-input"
                            autoFocus
                        />
                        <button onClick={handleAdd} className="btn btn-primary">Добавить</button>
                        <button onClick={() => setIsAdding(false)} className="btn btn-secondary">Отмена</button>
                    </div>
                )}
            </div>

            <div className="batch-selector">
                <label>Текущая партия:</label>
                <div className="select-wrapper">
                    <select
                        value={currentBatchId || ''}
                        onChange={(e) => onSelectBatch(e.target.value)}
                    >
                        <option value="" disabled>Выберите партию...</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {batch.name} - {new Date(batch.createdAt).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="select-icon" size={18} />
                </div>

                {currentBatchId && (
                    <button
                        onClick={() => onDeleteBatch(currentBatchId)}
                        className="btn btn-danger"
                        title="Удалить текущую партию"
                    >
                        <Trash2 size={18} /> Удалить
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopPanel;
