
import React from 'react';
import { ClipboardList } from 'lucide-react';

const SummaryTable = ({ batches }) => {
    return (
        <div className="card">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <ClipboardList size={20} className="text-purple-400" />
                Сводка Производства
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 text-slate-400 text-sm">
                            <th className="py-3 px-2">Дата</th>
                            <th className="py-3 px-2">Смена</th>
                            <th className="py-3 px-2">Партия</th>
                            <th className="py-3 px-2">Экструдер</th>
                            <th className="py-3 px-2">Бригада</th>
                            <th className="py-3 px-2 text-right">Материалы (кг)</th>
                            <th className="py-3 px-2 text-right">Отходы (кг)</th>
                            <th className="py-3 px-2 text-right">Нетто (кг)</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-200">
                        {batches.length > 0 ? (
                            batches.map(batch => {
                                const totalMaterials = batch.materials.reduce((sum, m) => sum + (parseFloat(m.quantity) || 0), 0);
                                const waste = parseFloat(batch.waste) || 0;
                                const netProduction = totalMaterials - waste;

                                return (
                                    <tr key={batch.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <td className="py-3 px-2">{batch.shiftData.date || '-'}</td>
                                        <td className="py-3 px-2">
                                            <span className="font-mono">{batch.shiftData.shiftNumber || '-'}</span>
                                            <span className="text-xs text-slate-500 ml-1">({batch.shiftData.type === 'day' ? 'День' : 'Ночь'})</span>
                                        </td>
                                        <td className="py-3 px-2 font-medium text-blue-300">{batch.name}</td>
                                        <td className="py-3 px-2">{batch.shiftData.extruder || '-'}</td>
                                        <td className="py-3 px-2">
                                            <div className="flex flex-wrap gap-1">
                                                {batch.teamMembers.map((m, i) => (
                                                    <span key={i} className="text-xs bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">{m}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-2 text-right font-mono">{totalMaterials.toFixed(2)}</td>
                                        <td className="py-3 px-2 text-right font-mono text-red-400">{waste.toFixed(2)}</td>
                                        <td className="py-3 px-2 text-right font-mono text-green-400 font-bold">{netProduction.toFixed(2)}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="8" className="py-8 text-center text-slate-500 italic">
                                    Нет данных о производстве.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SummaryTable;
