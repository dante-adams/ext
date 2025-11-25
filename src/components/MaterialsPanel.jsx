import React from 'react';
import { Package, Plus, Trash2 } from 'lucide-react';

const MaterialsPanel = ({ materials, onUpdateMaterial, onAddMaterial, onRemoveMaterial, waste, onUpdateWaste }) => {
    return (
        <div className="card mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-400" />
                Materials & Waste
            </h2>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-sm text-slate-400">Raw Materials Composition</label>
                    <button
                        onClick={onAddMaterial}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        <Plus size={14} /> Add Material
                    </button>
                </div>

                <div className="space-y-2">
                    {materials.map((mat, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={mat.name}
                                onChange={(e) => onUpdateMaterial(index, 'name', e.target.value)}
                                placeholder="Material Name"
                                className="flex-[2]"
                            />
                            <input
                                type="number"
                                value={mat.quantity}
                                onChange={(e) => onUpdateMaterial(index, 'quantity', parseFloat(e.target.value) || 0)}
                                placeholder="Qty (kg)"
                                className="flex-1"
                            />
                            <button
                                onClick={() => onRemoveMaterial(index)}
                                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                                title="Remove material"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {materials.length === 0 && (
                        <div className="text-center py-4 text-slate-500 border border-dashed border-slate-700 rounded-lg">
                            No materials added yet.
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
                <label className="block text-sm text-slate-400 mb-1">Total Waste (kg)</label>
                <input
                    type="number"
                    value={waste}
                    onChange={(e) => onUpdateWaste(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="text-lg font-mono"
                />
            </div>
        </div>
    );
};

export default MaterialsPanel;
