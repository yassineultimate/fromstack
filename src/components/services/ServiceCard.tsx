import React from 'react';
import { Trash2, Clock, DollarSign, ToggleLeft, ToggleRight } from 'lucide-react';
import { Service } from '../../types/service';

interface ServiceCardProps {
  service: Service;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

const ServiceCard = ({ service, onDelete, onToggleActive }: ServiceCardProps) => {
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
            {service.category && (
              <span className="text-sm text-gray-500">{service.category}</span>
            )}
          </div>
          <button
            onClick={() => onToggleActive(service.id)}
            className={`p-1 rounded-lg ${
              service.isActive 
                ? 'text-green-600 hover:text-green-700' 
                : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            {service.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
          </button>
        </div>

        {service.description && (
          <p className="mt-2 text-sm text-gray-600">{service.description}</p>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign size={16} className="mr-2" />
            ${service.price}
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