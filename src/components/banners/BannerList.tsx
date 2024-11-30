import React from 'react';
import { Calendar, Percent, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Banner } from '../../types/banner';

interface BannerListProps {
  banners: Banner[];
  onDelete: (id: string) => void;
 
}

const BannerList = ({ banners, onDelete }: BannerListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="bg-white border rounded-lg overflow-hidden shadow-sm"
        >
          <div className="flex">
            
              <div className="w-48">
                <img
                  src={banner.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                  alt={banner.Title}
                  className="w-full h-full object-cover"
                />
              </div>
          
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{banner.Title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{banner.Subtitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                   
                  <button
                    onClick={() => onDelete(banner.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Percent size={16} className="mr-2" />
                  {banner.discount}  off - {banner.discountName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {new Date(banner.DateDebut).toLocaleDateString()} - {new Date(banner.DateFin).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerList;