import { canViewFeature, FeatureFlagName } from "@/lib/featureFlags"
import { getUser } from "@/lib/getUser"
import { ReactNode } from "react"

export function FeatureEnabled({
  featureFlag,
  children,
}: {
  featureFlag: FeatureFlagName
  children: ReactNode
}) {
  return canViewFeature(featureFlag, getUser()) ? children : null
}
