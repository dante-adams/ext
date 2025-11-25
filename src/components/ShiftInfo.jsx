import React from 'react';
import { Users, UserPlus, X } from 'lucide-react';

const ShiftInfo = ({ shiftData, onUpdate, teamMembers, onAddMember, onRemoveMember }) => {
    const [newMember, setNewMember] = React.useState('');

    const handleAddMember = (e) => {
        e.preventDefault();
        if (newMember.trim()) {
            onAddMember(newMember);
            setNewMember('');
        }
    };

    return (
        <div className="card mb-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-400" />
                Информация о Смене
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block text-sm text-slate-400 mb-1">Дата</label>
                    <input
                        type="date"
                        value={shiftData.date}
                        onChange={(e) => onUpdate('date', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1">Номер Смены</label>
                    <input
                        type="text"
                        value={shiftData.shiftNumber}
                        onChange={(e) => onUpdate('shiftNumber', e.target.value)}
                        placeholder="напр. 1, 2, A, B"
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1">Экструдер</label>
                    <input
                        type="text"
                        value={shiftData.extruder}
                        onChange={(e) => onUpdate('extruder', e.target.value)}
                        placeholder="ID Машины"
                    />
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1">Тип Смены</label>
                    <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
                        <button
                            className={`flex-1 py-1 px-3 rounded-md text-sm transition-colors ${shiftData.type === 'day' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            onClick={() => onUpdate('type', 'day')}
                        >
                            День
                        </button>
                        <button
                            className={`flex-1 py-1 px-3 rounded-md text-sm transition-colors ${shiftData.type === 'night' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                }`}
                            onClick={() => onUpdate('type', 'night')}
                        >
                            Ночь
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
                <label className="block text-sm text-slate-400 mb-2">Состав Бригады</label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {teamMembers.map((member, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm border border-slate-600">
                            {member}
                            <button
                                onClick={() => onRemoveMember(index)}
                                className="hover:text-red-400 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                </div>

                <form onSubmit={handleAddMember} className="flex gap-2">
                    <input
                        type="text"
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        placeholder="Имя сотрудника..."
                        className="flex-1"
                    />
                    <button type="submit" className="btn btn-primary px-3">
                        <UserPlus size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShiftInfo;
