export enum CurrentStatus {
  HIGH_SCHOOL = "High School Student",
  UNIVERSITY = "University Student",
  EMPLOYEE = "Employee",
  EMPLOYED_IN_MORE_THAN_ONE_JOB = "Employed in more than one job",
  UNEMPLOYED = "Unemployed for more than 6 months",
  RETIRED = "Retired",
  SELF_EMPLOYED = "Self-employed",
}

export const currentStatus = Object.values(CurrentStatus);
