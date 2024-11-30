import React, { useState, useEffect } from 'react';
import { Salon, SalonManager, Category } from '../../types/salon';
import { addSalonadmin } from '../../../Service/SalonService';
import { getallCategorie } from '../../../Service/categoriesService';

interface AddSalonModalProps {
  onClose: () => void;
  onAdd: (salon: Omit<Salon, 'id'>) => void;
}

interface FormData {
  name: string;
  address: string;
  manager: string;
  email: string;
  phone: string;
  managers: SalonManager[];
  status: 'active';
  categoryId: string;
}

interface FormErrors {
  name: string;
  address: string;
  email: string;
  phone: string;
  categoryId: string;
}

const AddSalonModal = ({ onClose, onAdd }: AddSalonModalProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    manager: '',
    email: '',
    phone: '',
    managers: [],
    status: 'active',
    categoryId: ''
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    address: '',
    email: '',
    phone: '',
    categoryId: ''
  });

  type ValidatedFields = keyof FormErrors;

  const validations = {
    name: (value: string) => 
      value.trim().length < 2 ? 'Le nom du salon doit contenir au moins 2 caractères' : '',
    
    address: (value: string) => 
      value.trim().length < 5 ? 'Veuillez fournir une adresse complète' : '',
    
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value) ? 'Veuillez entrer une adresse email valide' : '';
    },
    
    phone: (value: string) => {
      const phoneRegex = /^\d{8}$/;
      return !phoneRegex.test(value) ? 'Veuillez entrer un numéro de téléphone valide (8 chiffres)' : '';
    },

    categoryId: (value: string) => 
      !value ? 'Veuillez sélectionner une catégorie' : ''
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError('');
      
      try {
        const response = await getallCategorie();
        // Vérifier que response.data existe et est un tableau
        const categoriesData = Array.isArray(response) ? response : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        setError('Impossible de charger les catégories. Veuillez réessayer plus tard.');
        setCategories([]); // Réinitialiser les catégories en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const validateField = (name: ValidatedFields, value: string) => {
    const validator = validations[name];
    return validator ? validator(value) : '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name in validations) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as ValidatedFields, value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = (Object.keys(validations) as ValidatedFields[]).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(key, formData[key])
      }),
      {} as FormErrors
    );

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await addSalonadmin(formData);
      onAdd(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du salon:', error);
      setError('Une erreur est survenue lors de l\'ajout du salon. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    name: ValidatedFields,
    label: string,
    type: string = 'text'
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
          errors[name] ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
        }`}
        required
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau salon</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderField('name', 'Nom du salon')}
          {renderField('address', 'Adresse')}
          {renderField('email', 'Email', 'email')}
          {renderField('phone', 'Téléphone', 'tel')}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sélectionner une catégorie
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                errors.categoryId ? 'border-red-500 focus:ring-red-500' : 'focus:ring-primary-500'
              }`}
              required
              disabled={loading}
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Chargement...' : 'Ajouter le salon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalonModal;