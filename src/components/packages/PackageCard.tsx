import React from 'react';
import { Trash2, Clock, DollarSign, ToggleLeft, ToggleRight, Percent,Wallet2Icon } from 'lucide-react';
import { SalonPackage } from '../../types/package';

interface PackageCardProps {
  package: SalonPackage;
  onDelete: (id: string) => void;
 
}

const PackageCard = ({ package: pkg, onDelete }: PackageCardProps) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
      <img
        src={pkg.image}
        alt={pkg.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
           
          </div>
           
        </div>

        {pkg.description && (
          <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>
        )}

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Wallet2Icon size={16} className="mr-2" />
             {pkg.price} dinars
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            {pkg.duration} minutes
          </div>
        </div>

        <div className="mt-4 flex justify-end pt-4 border-t">
          <button 
            onClick={() => onDelete(pkg.id)}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;