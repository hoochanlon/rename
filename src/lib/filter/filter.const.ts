export const filterTypeOptions: { label: string; value: FileFilterType }[] = [
  {
    label: "filter.includeFile",
    value: "include"
  },
  {
    label: "filter.excludeFile",
    value: "exclude"
  }
]

export const matchOptions: { label: string; value: FileFilterProp }[] = [
  {
    label: "filter.filename",
    value: "filename"
  },
  {
    label: "filter.extension",
    value: "extension"
  },
  {
    label: "filter.filesize",
    value: "size"
  },
  {
    label: "filter.modifyTime",
    value: "modifyTime"
  }
]

export const stringPredicateOptions: PredicateItem[] = [
  {
    label: "filter.contains",
    value: "contains"
  },
  {
    label: "filter.notContains",
    value: "notContains"
  },
  {
    label: "filter.startsWith",
    value: "startsWith"
  },
  {
    label: "filter.endsWith",
    value: "endsWith"
  },
  {
    label: "filter.equals",
    value: "equals"
  }
]

export const numberPredicateOptions: PredicateItem[] = [
  {
    label: "filter.greaterThan",
    value: "gt"
  },
  {
    label: "filter.greaterOrEqual",
    value: "ge"
  },
  {
    label: "filter.lessThan",
    value: "lt"
  },
  {
    label: "filter.lessOrEqual",
    value: "le"
  },
  {
    label: "filter.equals",
    value: "eq"
  }
]
