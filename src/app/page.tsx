import { FeatureEnabled } from "@/components/FeatureEnabled"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="container mx-auto my-6 px-4">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
          </CardHeader>
        </Card>
        <FeatureEnabled featureFlag="ADVANCED_ANALYTICS">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
            </CardHeader>
          </Card>
        </FeatureEnabled>
        <FeatureEnabled featureFlag="EXPERIMENTAL_FEATURE">
          <Card>
            <CardHeader>
              <CardTitle>Experimental Feature</CardTitle>
            </CardHeader>
          </Card>
        </FeatureEnabled>
        <FeatureEnabled featureFlag="MULTIPLE_ALLOWANCES">
          <Card>
            <CardHeader>
              <CardTitle>Multiple Allowances</CardTitle>
            </CardHeader>
          </Card>
        </FeatureEnabled>
        <FeatureEnabled featureFlag="DISABLED_FEATURE">
          <Card>
            <CardHeader>
              <CardTitle>DISABLED</CardTitle>
            </CardHeader>
          </Card>
        </FeatureEnabled>
      </div>
    </div>
  )
}
