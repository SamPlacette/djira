/** @deprecated Use BoardFeatureResponse instead. */
export type BoardFeatureResponseBean = BoardFeatureResponse;

/** @deprecated Use *FeatureResponse* model instead. */
export interface BoardFeatureResponse {
  features?: {
    boardFeature?: string;
    boardId?: number;
    state?: string;
    localisedName?: string;
    localisedDescription?: string;
    learnMoreLink?: string;
    imageUri?: string;
    toggleLocked?: boolean;
  }[];
}
