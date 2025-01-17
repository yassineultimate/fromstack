import React from 'react'; 
import { Mail, Phone, Trash2, UserPlus } from 'lucide-react'; 
import { SalonManager } from '../../../types/salon';  

interface SalonManagersListProps {   
  managers: SalonManager[];   
  onAddManager: () => void;   
  onRemoveManager: (managerId: string) => void; 
}  

const SalonManagersList = ({ managers, onAddManager, onRemoveManager }: SalonManagersListProps) => {   
  // Render empty state if no managers
  if (!managers || managers.length === 0) {
    return (
      <div className="mt-4 text-center">
        <p className="text-gray-500 mb-4">No managers added yet</p>
        <button
          onClick={onAddManager}
          className="flex items-center mx-auto space-x-2 text-sm text-primary-600 hover:text-primary-700"
        >
          <UserPlus size={16} />
          <span>Add First Manager</span>
        </button>
      </div>
    );
  }

  return (     
    <div className="mt-4">       
      <div className="flex items-center justify-between mb-4">         
        <h3 className="text-lg font-medium text-gray-900">Salon Managers</h3>         
        <button           
          onClick={onAddManager}           
          className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"         
        >           
          <UserPlus size={16} />           
          <span>Add Manager</span>         
        </button>       
      </div>       
      <div className="space-y-3">         
        {managers.map((manager) => (           
          <div             
            key={manager.id}             
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"           
          >             
            <div className="flex-1">                             
              <div className="mt-1 text-sm text-gray-500 space-y-1">                 
                <div className="flex items-center">                   
                  <Mail size={14} className="mr-2 text-gray-400" />                   
                  {manager.email || 'No email provided'}                 
                </div>                 
                <div className="flex items-center">                   
                  <Phone size={14} className="mr-2 text-gray-400" />                   
                  {manager.phone || 'No phone number'}                 
                </div>               
              </div>             
            </div>             
            <button               
              onClick={() => onRemoveManager(manager.id)}               
              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"             
            >               
              <Trash2 size={18} />             
            </button>           
          </div>         
        ))}       
      </div>     
    </div>   
  ); 
};  

export default SalonManagersList;