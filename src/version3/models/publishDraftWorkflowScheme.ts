import { StatusMapping } from './statusMapping.ts';

/** Details about the status mappings for publishing a draft workflow scheme. */
export interface PublishDraftWorkflowScheme {
  /** Mappings of statuses to new statuses for issue types. */
  statusMappings?: StatusMapping[];
}
