import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components';
import Navbar from '../components/organism/Navbar';
import Footer from '../components/organism/Footer';
import SubscriptionPlanCard from '../components/molecules/SubscriptionPlanCard';
import subscriptionPlans from '../data/subscriptionPlans';
import useAuthStore from '../store/authStore';

function FeatureCard({ icon, title}) {
  return (
    <div className="p-6 text-left hover:transform hover:scale-105 transition">
      <div className="flex items-center gap-3 mb-3">
        <Icon name={icon} className="w-8 h-8" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}

function PremiumPage() {
  const navigate = useNavigate();
  const [selectedPlanId, setSelectedPlanId] = useState('individual');
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubscribe = async () => {
    setIsSubmitting(true);
    const success = await useAuthStore.getState().updateProfile({ isPremium: true });
    setIsSubmitting(false);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-chill-dark text-white flex flex-col">
      <Navbar />
    
    <section className="container-responsive pt-12 md:pt-45 pb-12 md:pb-16">
        <div className="max-w-180 mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Kenapa Harus Berlangganan?
            </h2>
            <p className="text-base md:text-lg text-white/60 mb-8">
            Dapatkan pengalaman menonton yang lebih baik dengan beberapa keuntungan melanjutkan langganan premium kami.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FeatureCard 
                icon="download" 
                title="Download Konten Pilihan" 
            />
            <FeatureCard 
                icon="ads" 
                title="Tidak ada iklan" 
            />
            <FeatureCard 
                icon="streams" 
                title="Tonton Semua Konten" 
            />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <FeatureCard 
                icon="fourK" 
                title="Kualitas Maksimal Sampai Dengan 4K" 
            />
            <FeatureCard 
                icon="platforms" 
                title="Tonton di Tv, Tablet, Mobile, dan Laptop" 
            />
            <FeatureCard 
                icon="subtitle" 
                title="Subtitle Untuk Konten Pilihan" 
            />
            </div>
        </div>
    </section>

      <main className="flex-1 pt-24 md:pt-28">
        <section className="container-responsive pt-8 md:pt-14 pb-12 md:pb-16">
          <div className="max-w-180 mx-auto flex flex-col gap-6">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Pilih Paket Langganan
            </h1>
            <p className="text-base md:text-lg text-white/60">
              Kamu bisa upgrade atau downgrade paket kapan saja.
            </p>
          </div>

          <div className="max-w-180 mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4">
            {subscriptionPlans.map((plan) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                onSelect={setSelectedPlanId}
              />
            ))}
          </div>

          <div className="max-w-180 mx-auto mt-6 flex justify-end">
            <button
              onClick={handleSubscribe}
              disabled={isSubmitting}
              className="rounded-full bg-[#09147A] px-8 py-3 text-sm font-bold text-white hover:bg-[#0a17a0] transition disabled:opacity-50"
            >
              {isSubmitting ? 'Memproses...' : 'Ubah ke Premium'}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default PremiumPage;