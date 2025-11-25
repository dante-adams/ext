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
        <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Управление Партиями</h2>
                <div className="flex gap-2">
                    {!isAdding ? (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="btn btn-primary flex gap-2 items-center"
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
                                className="w-40"
                                autoFocus
                            />
                            <button onClick={handleAdd} className="btn btn-primary">Добавить</button>
                            <button onClick={() => setIsAdding(false)} className="btn bg-slate-600 text-white">Отмена</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <label className="text-slate-400">Текущая партия:</label>
                <div className="relative flex-1 max-w-md">
                    <select
                        value={currentBatchId || ''}
                        onChange={(e) => onSelectBatch(e.target.value)}
                        className="w-full appearance-none cursor-pointer"
                    >
                        <option value="" disabled>Выберите партию...</option>
                        {batches.map(batch => (
                            <option key={batch.id} value={batch.id}>
                                {batch.name} - {new Date(batch.createdAt).toLocaleDateString()}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>

                {currentBatchId && (
                    <button
                        onClick={() => onDeleteBatch(currentBatchId)}
                        className="btn btn-danger flex gap-2 items-center ml-auto"
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
