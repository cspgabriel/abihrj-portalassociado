import React from 'react';

interface InfluencersPageProps {
  onBack: () => void;
}

const InfluencersPage: React.FC<InfluencersPageProps> = ({ onBack }) => {
  return (
    <div className="w-full h-screen animate-fade-in">
      <iframe
        src="https://influenciadoresdigitais.abihrj.com.br/#/influenciadores"
        title="Influenciadores Digitais"
        className="w-full h-full border-0"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default InfluencersPage;
