import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

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
        <div className="batch-panel-new">
            <div className="batch-panel-header">
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn btn-primary"
                >
                    <Plus size={18} /> Новая Партия
                </button>
            </div>

            {isAdding && (
                <div className="batch-add-modal">
                    <div className="batch-add-content">
                        <h3>Создать новую партию</h3>
                        <input
                            type="text"
                            value={newBatchName}
                            onChange={(e) => setNewBatchName(e.target.value)}
                            placeholder="Название партии"
                            autoFocus
                        />
                        <div className="batch-add-actions">
                            <button onClick={handleAdd} className="btn btn-primary">Создать</button>
                            <button onClick={() => setIsAdding(false)} className="btn btn-secondary">Отмена</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="batch-grid">
                {batches.map(batch => (
                    <div
                        key={batch.id}
                        className={`batch-card ${currentBatchId === batch.id ? 'batch-card-active' : ''}`}
                        onClick={() => onSelectBatch(batch.id)}
                    >
                        <div className="batch-card-header">
                            <h4>{batch.name}</h4>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteBatch(batch.id);
                                }}
                                className="batch-delete-btn"
                                title="Удалить партию"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="batch-card-date">
                            {new Date(batch.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPanel;
