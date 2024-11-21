import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SalonPackage } from '../types/package';
import PackageCard from '../components/packages/PackageCard';
import AddPackageModal from '../components/packages/AddPackageModal';
import SearchInput from '../components/common/SearchInput';
import { useSearch } from '../hooks/useSearch';

const PackagesPage = () => {
  // ... existing state ...

  const { query, setQuery, filteredItems: filteredPackages } = useSearch(
    packages,
    ['name', 'description']
  );

  // ... rest of your existing code ...

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* ... existing header ... */}

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search packages..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredPackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onDelete={handleDeletePackage}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      </div>

      {/* ... existing modals ... */}
    </div>
  );
};

export default PackagesPage;