import React from 'react';
import { UserGamificationProfile } from '../types';
import { LEVEL_THRESHOLDS, LEVEL_NAMES } from '../constants';
import { Trophy, Star, TrendingUp, Crown } from 'lucide-react';

interface GamificationWidgetProps {
  profile: UserGamificationProfile;
}

const GamificationWidget: React.FC<GamificationWidgetProps> = ({ profile }) => {
  const currentLevelXP = LEVEL_THRESHOLDS[profile.level];
  
  // Calculate next level
  let nextLevelXP = LEVEL_THRESHOLDS.SILVER;
  let nextLevelName = LEVEL_NAMES.SILVER;
  
  if (profile.level === 'SILVER') { nextLevelXP = LEVEL_THRESHOLDS.GOLD; nextLevelName = LEVEL_NAMES.GOLD; }
  else if (profile.level === 'GOLD') { nextLevelXP = LEVEL_THRESHOLDS.DIAMOND; nextLevelName = LEVEL_NAMES.DIAMOND; }
  else if (profile.level === 'DIAMOND') { nextLevelXP = LEVEL_THRESHOLDS.MASTER; nextLevelName = LEVEL_NAMES.MASTER; }
  else if (profile.level === 'MASTER') { nextLevelXP = 2000; nextLevelName = "Lenda Hoteleira"; } // Cap

  const progress = Math.min(100, ((profile.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);

  const getLevelColor = () => {
    switch (profile.level) {
        case 'BRONZE': return 'from-orange-400 to-orange-600';
        case 'SILVER': return 'from-gray-300 to-gray-500';
        case 'GOLD': return 'from-yellow-400 to-yellow-600';
        case 'DIAMOND': return 'from-cyan-400 to-blue-600';
        case 'MASTER': return 'from-purple-500 to-indigo-700';
        default: return 'from-blue-500 to-blue-700';
    }
  };

  const getLevelIcon = () => {
    if (profile.level === 'MASTER' || profile.level === 'DIAMOND') return <Crown className="w-5 h-5 text-white" />;
    return <Trophy className="w-5 h-5 text-white" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all">
       {/* Background Decoration */}
       <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getLevelColor()} opacity-10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform`} />
       
       <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className={`p-2.5 rounded-lg shadow-md bg-gradient-to-br ${getLevelColor()}`}>
                {getLevelIcon()}
             </div>
             <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Nível Atual</p>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">{LEVEL_NAMES[profile.level]}</h3>
             </div>
          </div>
          <div className="text-right">
             <span className="block text-2xl font-black text-rio-blue">{profile.xp}</span>
             <span className="text-xs font-medium text-gray-400 uppercase">Pontos XP</span>
          </div>
       </div>

       {/* Progress Bar */}
       <div className="mb-2 relative z-10">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
             <span className="text-gray-600">{Math.round(progress)}% Completo</span>
             <span className="text-rio-blue">Próximo: {nextLevelName}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
             <div 
               className={`h-full rounded-full bg-gradient-to-r ${getLevelColor()} transition-all duration-1000 ease-out`}
               style={{ width: `${progress}%` }}
             />
          </div>
       </div>

       <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-500">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Utilize benefícios para subir de nível!</span>
       </div>
    </div>
  );
};

export default GamificationWidget;