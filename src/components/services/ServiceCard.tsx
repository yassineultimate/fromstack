import React from 'react';
import { Trash2, Clock, DollarSign, ToggleLeft, ToggleRight ,Wallet2Icon} from 'lucide-react';
import { Service } from '../../types/service';

interface ServiceCardProps {
  service: Service;
  onDelete: (id: string) => void;
  
}

const ServiceCard = ({ service, onDelete }: ServiceCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
            
          </div>
          
        </div>

      

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Wallet2Icon size={16} className="mr-2" />
            {service.price} dinars
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            {service.duration} minutes
          </div>
        </div>

        <div className="mt-4 flex justify-end pt-4 border-t">
          <button 
            onClick={() => onDelete(service.id)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;