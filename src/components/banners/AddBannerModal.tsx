import React, { useState, useEffect } from 'react';
import { Banner } from '../../types/banner';
import { getsalonsadmin } from './../../../Service/SalonService';

interface AddBannerModalProps {
  onClose: () => void;
  onAdd: (banner: Omit<Banner, 'id'>) => void;
}

interface Salon {
  id: string;
  name: string;
}

const AddBannerModal = ({ onClose, onAdd }: AddBannerModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    discount: '',
    discountName: '',
    startDate: '',
    endDate: '',
    salonId: '',
  });

  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSalons = async () => {
      setLoading(true);
      try {
        const response = await getsalonsadmin();
        setSalons(response.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
      setLoading(false);
    };
    fetchSalons();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      Title: formData.title,
      Subtitle: formData.subtitle,
      discount: formData.discount,
      discountName: formData.discountName,
      DateDebut: formData.startDate,
      DateFin: formData.endDate,
      salonId: formData.salonId,
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Banner</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                type="text"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                min="0"
                max="100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
              <input
                type="text"
                name="discountName"
                value={formData.discountName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Salon
            </label>
            <select
              name="salonId"
              value={formData.salonId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select a salon</option>
              {salons.map(salon => (
                <option key={salon.id} value={salon.id}>
                  {salon.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerModal;