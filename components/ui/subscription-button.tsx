"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";


import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="default" disabled={loading} onClick={onClick} >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  )
};