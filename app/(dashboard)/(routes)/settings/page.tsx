

import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/ui/subscription-button";
import { checkSubscription } from "@/lib/subscription";



const SettingsPage = async() => {
    const isPro = await checkSubscription()
    
   

    return ( <div>
        <Heading
        title="Settings"
        description="Manage Settings"
        />

        <div className=" px-4 lg:px-8 space-y-4">
            <div className=" text-sm">
                {isPro ? "You are currently on pro plan.":"You are currently on free plan."}
            </div>
            <SubscriptionButton isPro={isPro}/>

        </div>
    </div> );
}
 
export default SettingsPage;