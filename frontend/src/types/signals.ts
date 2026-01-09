export interface InteractionSignal {
    eventType: 'click' | 'scroll' | 'input' | 'resize';
    timestamp: number;
    targetId?: string;
    x?: number;
    y?: number;
}

export interface BehaviorMetrics {
    clickToClickIntervals: number[]; // ms
    hesitationTime: number; // ms before first interaction
    retryCount: number; // repeated clicks on same target
    scrollVolatility: number; // basic variance in scroll speed
    totalTimeOnPage: number; // ms
}

export interface DeviceContext {
    isMobile: boolean;
    isTouch: boolean;
    screenSize: {
        width: number;
        height: number;
    };
    userAgent: string;
}

export interface AnalysisRequest {
    signals: InteractionSignal[]; // Raw window of recent events
    metrics: BehaviorMetrics;     // Derived metrics
    device: DeviceContext;
    pageContext: string;          // e.g., 'checkout', 'dashboard'
}
