
import React from 'react';
import { UserGamificationProfile } from '../types';
import { LEVEL_THRESHOLDS, LEVEL_NAMES, GAMIFICATION_BADGES } from '../constants';
import { Trophy, Star, TrendingUp, Crown, Flame, Medal } from 'lucide-react';
import * as Icons from 'lucide-react';

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

  const userBadges = GAMIFICATION_BADGES.filter(b => profile.badges.includes(b.id));

  return (
    <div className="space-y-6">
        {/* Main XP Card */}
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
        <div className="mb-4 relative z-10">
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

        {/* Streak Indicator */}
        <div className="flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-2 rounded-lg border border-orange-100">
            <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
            <span className="text-sm font-bold">{profile.streak} dias de ofensiva</span>
        </div>
        </div>

        {/* Badges Gallery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Medal className="w-4 h-4" />
                Medalhas Conquistadas
            </h4>
            <div className="flex gap-2 flex-wrap">
                {GAMIFICATION_BADGES.map(badge => {
                    const isUnlocked = profile.badges.includes(badge.id);
                    const IconComponent = (Icons as any)[badge.iconName] || Icons.Medal;
                    
                    return (
                        <div 
                           key={badge.id}
                           className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all relative group/tooltip
                             ${isUnlocked 
                               ? 'bg-yellow-50 border-yellow-200 text-yellow-600 shadow-sm' 
                               : 'bg-gray-50 border-gray-200 text-gray-300 grayscale'}
                           `}
                        >
                            <IconComponent className="w-5 h-5" />
                            
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-gray-800 text-white text-[10px] p-2 rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-20 text-center">
                                <p className="font-bold mb-0.5">{badge.name}</p>
                                <p className="opacity-80">{badge.description}</p>
                                {!isUnlocked && <p className="text-yellow-400 mt-1">Requer {badge.requiredXP} XP</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default GamificationWidget;
