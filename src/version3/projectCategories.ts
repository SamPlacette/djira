import * as Models from './models/index.ts';
import * as Parameters from './parameters/index.ts';
import { Client } from '../clients/index.ts';
import { Callback } from '../callback.ts';
import { RequestConfig } from '../requestConfig.ts';

export class ProjectCategories {
  constructor(private client: Client) {}

  /**
   * Returns all project categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllProjectCategories<T = Models.ProjectCategory[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all project categories.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAllProjectCategories<T = Models.ProjectCategory[]>(callback?: never): Promise<T>;
  async getAllProjectCategories<T = Models.ProjectCategory[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/projectCategory',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters: Parameters.CreateProjectCategory | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters?: Parameters.CreateProjectCategory,
    callback?: never
  ): Promise<T>;
  async createProjectCategory<T = Models.ProjectCategory>(
    parameters?: Parameters.CreateProjectCategory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/projectCategory',
      method: 'POST',
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById,
    callback?: never
  ): Promise<T>;
  async getProjectCategoryById<T = Models.ProjectCategory>(
    parameters: Parameters.GetProjectCategoryById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
    callback?: never
  ): Promise<T>;
  async updateProjectCategory<T = Models.UpdatedProjectCategory>(
    parameters: Parameters.UpdateProjectCategory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeProjectCategory<T = void>(
    parameters: Parameters.RemoveProjectCategory,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a project category.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeProjectCategory<T = void>(parameters: Parameters.RemoveProjectCategory, callback?: never): Promise<T>;
  async removeProjectCategory<T = void>(
    parameters: Parameters.RemoveProjectCategory,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/projectCategory/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
