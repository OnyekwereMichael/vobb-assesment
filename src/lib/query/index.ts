import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateDeals, IUpdateDeals } from "../types";
import { toast } from "sonner";
import { QUERY_KEYS } from "../enum";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";
export const useCreateDeal = () => {
    const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deal: ICreateDeals) => {
      try {

        const res = await fetch(`${BASE_URL}/deals`, {
          method: "POST",
           headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: deal.clientId,
    productId: deal.productId,
    stage: deal.stage,
    createdAt: new Date().toISOString(),
  })

        });

        const data = await res.json();

        if (!res.ok) throw new Error(data?.error || "Failed to create deal");

         if(res.ok){
          navigate("/deals")
        }

        toast.success("✅ Deal created successfully!");
        return data;
      } catch (error: unknown) {
        console.error(error);
        toast.error("❌ Error creating deal");
        throw error; // ensures onError triggers
      }
    },

    onSuccess: () => {
      // Optional: invalidate deals query so the list updates automatically
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },

    onError: (error: unknown) => {
      // Optional: handle errors globally
      console.error("Create deal error:", error);
    },
  });
};


export const useGetProduct = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALLPRODUCT],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/products`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();

        // toast.success("Product Sucessfully Retrieved")

       

        // Always return an array, fallback to empty array
        return data.data ?? [];
      } catch (error: unknown) {
        console.error(error);
        toast.error("Failed to fetch products");
        // Return empty array instead of undefined
        return [];
      }
    },
    retry: false,
  });
};

export const useGetClient = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALLCLIENT],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/clients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

       const data = await res.json();

      //  toast.success("Product Sucessfully Retrieved")
        // Always return an array, fallback to empty array
        return data.data ?? [];
       
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error("Failed to fetch")

        } else {
          toast.error("Failed to fetch")

        }
        throw error;
      }
    },
    retry: false,
  });
};
export const useGetStage = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALLSTAGE],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/stages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

       const data = await res.json();

      //  toast.success("Stage Sucessfully Retrieved")
        // Always return an array, fallback to empty array
        return data.data ?? [];
       
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error("Failed to fetch Deals")

        } else {
          toast.error("Failed to fetch Deals")

        }
        throw error;
      }
    },
    retry: false,
  });
};

export const useDeleteDeal = () => {
  const queryClient = useQueryClient();

  // mutationFn receives the dealId as a parameter
  return useMutation({
    mutationFn: async (dealId: string | number) => {
      const res = await fetch(`${BASE_URL}/deals/${dealId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete deal with ID ${dealId}`);
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Deal deleted successfully!");
     queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALLDEALS] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete deal");
    },
  });
};

export const useGetDeals = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALLDEALS],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/deals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

       const data = await res.json();

       toast.success("Deals Sucessfully Created")
        // Always return an array, fallback to empty array
        return data ?? [];
       
      } catch (error: unknown) {
        console.error(error);
        if (error instanceof Error) {
          toast.error("Failed to fetch Deals")

        } else {
          toast.error("Failed to fetch Deals")

        }
        throw error;
      }
    },
    retry: false,
  });
};

export const useGetDealByDealId = (id: string | number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SINGLE_DEAL, id],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/deals/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch deal");
        return data; // return single deal object
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!id, // ✅ only fetch if id exists
    retry: false,
  });
};


export const useUpdateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      dealId,
      deal,
    }: {
      dealId: string;
      deal: IUpdateDeals;
    }) => {
      const res = await fetch(`${BASE_URL}/deals/${dealId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deal),
      });

      if (!res.ok) throw new Error("Failed to update deal");

      return await res.json();
    },
    onSuccess: (data, variables) => {
      toast.success("Deal updated successfully!");

      // ✅ Invalidate queries so fresh data comes in
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_ALLDEALS] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SINGLE_DEAL, variables.dealId],
      });
    },
  });
};



