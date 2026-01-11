import React, { useEffect, useState } from 'react';
import { BehaviorMetrics } from '../types/signals';
import { UIComponent } from '../types/uiSchema';

interface DebugPanelProps {
    metrics: BehaviorMetrics;
    vibe: string;
    userState: string;
    isLoading: boolean;
    lastCacheStatus: 'HIT' | 'MISS' | 'IDLE';
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ 
    metrics, 
    vibe, 
    userState, 
    isLoading,
    lastCacheStatus 
}) => {
    // Force re-render to track mutable metrics in real-time
    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTick(t => t + 1);
        }, 100); // 10fps update for smooth feeling
        return () => clearInterval(interval);
    }, []);

    const getVibeColor = (v: string) => {
        if (v.includes('urgent')) return 'text-orange-500';
        if (v.includes('calm')) return 'text-blue-500';
        if (v.includes('error')) return 'text-red-500';
        return 'text-gray-500';
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-black/90 text-xs font-mono text-green-400 p-4 rounded-lg shadow-2xl border border-green-500/30 backdrop-blur-md z-50 animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-3 border-b border-green-500/20 pb-2">
                <span className="font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    VIBE ENGINE
                </span>
                <span className="text-[10px] text-gray-500">v1.0</span>
            </div>

            <div className="space-y-4">
                {/* 1. BRAIN STATE */}
                <div>
                    <div className="text-gray-500 mb-1 uppercase tracking-wider text-[10px]">Cortical State</div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 p-2 rounded">
                            <div className="text-gray-400 text-[10px]">VIBE</div>
                            <div className={`font-bold ${getVibeColor(vibe)}`}>
                                {vibe.toUpperCase()}
                            </div>
                        </div>
                        <div className="bg-white/5 p-2 rounded">
                            <div className="text-gray-400 text-[10px]">USER STATE</div>
                            <div className="font-bold text-white">
                                {userState.toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. LIVE SIGNALS */}
                <div>
                    <div className="text-gray-500 mb-1 uppercase tracking-wider text-[10px]">Live Signals</div>
                    <div className="space-y-1 text-[10px]">
                        <div className="flex justify-between">
                            <span>Retries (Rage):</span>
                            <span className={metrics.retryCount > 0 ? "text-red-400 font-bold" : "text-gray-400"}>
                                {metrics.retryCount}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hesitation:</span>
                            <span className="text-gray-400">{(metrics.hesitationTime / 1000).toFixed(1)}s</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time on Page:</span>
                            <span className="text-gray-400">{(metrics.totalTimeOnPage / 1000).toFixed(1)}s</span>
                        </div>
                    </div>
                </div>

                {/* 3. SYSTEM STATUS */}
                <div className="border-t border-green-500/20 pt-2 flex justify-between items-center">
                    <div className="text-gray-500">STATUS</div>
                    <div>
                        {isLoading ? (
                            <span className="text-yellow-400 animate-pulse">GENERATING...</span>
                        ) : lastCacheStatus === 'HIT' ? (
                            <span className="text-blue-400">⚡ CACHE HIT</span>
                        ) : lastCacheStatus === 'MISS' ? (
                            <span className="text-orange-400">🐢 NETWORK</span>
                        ) : (
                            <span className="text-gray-600">IDLE</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
