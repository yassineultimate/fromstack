import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Shield, Star, Users, Calendar, Clock } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Gestion des Clients',
      description: 'Gérez efficacement votre base de données clients et leurs préférences'
    },
    {
      icon: Calendar,
      title: 'Planification Intelligente',
      description: 'Système de réservation avancé avec rappels automatiques'
    },
    {
      icon: Star,
      title: 'Gestion des Services',
      description: 'Organisez et optimisez vos offres de services'
    },
    {
      icon: Clock,
      title: 'Mises à jour en temps réel',
      description: 'Restez informé grâce aux notifications et alertes instantanées'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute top-4 right-4">
        <div className="bg-white/10 backdrop-blur-sm dark:bg-gray-800/50 rounded-lg p-1 shadow-lg">
        </div>
      </div>
      
      {/* Section Héro */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 pt-8 sm:pb-16 sm:pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                    <Scissors className="h-12 w-12 text-primary-600 dark:text-primary-500" />
                  </div>
                </div>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block"> Coupe & Chic Gestion de Salon</span>
                  <span className="block text-primary-600 dark:text-primary-500">En toute simplicité</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Simplifiez la gestion de votre salon avec notre plateforme complète. 
                  Prenez des rendez-vous, gérez votre personnel et développez votre activité sans effort.
                </p>

                <div className="mt-10 flex justify-center gap-x-6">
                  <button
                    onClick={() => navigate('/admin/login')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 transition-colors"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Connexion Admin
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 dark:text-primary-500 bg-primary-100 dark:bg-primary-900/30 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    <Scissors className="h-5 w-5 mr-2" />
                    Connexion Manager
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Section Fonctionnalités */}
      <div className="bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Tout ce dont vous avez besoin pour gérer votre salon
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
              Des outils puissants pour vous aider à développer votre activité et ravir vos clients
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 dark:bg-gray-700 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-600 dark:bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-500 dark:text-gray-400">
            © 2025 Coupe & Chic Gestion de Salon. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;