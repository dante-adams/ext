import React, { useState } from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';
import NumericKeyboard from './NumericKeyboard';

const MaterialsPanel = ({ materials, onUpdateMaterial, onAddMaterial, onRemoveMaterial, waste, onUpdateWaste }) => {
    const [activeInput, setActiveInput] = useState(null);
    const [keyboardValue, setKeyboardValue] = useState('');

    const handleOpenKeyboard = (index, type, currentValue) => {
        setActiveInput({ index, type });
        setKeyboardValue(currentValue.toString());
    };

    const handleKeyboardInput = (value) => {
        if (activeInput.type === 'material') {
            onUpdateMaterial(activeInput.index, 'quantity', parseFloat(value) || 0);
        } else if (activeInput.type === 'waste') {
            onUpdateWaste(parseFloat(value) || 0);
        }
    };

    const handleCloseKeyboard = () => {
        setActiveInput(null);
        setKeyboardValue('');
    };

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-400" />
                Материалы и Отходы
            </h2>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                    <label className="text-sm text-slate-400">Состав Сырья</label>
                    <button
                        onClick={onAddMaterial}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        <Plus size={14} /> Добавить Материал
                    </button>
                </div>

                <div className="space-y-3">
                    {materials.map((mat, index) => (
                        <div key={index} className="material-row">
                            <input
                                type="text"
                                value={mat.name}
                                onChange={(e) => onUpdateMaterial(index, 'name', e.target.value)}
                                placeholder="Название материала"
                                className="material-name-input"
                            />
                            <div className="material-quantity-group">
                                <input
                                    type="text"
                                    inputMode="none"
                                    value={mat.quantity || ''}
                                    onFocus={() => handleOpenKeyboard(index, 'material', mat.quantity || 0)}
                                    placeholder="Кол-во"
                                    className="material-quantity-input"
                                    readOnly
                                />
                                <span className="quantity-unit">кг</span>
                            </div>
                            <button
                                onClick={() => onRemoveMaterial(index)}
                                className="material-delete-btn"
                                title="Удалить материал"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {materials.length === 0 && (
                        <div className="empty-materials">
                            Материалы еще не добавлены.
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
                <label className="block text-sm text-slate-400 mb-2">Всего Отходов</label>
                <div className="waste-input-group">
                    <input
                        type="text"
                        inputMode="none"
                        value={waste || ''}
                        onFocus={() => handleOpenKeyboard(null, 'waste', waste || 0)}
                        placeholder="0.00"
                        className="waste-input"
                        readOnly
                    />
                    <span className="waste-unit">кг</span>
                </div>
            </div>

            {activeInput && (
                <div className="keyboard-overlay">
                    <div className="keyboard-backdrop" onClick={handleCloseKeyboard} />
                    <div className="keyboard-container">
                        <NumericKeyboard
                            value={keyboardValue}
                            onChange={setKeyboardValue}
                            onInput={handleKeyboardInput}
                            onClose={handleCloseKeyboard}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MaterialsPanel;
