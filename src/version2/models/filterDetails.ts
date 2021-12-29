import { User } from './user.ts';
import { SharePermission } from './sharePermission.ts';
import { FilterSubscription } from './filterSubscription.ts';

/** Details of a filter. */
export interface FilterDetails {
  /** Expand options that include additional filter details in the response. */
  expand?: string;
  /** The URL of the filter. */
  self?: string;
  /** The unique identifier for the filter. */
  id?: string;
  /** The name of the filter. */
  name: string;
  /** The description of the filter. */
  description?: string;
  owner?: User;
  /** The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*. */
  jql?: string;
  /**
   * A URL to view the filter results in Jira, using the ID of the filter. For example,
   * *https://your-domain.atlassian.net/issues/?filter=10100*.
   */
  viewUrl?: string;
  /**
   * A URL to view the filter results in Jira, using the [Search for issues using
   * JQL](#api-rest-api-2-filter-search-get) operation with the filter's JQL string to return the filter results. For
   * example, *https://your-domain.atlassian.net/rest/api/2/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*.
   */
  searchUrl?: string;
  /** Whether the filter is selected as a favorite by any users, not including the filter owner. */
  favourite?: boolean;
  /** The count of how many users have selected this filter as a favorite, including the filter owner. */
  favouritedCount?: number;
  /**
   * The groups and projects that the filter is shared with. This can be specified when updating a filter, but not when
   * creating a filter.
   */
  sharePermissions?: SharePermission[];
  /**
   * The groups and projects that can edit the filter. This can be specified when updating a filter, but not when
   * creating a filter.
   */
  editPermissions?: SharePermission[];
  /** The users that are subscribed to the filter. */
  subscriptions?: FilterSubscription[];
}
