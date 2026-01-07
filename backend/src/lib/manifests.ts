export interface UIConstraint {
    singlePrimaryAction?: boolean;
    noDistractions?: boolean;
    maxActions?: number;
}

export interface UIManifest {
    id: string;
    goal: string;
    requiredElements: string[];
    constraints: UIConstraint;
}

export const manifests: Record<string, UIManifest> = {
    checkout: {
        id: "checkout",
        goal: "complete_payment",
        requiredElements: [
            "price_summary",
            "primary_action",
            "trust_signal",
            "error_surface"
        ],
        constraints: {
            singlePrimaryAction: true,
            noDistractions: true
        }
    }
};
