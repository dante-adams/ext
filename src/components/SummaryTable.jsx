import React from 'react';
import { ClipboardList } from 'lucide-react';

const SummaryTable = ({ batch }) => {
    if (!batch) {
        return (
            <div className="card">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ClipboardList size={20} className="text-purple-400" />
                    Сводка Партии
                </h2>
                <div className="text-center py-8 text-slate-500 italic">
                    Выберите партию для просмотра сводки.
                </div>
            </div>
        );
    }

    const totalMaterials = batch.materials.reduce((sum, m) => sum + (parseFloat(m.quantity) || 0), 0);
    const waste = parseFloat(batch.waste) || 0;
    const netProduction = totalMaterials - waste;
    const wastePercentage = totalMaterials > 0 ? (waste / totalMaterials * 100) : 0;

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ClipboardList size={20} className="text-purple-400" />
                Сводка Партии: {batch.name}
            </h2>

            <div className="summary-stats">
                <div className="summary-stat">
                    <div className="summary-stat-label">Дата</div>
                    <div className="summary-stat-value">{batch.shiftData.date || '-'}</div>
                </div>

                <div className="summary-stat">
                    <div className="summary-stat-label">Смена</div>
                    <div className="summary-stat-value">
                        {batch.shiftData.shiftNumber || '-'}
                        <span className="text-xs text-slate-500 ml-1">
                            ({batch.shiftData.type === 'day' ? 'День' : 'Ночь'})
                        </span>
                    </div>
                </div>

                <div className="summary-stat">
                    <div className="summary-stat-label">Экструдер</div>
                    <div className="summary-stat-value">{batch.shiftData.extruder || '-'}</div>
                </div>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-stats">
                <div className="summary-stat">
                    <div className="summary-stat-label">Всего материалов</div>
                    <div className="summary-stat-value summary-stat-large">{totalMaterials.toFixed(2)} кг</div>
                </div>

                <div className="summary-stat">
                    <div className="summary-stat-label">Отходы</div>
                    <div className="summary-stat-value summary-stat-large text-red-400">
                        {waste.toFixed(2)} кг
                        <span className="text-sm text-orange-400 ml-2">({wastePercentage.toFixed(1)}%)</span>
                    </div>
                </div>

                <div className="summary-stat">
                    <div className="summary-stat-label">Нетто производство</div>
                    <div className="summary-stat-value summary-stat-large text-green-400 font-bold">
                        {netProduction.toFixed(2)} кг
                    </div>
                </div>
            </div>

            {batch.teamMembers.length > 0 && (
                <>
                    <div className="summary-divider"></div>
                    <div>
                        <div className="summary-stat-label mb-2">Бригада</div>
                        <div className="flex flex-wrap gap-2">
                            {batch.teamMembers.map((member, i) => (
                                <span key={i} className="text-sm bg-slate-700 px-3 py-1 rounded-full text-slate-300">
                                    {member}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SummaryTable;
