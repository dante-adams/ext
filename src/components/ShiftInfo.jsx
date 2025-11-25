import React, { useState } from 'react';
import { Users, UserPlus, X, Plus, Trash2 } from 'lucide-react';

const SHIFT_OPTIONS = ['Смена 1', 'Смена 2', 'Смена 3'];
const EXTRUDER_OPTIONS = ['НТ1', 'НТ2', 'НТ3', 'НТ4'];

const ShiftInfo = ({ shiftData, onUpdate, teamMembers, onAddMember, onRemoveMember }) => {
    const [newMember, setNewMember] = useState('');
    const [availableEmployees, setAvailableEmployees] = useState(() => {
        const saved = localStorage.getItem('available_employees');
        return saved ? JSON.parse(saved) : ['Иванов И.И.', 'Петров П.П.', 'Сидоров С.С.'];
    });
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);
    const [newEmployeeName, setNewEmployeeName] = useState('');

    const handleAddMember = (e) => {
        e.preventDefault();
        if (newMember.trim() && !teamMembers.includes(newMember)) {
            onAddMember(newMember);
            setNewMember('');
        }
    };

    const handleAddNewEmployee = () => {
        if (newEmployeeName.trim() && !availableEmployees.includes(newEmployeeName)) {
            const updated = [...availableEmployees, newEmployeeName];
            setAvailableEmployees(updated);
            localStorage.setItem('available_employees', JSON.stringify(updated));
            setNewEmployeeName('');
            setIsAddingEmployee(false);
        }
    };

    const handleRemoveEmployee = (employeeName) => {
        if (window.confirm(`Удалить ${employeeName} из списка сотрудников?`)) {
            const updated = availableEmployees.filter(e => e !== employeeName);
            setAvailableEmployees(updated);
            localStorage.setItem('available_employees', JSON.stringify(updated));
        }
    };

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
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
                    <select
                        value={shiftData.shiftNumber}
                        onChange={(e) => onUpdate('shiftNumber', e.target.value)}
                    >
                        <option value="">Выберите смену...</option>
                        {SHIFT_OPTIONS.map(shift => (
                            <option key={shift} value={shift}>{shift}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-slate-400 mb-1">Экструдер</label>
                    <select
                        value={shiftData.extruder}
                        onChange={(e) => onUpdate('extruder', e.target.value)}
                    >
                        <option value="">Выберите экструдер...</option>
                        {EXTRUDER_OPTIONS.map(ext => (
                            <option key={ext} value={ext}>{ext}</option>
                        ))}
                    </select>
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
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm text-slate-400">Состав Бригады</label>
                    <button
                        onClick={() => setIsAddingEmployee(true)}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        <Plus size={14} /> Управление сотрудниками
                    </button>
                </div>

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
                    <select
                        value={newMember}
                        onChange={(e) => setNewMember(e.target.value)}
                        className="flex-1"
                    >
                        <option value="">Выберите сотрудника...</option>
                        {availableEmployees.filter(emp => !teamMembers.includes(emp)).map(emp => (
                            <option key={emp} value={emp}>{emp}</option>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary px-3">
                        <UserPlus size={18} />
                    </button>
                </form>
            </div>

            {isAddingEmployee && (
                <div className="employee-modal">
                    <div className="employee-modal-content">
                        <h3>Управление сотрудниками</h3>
                        <div className="employee-list">
                            {availableEmployees.map(emp => (
                                <div key={emp} className="employee-item">
                                    <span>{emp}</span>
                                    <button onClick={() => handleRemoveEmployee(emp)} className="employee-delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="employee-add">
                            <input
                                type="text"
                                value={newEmployeeName}
                                onChange={(e) => setNewEmployeeName(e.target.value)}
                                placeholder="Имя нового сотрудника"
                            />
                            <button onClick={handleAddNewEmployee} className="btn btn-primary">Добавить</button>
                        </div>
                        <button onClick={() => setIsAddingEmployee(false)} className="btn btn-secondary mt-3">Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShiftInfo;
