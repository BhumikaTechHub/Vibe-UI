import { useEffect, useRef, useState } from 'react';
import { backendClient } from '../services/backendClient';
import { AnalysisRequest, BehaviorMetrics, InteractionSignal } from '../types/signals';
import { getDeviceContext } from '../utils/device';
import { calculateAverage } from '../utils/signalMath';

const SEND_INTERVAL_MS = 5000;
const RETRY_THRESHOLD_MS = 1000; // Clicks on same target within 1s count as retry

export const useBehaviorTracking = (pageContext: string) => {
    const [sessionId] = useState(() => Math.random().toString(36).substring(7));

    // Refs to hold mutable state without triggering renders
    const signalsRef = useRef<InteractionSignal[]>([]);
    const lastClickRef = useRef<{ timestamp: number; targetId: string } | null>(null);
    const metricsRef = useRef<BehaviorMetrics>({
        clickToClickIntervals: [],
        hesitationTime: 0,
        retryCount: 0,
        scrollVolatility: 0, // Placeholder
        totalTimeOnPage: 0
    });
    const startTimeRef = useRef<number>(Date.now());
    const hasInteractedRef = useRef<boolean>(false);

    // 1. Capture Global Events
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const now = Date.now();
            const target = e.target as HTMLElement;
            const targetId = target.id || target.tagName;

            // Hesitation logic
            if (!hasInteractedRef.current) {
                metricsRef.current.hesitationTime = now - startTimeRef.current;
                hasInteractedRef.current = true;
            }

            // Click Interval Logic
            if (lastClickRef.current) {
                const interval = now - lastClickRef.current.timestamp;
                metricsRef.current.clickToClickIntervals.push(interval);

                // Retry Logic (Same target, short interval)
                if (
                    lastClickRef.current.targetId === targetId &&
                    interval < RETRY_THRESHOLD_MS
                ) {
                    metricsRef.current.retryCount++;
                }
            }

            lastClickRef.current = { timestamp: now, targetId };

            // Record Signal
            signalsRef.current.push({
                eventType: 'click',
                timestamp: now,
                targetId,
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    // 2. Periodic Analysis Loop
    useEffect(() => {
        const interval = setInterval(async () => {
            // Update time on page
            metricsRef.current.totalTimeOnPage = Date.now() - startTimeRef.current;

            try {
                const payload: AnalysisRequest = {
                    pageContext,
                    device: getDeviceContext(),
                    metrics: {
                        ...metricsRef.current,
                        // Keep arrays manageable if needed, but for now send all
                    },
                    signals: signalsRef.current.slice(-20) // Send last 20 signals to keep payload light
                };

                // Optional: Only send if there's activity or first 5 seconds
                if (signalsRef.current.length > 0 || metricsRef.current.totalTimeOnPage < 10000) {
                    console.log('📡 Sending Behavior Analysis:', payload);
                    await backendClient.post('/api/analyze', payload);
                }

            } catch (error) {
                console.error('Failed to send behavior data', error);
            }
        }, SEND_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [pageContext, sessionId]);

    return {
        metrics: metricsRef.current,
        sessionId
    };
};
