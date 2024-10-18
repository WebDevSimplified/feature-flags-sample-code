import { User, UserRole } from "./getUser"
import { murmurhash } from "./murmurhash"

export type FeatureFlagName = keyof typeof FEATURE_FLAGS

type FeatureFlagRule = {
  percentageOfUsers?: number
  userRoles?: UserRole[]
} & (
  | {
      percentageOfUsers: number
    }
  | { userRoles: UserRole[] }
)

export const FEATURE_FLAGS = {
  TEST_NEW_PRODUCTS_QUERY: true,
  ADVANCED_ANALYTICS: true,
  DISABLED_FEATURE: false,
  EXPERIMENTAL_FEATURE: false,
  MULTIPLE_ALLOWANCES: [
    { percentageOfUsers: 0.25, userRoles: ["user"] },
    { userRoles: ["admin", "tester"] },
  ],
} as const satisfies Record<string, FeatureFlagRule[] | boolean>

export function canViewFeature(featureName: FeatureFlagName, user: User) {
  const rules = FEATURE_FLAGS[featureName]
  if (typeof rules === "boolean") return rules
  return rules.some(rule => checkRule(rule, featureName, user))
}

function checkRule(
  { userRoles, percentageOfUsers }: FeatureFlagRule,
  featureName: FeatureFlagName,
  user: User
) {
  return (
    userHasValidRole(userRoles, user.role) &&
    userIsWithinPercentage(featureName, percentageOfUsers, user.id)
  )
}

function userHasValidRole(
  allowedRoles: UserRole[] | undefined,
  userRole: UserRole
) {
  return allowedRoles == null || allowedRoles.includes(userRole)
}

const MAX_UINT_32 = 4294967295
function userIsWithinPercentage(
  featureName: FeatureFlagName,
  allowedPercent: number | undefined,
  flagId: string
) {
  if (allowedPercent == null) return true

  return murmurhash(`${featureName}-${flagId}`) / MAX_UINT_32 < allowedPercent
}
