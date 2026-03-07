export const studentActivityCategoryOptions = [
  {
    label: 'Sosialt',
    value: 'social',
  },
  {
    label: 'Faglig',
    value: 'academic',
  },
  {
    label: 'Karriere',
    value: 'career',
  },
  {
    label: 'Frivillighet',
    value: 'volunteer',
  },
  {
    label: 'Idrett og aktivitet',
    value: 'sports',
  },
  {
    label: 'Velferd og støtte',
    value: 'wellbeing',
  },
] as const

export const studentActivityCampusOptions = [
  {
    label: 'Hele Innlandet',
    value: 'all',
  },
  {
    label: 'Lillehammer',
    value: 'lillehammer',
  },
  {
    label: 'Hamar',
    value: 'hamar',
  },
  {
    label: 'Elverum',
    value: 'elverum',
  },
  {
    label: 'Rena',
    value: 'rena',
  },
  {
    label: 'Gjøvik',
    value: 'gjovik',
  },
  {
    label: 'Digitalt',
    value: 'digital',
  },
] as const

export const studentActivityCategoryLabels = Object.fromEntries(
  studentActivityCategoryOptions.map((option) => [option.value, option.label]),
) as Record<(typeof studentActivityCategoryOptions)[number]['value'], string>

export const studentActivityCampusLabels = Object.fromEntries(
  studentActivityCampusOptions.map((option) => [option.value, option.label]),
) as Record<(typeof studentActivityCampusOptions)[number]['value'], string>

export type StudentActivityCategoryValue = (typeof studentActivityCategoryOptions)[number]['value']
export type StudentActivityCampusValue = (typeof studentActivityCampusOptions)[number]['value']