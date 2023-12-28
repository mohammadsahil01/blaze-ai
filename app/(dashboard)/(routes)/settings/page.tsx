

import { Heading } from "@/components/heading";

import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/ui/subscription-button";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return ( 
    <div>
      <Heading
        title="Settings"
        description="Manage account settings."
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPro ? "You are currently on a Pro plan." : "You are currently on a free plan."}
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
   );
}
 
export default SettingsPage;
