export interface JsonNode {
  textValue?: string;
  valueAsText?: string;
  fieldNames?: {};
  elements?: {};
  floatingPointNumber?: boolean;
  pojo?: boolean;
  containerNode?: boolean;
  missingNode?: boolean;
  object?: boolean;
  valueNode?: boolean;
  number?: boolean;
  integralNumber?: boolean;
  int?: boolean;
  long?: boolean;
  double?: boolean;
  bigDecimal?: boolean;
  bigInteger?: boolean;
  textual?: boolean;
  boolean?: boolean;
  binary?: boolean;
  numberValue?: number;
  numberType?: string;
  intValue?: number;
  longValue?: number;
  bigIntegerValue?: number;
  doubleValue?: number;
  decimalValue?: number;
  booleanValue?: boolean;
  binaryValue?: string[];
  valueAsInt?: number;
  valueAsLong?: number;
  valueAsDouble?: number;
  valueAsBoolean?: boolean;
  array?: boolean;
  fields?: {};
  null?: boolean;
}
