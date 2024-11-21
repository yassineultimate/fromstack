import React from 'react';
import { Calendar, Percent, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Banner } from '../../types/banner';

interface BannerListProps {
  banners: Banner[];
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
}

const BannerList = ({ banners, onDelete, onToggleActive }: BannerListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="bg-white border rounded-lg overflow-hidden shadow-sm"
        >
          <div className="flex">
            {banner.image && (
              <div className="w-48">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{banner.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{banner.subtitle}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleActive(banner.id)}
                    className={`p-1 rounded-lg ${
                      banner.isActive 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    {banner.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                  </button>
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
                  {banner.discount}% off - {banner.discountName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
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