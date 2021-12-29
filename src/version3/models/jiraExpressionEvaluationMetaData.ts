import { JiraExpressionsComplexity } from './jiraExpressionsComplexity.ts';
import { IssuesMeta } from './issuesMeta.ts';

/** @deprecated Use JiraExpressionEvaluationMetaData instead. */
export type JiraExpressionEvaluationMetaDataBean = JiraExpressionEvaluationMetaData;

export interface JiraExpressionEvaluationMetaData {
  complexity?: JiraExpressionsComplexity;
  issues?: IssuesMeta;
}
