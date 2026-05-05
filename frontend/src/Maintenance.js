import React, { useEffect, useState } from "react";
import Header from "./Header";
import { fetchMaintenanceTasks, updateMaintenanceTask } from "./api";

function Maintenance() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = () => {
    fetchMaintenanceTasks()
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    updateMaintenanceTask(id, newStatus)
      .then(res => {
        if (res.success) {
          loadTasks();
        }
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-zinc-300 font-display flex flex-col relative">
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <Header />
      
      <div className="max-w-7xl mx-auto w-full px-6 py-8 relative z-10 flex-grow flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest mb-2">Operations Panel</h1>
          <p className="text-zinc-400 font-medium">Track, schedule, and manage maintenance tasks across the city.</p>
        </div>

        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin w-12 h-12 border-4 border-white/10 border-t-yellow-400 rounded-full"></div>
          </div>
        ) : (
          <div className="bg-[#0F172A]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-lg p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 pb-4 border-b border-white/10">Maintenance Task List</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-zinc-500 uppercase tracking-widest border-b border-white/5">
                    <th className="pb-3 px-4 font-bold">ID / Location</th>
                    <th className="pb-3 px-4 font-bold">Type</th>
                    <th className="pb-3 px-4 font-bold">Risk</th>
                    <th className="pb-3 px-4 font-bold">Status</th>
                    <th className="pb-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tasks.map((task) => (
                    <tr 
                      key={task.id} 
                      className={`transition-colors ${task.risk === 'High' ? 'bg-red-500/5 hover:bg-red-500/10' : 'hover:bg-white/5'}`}
                    >
                      <td className="py-4 px-4">
                        <div className="font-bold text-white">{task.id}</div>
                        <div className="text-xs text-zinc-500">{task.location}</div>
                      </td>
                      <td className="py-4 px-4 text-zinc-300 flex items-center gap-2 h-full min-h-[60px]">
                        <span className={`w-2 h-2 rounded-full ${task.type === 'Water' ? 'bg-blue-500' : task.type === 'Electricity' ? 'bg-yellow-400' : 'bg-purple-500'}`}></span>
                        {task.type}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${task.risk === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : task.risk === 'Medium' ? 'bg-yellow-400/10 text-yellow-500 border-yellow-400/30' : 'bg-green-500/10 text-green-500 border-green-500/30'}`}>
                          {task.risk}
                        </span>
                        <div className="text-[10px] text-zinc-400 mt-1 max-w-[200px] truncate" title={task.action}>{task.action}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${task.status === 'Pending' ? 'text-zinc-400 border-zinc-500/30 bg-zinc-500/10' : task.status === 'In Progress' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-green-400 border-green-500/30 bg-green-500/10'}`}>
                          {task.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        {task.status === 'Pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(task.id, 'In Progress')}
                            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all mr-2"
                          >
                            Schedule
                          </button>
                        )}
                        {task.status === 'In Progress' && (
                          <button 
                            onClick={() => handleUpdateStatus(task.id, 'Completed')}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all mr-2"
                          >
                            Complete
                          </button>
                        )}
                        {task.status === 'Completed' && (
                          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            Done
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {tasks.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-zinc-500">No maintenance tasks found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Maintenance;
